import React, { useState, useEffect } from 'react'
import ReactRating from 'react-rating'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




// need to remember that it's rated before when page loads 

const Rating = (props) => {
  const [ratingNum, setRatingNum] = useState(null)

  function handleRatingAction(value, event) {
    setRatingNum(value)
    console.log(value)
    // once rated, need to call backend to create an instance of rating using rating model. needs to be a backend endpoint?
    // would need info: recipe id, which will be passed down by props to this component from singleRecipe component 
    // would need info: rating, which is value 
    // would need info: user - probably can get it from this page 
    // when i have all this info i can make a post to create new instance of rating using rating model 

  }


  return (<>
    <ReactRating
      emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
      fullSymbol={<FontAwesomeIcon icon={faStar} />}
      readonly={!!ratingNum}
      onClick={(value, event) => handleRatingAction(value, event)}
    />
    <h1> {ratingNum} </h1>


  </>

  )
}


export default Rating

