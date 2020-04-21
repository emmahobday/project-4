import React, { useState, useEffect } from 'react'
import axios from 'axios'
import auth from '../../lib/auth'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'

const MiniCalendar = (props) => {
  const [date, setDate] = useState(null)

  function handleDateSelection(date) {
    setDate(date)
    const newDate = dayjs(date).format('YYYY-MM-DD')
    console.log('date', newDate)
    console.log('this is the date', date)
    console.log('this is recipe id', props.recipeId)
    axios.post('/api/main/mealplanrecipes/', {
      recipe: props.recipeId,
      date: newDate
    },
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    // user/mealplanrecipes
  }

  return (<>
    <h1> Meal plan: add recipe to your chosen date! </h1>
    <DatePicker
      selected={date} onChange={handleDateSelection} />
  </>
  )
}

export default MiniCalendar