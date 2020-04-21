import React, { useState, useEffect } from 'react'
import axios from 'axios'
import auth from '../../lib/auth'
import Calendar from './Calander'

const MealPlan = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('api/main/mealplanrecipes/', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        console.log('this is resp', resp)
        setData(resp.data)
      })
  }, [])



  // function handleDateSelection(date) {
  //   setDate(date)
  //   const newDate = dayjs(date).format('YYYY-MM-DD')
  //   console.log('date', newDate)
  //   console.log('this is the date', date)
  //   console.log('this is recipe id', props.recipeId)
  //   axios.post('/api/main/mealplanrecipes/', {
  //     recipe: props.recipeId,
  //     date: newDate
  //   },
  //     { headers: { Authorization: `Bearer ${auth.getToken()}` } })
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  //   // user/mealplanrecipes
  // }

  return (<>
    <h1> put a full size calander down here </h1>
    <Calendar />
  </>
  )
}

export default MealPlan