import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Rating from './Rating'
import { faCalendarPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DonutChart from 'react-minimal-pie-chart'
import auth from '../../lib/auth'
import MiniCalendar from './MiniCalendar'



const SingleRecipe = (props) => {
  const [singleRecipeData, setSingleRecipeData] = useState(null)
  const id = props.match.params.id


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


  const isLoggedIn = auth.isLoggedIn()
  console.log('isloggedin returns', isLoggedIn)
  if (!singleRecipeData) return <h1> waiting for recipe data </h1>

  return (<section className="section">
    <div className="columns">

      {/* column one - info and ingredients */}
      <div className="column is-half flex-col">
        <h1 className="single-title">{singleRecipeData.dish_name}</h1>

        <div className="label-box">

          {singleRecipeData.diet_Labels.map(label =>
            <Link key={label} to={`/recipes/diet/${label}`}><div className='label-tags'>
              <p className='label-tag'>{label}</p>
            </div></Link>)}

          {singleRecipeData.health_Labels.map(label =>
            <Link key={label} to={`/recipes/diet/${label}`}><div className='label-tags'>
              <p className='label-tag'>{label}</p>
            </div></Link>)}

        </div>
        <div className="detail-box">
          <div className="detail-item centered-item">
            {auth.getToken() && <Rating recipeId={id} rating={singleRecipeData && singleRecipeData.rating} />}
            {!isLoggedIn && <Link to='/login' className='login-link'><FontAwesomeIcon icon={faStarEmpty} /><FontAwesomeIcon icon={faStarEmpty} /><FontAwesomeIcon icon={faStarEmpty} /><FontAwesomeIcon icon={faStarEmpty} /><FontAwesomeIcon icon={faStarEmpty} /></Link>}
          </div>
          <div className="vl"></div>

          {auth.getToken() && <div className="detail-item flex-row">
            <div className="centered-item">
              <FontAwesomeIcon icon={faCalendarPlus} className="calendar-icon" />
            </div>
            <div className="centered-item">
              <MiniCalendar recipeId={id} />
            </div>
          </div>}

          {!isLoggedIn && <div className="detail-item flex-row">
            <div className="centered-item">
              <Link to='/login' className='login-link'><FontAwesomeIcon icon={faCalendarPlus} className="calendar-icon" /></Link>
            </div>

            <Link to='/login' className='login-link'><div className="centered-item">
              <MiniCalendar recipeId={id} />
            </div></Link>
          </div>}

          <div className="vl"></div>
          <div className="detail-item">
            <p>Get the full recipe at <a href={singleRecipeData.instructions_url} rel='noopener noreferrer' target='_blank'>{singleRecipeData.source}</a>.</p>
          </div>
        </div>
        <div className="ingredients-box">
          <h2 className="small-heading">Serves {singleRecipeData.servings}</h2>
          <h1 className="subheading">Ingredients:</h1>
          {singleRecipeData.ingredients_lines.map(ingredient => {
            return <>
              <div key={ingredient} className="list-item"> <p>• {ingredient}</p>
                {isLoggedIn && <button onClick={() => addIngredientToShoppingList(ingredient)}> <FontAwesomeIcon icon={faCartPlus} className="cart-icon" /> Add to list </button>}
              </div>
            </>
          })
          }
        </div>
      </div>
      {/* second column - pic and nutritional info */}
      <div className="column is-half flex-col">
        <img src={singleRecipeData.image} alt={name} className="single-image" />
        <div className="nutri-summary-box">
          <h2 className="subheading">Nutritional information</h2>
          <div className="nutri-row">
            <div className="small-nutri-item donut-div"><DonutChart
              data={[
                { title: 'Protein', value: singleRecipeData.protein, color: '#8B008B' },
                { title: 'Carbs', value: singleRecipeData.carbs, color: '#008081' },
                { title: 'Fat', value: singleRecipeData.fat, color: '#DC143C' }
              ]}
              cx={60}
              cy={40}
              label={false}
              lengthAngle={360}
              lineWidth={40}
              paddingAngle={0}
              radius={40}
              rounded={false}
              startAngle={0}
              animate={true}
              animationDuration={3000}
              style={{
                height: '80px'
              }}
              viewBoxSize={[
                1,
                1
              ]}
            />
            </div>
            <div className="small-nutri-item"><p style={{ color: '#8B008B', fontWeight: 'bold' }}>{Math.round(((singleRecipeData.protein * 4) / singleRecipeData.calories) * 100)}%</p><p>protein</p></div>
            <div className="small-nutri-item"><p style={{ color: '#008081', fontWeight: 'bold' }}>{Math.round(((singleRecipeData.carbs * 4) / singleRecipeData.calories) * 100)}%</p><p>carbs</p></div>
            <div className="small-nutri-item"><p style={{ color: '#DC143C', fontWeight: 'bold' }}>{Math.round(((singleRecipeData.fat * 9) / singleRecipeData.calories) * 100)}%</p><p>fat</p></div>
            <div className="small-nutri-item"><p style={{ fontWeight: 'bold' }}>{Math.round(singleRecipeData.calories / singleRecipeData.servings)}</p><p>calories</p></div>
          </div>
        </div>
        <div className="full-nutri-box">
          <table className="table is-fullwidth">
            <tbody>


              <tr>
                <th>Calories:</th>
                <td>{Math.round(singleRecipeData.calories / singleRecipeData.servings)}</td>
                <th>Carbohydrates:</th>
                <td>{Math.round(singleRecipeData.carbs / singleRecipeData.servings * 10) / 10}{singleRecipeData.carbs_unit}</td>
              </tr>
              <tr>
                <th>Fat:</th>
                <td>{Math.round(singleRecipeData.fat / singleRecipeData.servings * 10) / 10}{singleRecipeData.fat_unit}</td>
                <th>Sugars:</th>
                <td>{Math.round(singleRecipeData.sugars / singleRecipeData.servings * 10) / 10}{singleRecipeData.sugars_unit}</td>
              </tr>
              <tr>
                <th>Saturated fat:</th>
                <td>{Math.round(singleRecipeData.sat_fat / singleRecipeData.servings * 10) / 10}{singleRecipeData.sat_fat_unit}</td>
                <th>Cholesterol:</th>
                <td>{Math.round(singleRecipeData.cholesterol / singleRecipeData.servings)}{singleRecipeData.cholesterol_unit}</td>
              </tr>
              <tr>
                <th>Trans fat:</th>
                <td>{Math.round(singleRecipeData.trans_fat / singleRecipeData.servings * 10) / 10}{singleRecipeData.trans_fat_unit}</td>
                <th>Sodium:</th>
                <td>{Math.round(singleRecipeData.sodium / singleRecipeData.servings)}{singleRecipeData.sodium_unit}</td>
              </tr>
              <tr>
                <th>Protein:</th>
                <td>{Math.round(singleRecipeData.protein / singleRecipeData.servings * 10) / 10}{singleRecipeData.protein_unit}</td>
                <th>Calcium:</th>
                <td>{Math.round(singleRecipeData.calcium / singleRecipeData.servings)}{singleRecipeData.calcium_unit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  )
}

export default SingleRecipe

