import React, { useState, useEffect } from 'react'
import ReactRating from 'react-rating'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import auth from '../../lib/auth'




// need to remember that it's rated before when page loads 

const Rating = (props) => {
  const [ratingNum, setRatingNum] = useState(null)
  const recipeId = parseInt(props.recipeId)
  // will be undefined if user did not rate. or 1 - 5 integer as a rating
  const ratedRating = props.rating



  function handleRatingAction(value, event) {

    setRatingNum(value)
    axios.post('/api/main/ratings/', {
      recipe: recipeId,
      rating_num: value
    },
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => console.log(res))
      .catch(err => console.log(err))

  }

  // post to: api/main/ratings/


  // once rated, need to call backend to create an instance of rating using rating model. needs to be a backend endpoint?
  // would need info: recipe id -  got passed down as a prop. now in const recipeId 
  // would need info: rating, which is value 
  // would need info: user - probably can get it from this page. or i mean attach the authorisation bearer stuff to axios.post
  // when i have all this info i can make a post to create new instance of rating using rating model 

  return (<>
    <ReactRating
      emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
      fullSymbol={<FontAwesomeIcon icon={faStar} />}
      readonly={!!(ratedRating || ratingNum)}
      onClick={(value, event) => handleRatingAction(value, event)}
      initialRating={ratedRating}
    />
    <h1> {ratingNum} </h1>


  </>

  )
}


export default Rating


// notes 
// for logged in users 
// when componentmounts, check if rating is null or number. if null, then display 'normal' stars, so user can rate.
// otherwise, display 'rated' stars, to indicate what user rated 

// if not rated, and user rates
// need to post to rating endpoint
// then disable button to rate so user can't rate anymore 