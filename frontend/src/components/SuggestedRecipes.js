
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import auth from '../../lib/auth'
import LoadSpinner from './LoadSpinner'

const SuggestedRecipes = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    axios.get('api/main/user/suggestedrecipes/', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        console.log(resp)
        setData(resp.data)
      })
  }, [])

  if (!data.length) return <LoadSpinner />

  return (<>
    <section className="hero is-medium is-bold is-suggested-primary">
      <div className="hero-body center">
        <div className="container">
          <h1 className="recipeheading">
            Suggested Recipes
          </h1>
        </div>
      </div>
    </section>
    <div className="section neutral">
      {/* <h1 className="title suggestedrecipetitle"> Suggested Recipes For You </h1> */}
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

export default SuggestedRecipes