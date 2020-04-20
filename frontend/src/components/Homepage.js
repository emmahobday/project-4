import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'react-router-dom'


const Homepage = () => {

  const [featuredRecipeData, setFeaturedRecipeData] = useState(null)

  useEffect(() => {
    axios.get(`/api/main/recipe/${Math.ceil(142.8)}`)
      .then(resp => {
        console.log(resp)
        setFeaturedRecipeData(resp.data)
      })
  }, [])

  const date = new Date()

  if (!featuredRecipeData) return <h1> waiting for data</h1>



  return <>
    {/* <Link key={featuredRecipeData.dish_name} className="column is-one-fifth-desktop is-one-quarter-tablet is-one-third-mobile" to={`recipe/${featuredRecipeData.id}`}> */}
    <div className="section">
      <div className="container">
        <div className="columns is-full-mobile is-multiline is-centered mobile-padding"></div>
        <div className="column is-one-third-desktop is-one-third-tablet">
          <h1>Todays featured recipe...</h1>
          {/* <h2>{date}</h2> */}
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