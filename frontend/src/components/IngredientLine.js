
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const IngredientLine = (props) => {
  const [isCompleted, setisCompleted] = useState(false)


  function handleCheck(e) {
    console.log(e, 'hi')
    // e is the result of clicking it 
    if (e) {
      //remove ingredient 
    } else {
      //add ingredient 
      // recipe id
      // the ingredient
    }
    setisCompleted(e)

  }

  return (
    <div key={props.ingredient} className={isCompleted ? 'strikethrough' : ''}> {props.ingredient}
      <label className="checkbox">
        <input type="checkbox" onClick={() => handleCheck(event.target.checked)} />
      </label>
    </div>
  )
}


export default IngredientLine