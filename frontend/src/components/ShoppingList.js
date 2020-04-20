

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

  if (!data.length) return <h1> waiting for recipe data </h1>

  return (<div className="section1">
    <h1 className="shoppinglisttitle"> Your Shopping List </h1>
    <div className="shoppinglistcontainer">

      {data.map(recipe => {
        return <div key={recipe.recipe.id} className="individualrecipecontainer">
          <div className="recipetextcolumn">
            <div className="subtitle"> {recipe.recipe.dish_name}</div>

            {recipe.ingredients_to_buy_for.map(ingredient => {
              return <IngredientLine key={ingredient} ingredient={ingredient} />

            })
            }

          </div>
          <div className="recipeimagecolumn">
            <Link to={`recipe/${recipe.recipe.id}`}>
              <figure className="image1">
                <img src={recipe.recipe.image} alt="Placeholder image" className="resImage" />
              </figure>
            </Link>

          </div>
        </div>


      })}

    </div >
  </div >)
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