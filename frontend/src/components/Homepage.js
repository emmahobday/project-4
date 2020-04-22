import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import auth from '../../lib/auth'
import Fridge from './Fridge'


const Homepage = () => {

  const [featuredRecipeData, setFeaturedRecipeData] = useState(null)

  const today = new Date()
  const date = today.getFullYear() + (today.getMonth() + 1) + today.getDate()
  const displayDate = today.getDate() + ' - ' + (today.getMonth() + 1) + ' - ' + today.getFullYear()
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

  const isLoggedIn = auth.isLoggedIn()

  if (!featuredRecipeData) return <h1> waiting for data</h1>
  todaysRecipe()
  return <>
    {/* <Link key={featuredRecipeData.dish_name} className="column is-one-fifth-desktop is-one-quarter-tablet is-one-third-mobile" to={`recipe/${featuredRecipeData.id}`}> */}
    <section className="hero is-large is-bold is-homepage-primary">
      <div className="hero-body center">
        <div className="container">
          {/* <h1 className="homepagetitle ">
            RECIPEDIA
          </h1> */}
          <h1 className="homepagetitle"> What's in your fridge?</h1>
          <Fridge />
        </div>
      </div>
    </section>
    <div className="section homepage-section">
      <div className="container">

        <div className="columns is-full-mobile is-multiline is-centered mobile-padding feature-section">
          <div className="column is-one-third-desktop is-half-tablet featurerecipecolumn">
            <Link to={`/recipe/${featuredRecipeData.id}`}>
              <div className="card featured-info" >
                <div className="card-image">
                  <figure className="image">
                    <img src={featuredRecipeData.image} alt="Placeholder image" className="resImage" />
                  </figure>
                </div>
              </div>
            </Link>
          </div>
          <div className="column is-one-third-desktop is-half-tablet featurerecipecolumn">
            <Link>
              <div className="card featured-info">
                <div className="card-content">
                  <h1 className="featuredrecipetitle"> RECIPE OF THE DAY</h1>
                  <h1 className="feat-subtitle">{displayDate}</h1>
                  <div className="card-content featrecipebox">
                    <div className="featuredrecipetitle">{featuredRecipeData.dish_name}</div>
                    <div className="feat-subtitle">Serves {featuredRecipeData.servings}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>

    <div className="section link-section">
      <div className="footer-title">
        recipedia
      </div>
      <h3 className='footer-heading'>SITE MAP</h3>

      <div className="columns footer-columns">
        <div className="column footer-column">
          <p><Link to={'/recipes'} className='footer-item'>Browse recipes</Link></p>
          <p><Link to={'/register'} className='footer-item'>Sign-up</Link></p>
          <p><Link to={'/login'} className='footer-item'>Log-in</Link></p>

          {!isLoggedIn && <p><Link to={'/login'} className='footer-item'>Suggested for you</Link></p>}
          {!isLoggedIn && <p><Link to={'/login'} className='footer-item'>&#9733;&#9733;&#9733;&#9733;&#9733; recipes</Link></p>}
          {!isLoggedIn && <p><Link to={'/login'} className='footer-item'>Shopping list</Link></p>}
          {!isLoggedIn && <p><Link to={'/login'} className='footer-item'>Meal planner</Link></p>}

          {isLoggedIn && <p><Link to={'/suggestedrecipes'} className='footer-item'>Suggested for you</Link></p>}
          {isLoggedIn && <p><Link to={'/fivestarredrecipes'} className='footer-item'>&#9733;&#9733;&#9733;&#9733;&#9733; recipes</Link></p>}
          {isLoggedIn && <p><Link to={'/shoppinglist'} className='footer-item'>Shopping list</Link></p>}
          {isLoggedIn && <p><Link to={'/mealplan'} className='footer-item'>Meal planner</Link></p>}

          <p><Link to={'/recipe/section/chicken'} className='footer-item'>Chicken recipes</Link></p>
          <p><Link to={'/recipe/section/salmon'} className='footer-item'>Salmon recipes</Link></p>
          <p><Link to={'/recipe/section/tuna'} className='footer-item'>Tuna recipes</Link></p>
          <p><Link to={'/recipe/section/pork'} className='footer-item'>Pork recipes</Link></p>
          <p><Link to={'/recipe/section/lamb'} className='footer-item'>Lamb recipes</Link></p>

          <p><Link to={'/recipe/section/cod'} className='footer-item'>Cod recipes</Link></p>


        </div>
        <div className="column footer-column">
          <p><Link to={'/recipe/section/prawn'} className='footer-item'>Prawn recipes</Link></p>
          <p><Link to={'/recipe/section/mussels'} className='footer-item'>Mussel recipes</Link></p>
          <p><Link to={'/recipe/section/scallop'} className='footer-item'>Scallop recipes</Link></p>
          <p><Link to={'/recipe/section/crab'} className='footer-item'>Crab recipes</Link></p>
          <p><Link to={'/recipe/section/beef'} className='footer-item'>Beef recipes</Link></p>
          <p><Link to={'/recipe/section/tofu'} className='footer-item'>Tofu recipes</Link></p>
          <p><Link to={'/recipe/section/egg'} className='footer-item'>Egg recipes</Link></p>
          <p><Link to={'/recipe/section/falafel'} className='footer-item'>Falafel recipes</Link></p>
          <p><Link to={'/recipe/section/cheese'} className='footer-item'>Cheese recipes</Link></p>
          <p><Link to={'/recipe/section/beans'} className='footer-item'>Bean recipes</Link></p>
          <p><Link to={'/recipe/section/chickpea'} className='footer-item'>Chickpea recipes</Link></p>
          <p><Link to={'/recipe/section/potato'} className='footer-item'>Potato recipes</Link></p>
          <p><Link to={'/recipe/section/pasta'} className='footer-item'>Pasta recipes</Link></p>


        </div>
        <div className="column footer-column">
          <p><Link to={'/recipe/section/rice'} className='footer-item'>Rice recipes</Link></p>
          <p><Link to={'/recipe/section/salad'} className='footer-item'>Salad recipes</Link></p>
          <p><Link to={'/recipes/diet/vegan'} className='footer-item'>Vegan recipes</Link></p>
          <p><Link to={'/recipes/diet/vegetarian'} className='footer-item'>Vegetarian recipes</Link></p>
          <p><Link to={'/recipes/diet/peanut-free'} className='footer-item'>Peanut-free recipes</Link></p>
          <p><Link to={'/recipes/diet/tree-nut-free'} className='footer-item'>Tree-nut-free recipes</Link></p>
          <p><Link to={'/recipes/diet/sugar-conscious'} className='footer-item'>Sugar-conscious recipes</Link></p>
          <p><Link to={'/recipes/diet/alcohol-free'} className='footer-item'>Alcohol-free recipes</Link></p>
          <p><Link to={'/recipes/diet/balanced'} className='footer-item'>Balanced recipes</Link></p>
          <p><Link to={'/recipes/diet/high-protein'} className='footer-item'>High-protein recipes</Link></p>
          <p><Link to={'/recipes/diet/low-carb'} className='footer-item'>Low-carb recipes</Link></p>
          <p><Link to={'/recipes/diet/low-fat'} className='footer-item'>Low-fat recipes</Link></p>
          <p><Link to={'/recipes/diet/low-sodium'} className='footer-item'>Low-sodium recipes</Link></p>
        </div>

      </div>
      <h3 className="footer-heading">CREATED BY</h3>
      <div className="footer-end">
        <a href={'https://emmahobday.github.io/'} rel='noopener noreferrer' target='_blank' className='footer-item'>Denise Cheung </a>
        <p className='footer-item'> and </p>
        <a href={'https://emmahobday.github.io/'} rel='noopener noreferrer' target='_blank' className='footer-item'> Emma Hobday</a>
      </div>
    </div>


  </>

  // return <>
  // <p>{featuredRecipeData.dish_name}</p>
  // </>
}


export default Homepage 