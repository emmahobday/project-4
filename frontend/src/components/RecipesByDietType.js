import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadSpinner from './LoadSpinner'

const RecipesByDietType = (props) => {
  const [data, setData] = useState([])
  const [fullData, setfullData] = useState(null)
  const id = props.match.params.id

  useEffect(() => {
    fetch(`/api/main/recipes/dietlabel/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        setfullData(resp)
        setData(resp.results)
      })
    return () => console.log('Unmounting component')
  }, [])

  if (!fullData) return <LoadSpinner />

  const typeCapitalised = id.charAt(0).toUpperCase() + id.slice(1)


  return (<>
    <section className="hero is-medium is-bold is-allrecipes-primary">
      <div className="hero-body center">
        <div className="container">
          <h1 className="allrecipestitle">
            {typeCapitalised} Recipes
          </h1>
        </div>
      </div>
    </section>
    <div className="section neutral">
      <div className="container">
        <div className="columns is-full-mobile is-multiline is-centered mobile-padding">

          {data.map(recipe => {

            return <Link key={recipe.id} className="column is-one-fifth-desktop is-one-quarter-tablet is-one-third-mobile" to={`/recipe/${recipe.id}`}>
              <div className="card" >
                <div className="card-image">
                  <figure className="image">
                    <img src={recipe.image} alt="Placeholder image" className="resImage" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="subtitle">{recipe.dish_name}</div>
                  {/* <div className="subtitle">Serves {recipe.servings}</div> */}
                </div>

              </div>
            </Link>
          })}
        </div>
      </div >
    </div >
  </>)
}


export default RecipesByDietType