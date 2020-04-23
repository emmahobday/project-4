
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import auth from '../../lib/auth'
import LoadSpinner from './LoadSpinner'
const FiveStarredRecipes = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    axios.get('api/main/user/fivestarredratings/', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        const recipesArray = resp.data.map(elem => {
          console.log(elem.recipe)
          return elem.recipe
        })
        setData(recipesArray)
      })
  }, [])

  if (!data.length) return <div className="emptyshoppinglistbackground"> <h1 className="add"> Discover and rate your favourite recipes five stars! </h1> </div>



  return (<>
    <section className="hero is-medium is-bold is-fivestarrecipe-primary">
      <div className="hero-body center">
        <div className="container">
          <h1 className="fivestarredrecipetitle ">
            Your Five-Starred Recipes
          </h1>
        </div>
      </div>
    </section>
    <div className="section">
      <div className="container">
        <div className="columns is-full-mobile is-multiline is-centered mobile-padding">

          {data.map(recipe => {

            return <Link key={recipe.id} className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile" to={`recipe/${recipe.id}`}>
              <div className="card" >
                <div className="card-image">
                  <figure className="image">
                    <img src={recipe.image} alt="Placeholder image" className="resImage" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="subtitle">{recipe.dish_name}</div>
                  <div className="subtitle">Serves {recipe.servings}</div>
                </div>

              </div>
            </Link>
          })}
        </div>
      </div >
    </div >
  </>)
}

export default FiveStarredRecipes