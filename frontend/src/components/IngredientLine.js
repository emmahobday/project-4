
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import auth from '../../lib/auth'

const IngredientLine = (props) => {
  const [isCompleted, setisCompleted] = useState(false)
  const id = props.recipeId
  function deleteIngredientFromShoppingList(ingredient) {
    axios.put(`/api/main/allrecipestobuyfor/${id}`, { 'ingredient': ingredient }, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        console.log(resp)
      })
  }

  function addIngredientToShoppingList(ingredient) {
    axios.post(`/api/main/allrecipestobuyfor/${id}`, { 'ingredient': ingredient }, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        console.log(resp)
      })
  }



  function handleCheck(e, ingredient) {
    console.log(e, 'hi')
    // e is the result of checking the tickbox 
    if (e) {
      deleteIngredientFromShoppingList(ingredient)
      console.log(props.recipeId)
    } else {
      addIngredientToShoppingList(ingredient)
    }
    setisCompleted(e)

  }

  return (
    <div key={props.ingredient} className={isCompleted ? 'strikethrough' : '', 'ingredientline'}> {props.ingredient}
      <label className="checkbox">
        <input type="checkbox" onClick={() => handleCheck(event.target.checked, props.ingredient)} />
      </label>
    </div>
  )
}


export default IngredientLine