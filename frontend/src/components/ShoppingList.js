

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import auth from '../../lib/auth'

import IngredientLine from './IngredientLine'

const ShoppingList = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    axios.get('api/main/allrecipestobuyfor/1', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        console.log('this', resp.data)
        setData(resp.data)
      })
  }, [])


  // need to do it in the backend, this doesn't work
  // useEffect(() => {
  //   if (data.length) {
  //     // map over each Recipe, for each Recipe, check if the ingredients_to_buy_for array is empty. is yes, make a post request
  //     data.map(eachRecipe => {
  //       const id = eachRecipe.recipe.id
  //       if (!eachRecipe.ingredients_to_buy_for.length) {
  //         axios.delete(`/api/main/allrecipestobuyfor/${id}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
  //           .then(resp => {
  //             console.log(resp)
  //           })
  //         console.log(`no more ingredient to buy for recipe recipeid ${id}`)
  //       }
  //     }
  //     )
  //   }
  // }, [data])

  // if (data.length) {
  //   // map over each Recipe, for each Recipe, check if the ingredients_to_buy_for array is empty. is yes, make a post request
  //   data.map(eachRecipe => {
  //     const id = eachRecipe.recipe.id
  //     if (!eachRecipe.ingredients_to_buy_for.length) {
  //       axios.delete(`/api/main/allrecipestobuyfor/${id}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
  //         .then(resp => {
  //           console.log(resp)
  //         })
  //       console.log(`no more ingredient to buy for recipe recipeid ${id}`)
  //     }
  //   }

  //   )

  // }

  if (!data.length) return <h1> Add some ingredients to cook up a storm! </h1>

  return (<>
    <section className="hero is-medium is-bold is-shoppinglist-primary">
      <div className="hero-body center">
        <div className="container">
          <h1 className="shoppinglisttitle ">
            Shopping List 🛒
          </h1>
        </div>
      </div>
    </section>
    <div className="section1">
      {/* <h1 className="shoppinglisttitle"> Your Shopping List </h1> */}
      <div className="shoppinglistcontainer">

        {data.map(recipe => {
          return <div key={recipe.recipe.id} className="individualrecipecontainer">
            <div className="recipetextcolumn">
              <div className="subtitle recipetobuyfor"> {recipe.recipe.dish_name}</div>

              {recipe.ingredients_to_buy_for.map(ingredient => {
                return <IngredientLine key={ingredient} recipeId={recipe.recipe.id} ingredient={ingredient} />

              })
              }

            </div>
            <div className="recipeimagecolumn">
              <Link to={`recipe/${recipe.recipe.id}`}>
                <figure className="image1">
                  <img src={recipe.recipe.image} alt="Placeholder image" className="resImage shoppinglistimage" />
                </figure>
              </Link>

            </div>
          </div>


        })}

      </div >
    </div >
  </>)
}

export default ShoppingList

// inside map is {recipe.recipe.dish_name}

// <div className="" > {recipe.recipe.dish_name} </div>
// <div className="card1" >
//   <div className="card-image1">
//     <figure className="image1">
//       <img src={recipe.recipe.image} alt="Placeholder image" className="resImage" />
//     </figure>
//   </div>
//   <div className="card-content1">
//     {/* <div className="subtitle">{recipe.recipe.dish_name}</div> */}
//     {/* <div className="subtitle">Serves {recipe.servings}</div> */}
//   </div>

// </div>




// return (<div className="section1">
// <h1 className="shoppinglisttitle"> Your Shopping List </h1>
// <div className="shoppinglistcontainer">

//   {data.map(recipe => {
//     return <Link key={recipe.recipe.id} to={`recipe/${recipe.recipe.id}`} className="individualrecipecontainer">
//       <div className="recipetextcolumn">
//         <div className="subtitle"> {recipe.recipe.dish_name}</div>
//         {recipe.ingredients_to_buy_for.map(ingredient => {

//           return <div key={ingredient}> {ingredient} </div>
//         })
//         }


//       </div>
//       <div className="recipeimagecolumn">
//         <figure className="image1">
//           <img src={recipe.recipe.image} alt="Placeholder image" className="resImage" />
//         </figure>

//       </div>
//     </Link>

//   })}

// </div >
// </div >)