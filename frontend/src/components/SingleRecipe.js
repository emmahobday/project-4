import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Rating from './Rating'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import DonutChart from 'react-minimal-pie-chart'
import auth from '../../lib/auth'



const SingleRecipe = (props) => {
  const [singleRecipeData, setSingleRecipeData] = useState(null)
  const id = props.match.params.id

  useEffect(() => {
    console.log('hello')
    if (auth.getToken()) {


      axios.get(`/api/main/recipe/${id}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
        .then(resp => {
          console.log(resp)
          setSingleRecipeData(resp.data)
        })
    } else {
      axios.get(`/api/main/recipe/${id}`)
        .then(resp => {
          console.log(resp)
          setSingleRecipeData(resp.data)
        })
    }
  }, [])



  if (!singleRecipeData) return <h1> waiting for recipe data </h1>


  return (<section className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-one-half">
          <h1 className="title">{singleRecipeData.dish_name}</h1>
          {auth.getToken() && <Rating recipeId={id} rating={singleRecipeData && singleRecipeData.rating} />}
          <h1> hello </h1>
          {/* <div>Genre: {singleRecipeData.genre}</div>
          <div>Pages: {singleBookData.pages}</div>
          <p> Authors: {stringAuthorNames}</p> */}
          <br></br>
          
          <DonutChart
            data={[
              { title: 'Protein', value: singleRecipeData.protein, color: '#FF0000' },
              { title: 'Carbs', value: singleRecipeData.carbs, color: '#228B22' },
              { title: 'Fat', value: singleRecipeData.fat, color: '#FFD300' }
            ]}
            // radius={10}
            cx={50}
            cy={50}
            label={false}
            labelPosition={50}
            lengthAngle={360}
            lineWidth={25}
            paddingAngle={0}
            radius={8}
            rounded={false}
            startAngle={0}
            viewBoxSize={[
              10,
              10
            ]}
          />

        </div>
        <div className="column is-one-half">
          <img src={singleRecipeData.image} alt={name} />
        </div>
      </div>
    </div>
  </section>
  )
}

// {isloggedIn && user === comment.user.username && <button className="button is-danger is-round comment-delete" onClick={this.props.onClick}>Delete</button>}

export default SingleRecipe

