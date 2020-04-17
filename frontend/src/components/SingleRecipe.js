import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SingleRecipe = (props) => {
  const [singleRecipeData, setSingleRecipeData] = useState(null)


  useEffect(() => {
    const id = props.match.params.id
    console.log('hello')
    axios.get(`/api/recipe/${id}`)
      .then(resp => {
        console.log(resp)
        setSingleRecipeData(resp.data)
      })
    return () => console.log('Unmounting component')
  }, [])


  if (!singleRecipeData) return <h1> waiting for recipe data </h1>


  return (<section className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-one-half">
          <h1 className="title">{singleRecipeData.dish_name}</h1>
          <h1> hello </h1>
          {/* <div>Genre: {singleRecipeData.genre}</div>
          <div>Pages: {singleBookData.pages}</div>
          <p> Authors: {stringAuthorNames}</p> */}
          <br></br>

        </div>
        <div className="column is-one-half">
          <img src={singleRecipeData.image} alt={name} />
        </div>
      </div>
    </div>
  </section>
  )
}

export default SingleRecipe

