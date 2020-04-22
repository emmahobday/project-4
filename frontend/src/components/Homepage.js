import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fridge from './Fridge'


const Homepage = () => {

  const [featuredRecipeData, setFeaturedRecipeData] = useState(null)

  const today = new Date()
  const date = today.getFullYear() + (today.getMonth() + 1) + today.getDate()
  let dailyRecipe = todaysRecipe()

  function todaysRecipe() {
    dailyRecipe = date
    while (dailyRecipe > 1000) {
      dailyRecipe = Math.ceil(dailyRecipe / ((dailyRecipe % 15) + 1))
    }
    return dailyRecipe
  }

  useEffect(() => {
    todaysRecipe()
    axios.get(`/api/main/recipe/${dailyRecipe}`)
      .then(resp => {
        // console.log(resp)
        setFeaturedRecipeData(resp.data)
      })
  }, [])

  if (!featuredRecipeData) return <h1> waiting for data</h1>
  todaysRecipe()
  return <>
    {/* <Link key={featuredRecipeData.dish_name} className="column is-one-fifth-desktop is-one-quarter-tablet is-one-third-mobile" to={`recipe/${featuredRecipeData.id}`}> */}
    <div className="section">
      <div className="container">

        <div className="columns is-full-mobile is-multiline is-centered mobile-padding">
          {/* <h1>Todays featured recipe...</h1> */}
          {/* <h2>{date}</h2> */}

          <Link className="column is-one-third-desktop is-one-third-tablet" to={`/recipe/${featuredRecipeData.id}`}>

            <div className="card" >
              <div className="card-image">
                <figure className="image">
                  <img src={featuredRecipeData.image} alt="Placeholder image" className="resImage" />
                </figure>
              </div>
              <div className="card-content">
                <div className="subtitle">{featuredRecipeData.dish_name}</div>
                <div className="subtitle">Serves {featuredRecipeData.servings}</div>
              </div>
            </div>

          </Link>

          <div className="column is-one-third-desktop is-one-third-tablet">
            <Fridge />
          </div>
        </div>
      </div>
    </div>

    {/* </Link> */}
  </>

  // return <>
  // <p>{featuredRecipeData.dish_name}</p>
  // </>
}


export default Homepage 