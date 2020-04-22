import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'react-router-dom'

import Rating from './Rating'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import DonutChart from 'react-minimal-pie-chart'
import auth from '../../lib/auth'
import MiniCalendar from './MiniCalendar'



const SingleRecipe = (props) => {
  const [singleRecipeData, setSingleRecipeData] = useState(null)
  const id = props.match.params.id
  const isLoggedIn = auth.isLoggedIn()

  function addIngredientToShoppingList(ingredient) {
    axios.post(`/api/main/allrecipestobuyfor/${id}`, { 'ingredient': ingredient }, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        console.log(resp)
      })
  }

  useEffect(() => {
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
          <h2> Ingredients (serves {singleRecipeData.servings}) </h2>

          {singleRecipeData.ingredients_lines.map(ingredient => {
            return <>
              <div key={ingredient}> • {ingredient}
                {isLoggedIn && <button onClick={() => addIngredientToShoppingList(ingredient)}> Add ingredient to shopping list </button>}
              </div>

            </>

          })

          }

          {/* <div>Genre: {singleRecipeData.genre}</div>
          <div>Pages: {singleBookData.pages}</div>
          <p> Authors: {stringAuthorNames}</p> */}
          <br></br>

          <div className="dietLabels">
            {singleRecipeData.diet_Labels.map(label =>
              <div key={label} className={label}>
                <p className='dietLabel'>{label}</p>
              </div>)}
          </div>

          <div className="healthLabels">
            {singleRecipeData.health_Labels.map(label =>
              <div key={label} className={label}>
                <p className='label'>{label}</p>
              </div>)}
          </div>

          <h2>Get the full recipe at <a href={singleRecipeData.instructions_url} rel='noopener noreferrer' target='_blank'>{singleRecipeData.source}</a>.</h2>

          <p>Serves {singleRecipeData.servings}</p>

          <div className="nutrition">
            <h3>Nutritional information</h3>
            <h4>Per serving:</h4>
            <p>Calories: {Math.round(singleRecipeData.calories / singleRecipeData.servings)}</p>
            <p>Fat: {Math.round(singleRecipeData.fat / singleRecipeData.servings * 10) / 10}{singleRecipeData.fat_unit}</p>
            <p>Saturated fat: {Math.round(singleRecipeData.sat_fat / singleRecipeData.servings * 10) / 10}{singleRecipeData.sat_fat_unit}</p>
            <p>Trans fat: {Math.round(singleRecipeData.trans_fat / singleRecipeData.servings * 10) / 10}{singleRecipeData.trans_fat_unit}</p>
            <p>Carbohydrates: {Math.round(singleRecipeData.carbs / singleRecipeData.servings * 10) / 10}{singleRecipeData.carbs_unit}</p>
            <p>Sugars: {Math.round(singleRecipeData.sugars / singleRecipeData.servings * 10) / 10}{singleRecipeData.sugars_unit}</p>
            <p>Protein: {Math.round(singleRecipeData.protein / singleRecipeData.servings * 10) / 10}{singleRecipeData.protein_unit}</p>
            <p>Cholesterol: {Math.round(singleRecipeData.cholesterol / singleRecipeData.servings)}{singleRecipeData.cholesterol_unit}</p>
            <p>Sodium: {Math.round(singleRecipeData.sodium / singleRecipeData.servings)}{singleRecipeData.sodium_unit}</p>
            <p>Calcium: {Math.round(singleRecipeData.calcium / singleRecipeData.servings)}{singleRecipeData.calcium_unit}</p>




          </div>

          <DonutChart
            data={[
              { title: 'Protein', value: singleRecipeData.protein, color: '#8B008B' },
              { title: 'Carbs', value: singleRecipeData.carbs, color: '#008081' },
              { title: 'Fat', value: singleRecipeData.fat, color: '#DC143C' }
            ]}
            cx={50}
            cy={50}
            label={false}
            labelPosition={50}
            lengthAngle={360}
            lineWidth={40}
            paddingAngle={0}
            radius={50}
            rounded={false}
            startAngle={0}
            style={{
              height: '80px'
            }}
            viewBoxSize={[
              100,
              100
            ]}
          />

          <p><span style={{ color: '#8B008B', fontWeight: 'bold' }}>{Math.round(((singleRecipeData.protein * 4) / singleRecipeData.calories) * 100)}%</span> protein</p>
          <p><span style={{ color: '#008081', fontWeight: 'bold' }}>{Math.round(((singleRecipeData.carbs * 4) / singleRecipeData.calories) * 100)}%</span> carbs</p>
          <p><span style={{ color: '#DC143C', fontWeight: 'bold' }}>{Math.round(((singleRecipeData.fat * 9) / singleRecipeData.calories) * 100)}%</span> fat</p>


        </div>
        <div className="column is-one-half">
          <img src={singleRecipeData.image} alt={name} />
          <MiniCalendar recipeId={id} />

        </div>
      </div>
    </div>
  </section>
  )
}

// {isloggedIn && user === comment.user.username && <button className="button is-danger is-round comment-delete" onClick={this.props.onClick}>Delete</button>}

export default SingleRecipe

