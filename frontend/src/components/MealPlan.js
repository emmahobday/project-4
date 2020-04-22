import React, { useState, useEffect } from 'react'
import axios from 'axios'
import auth from '../../lib/auth'
import Calendar from './Calander'

const MealPlan = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('api/main/mealplanrecipes/', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        const newData = resp.data.map(mpr => {
          const newEntry = { startDate: `${mpr.date}T09:45`, endDate: `${mpr.date}T09:46`, title: `${mpr.recipe.dish_name}` }
          return { ...mpr, entry: newEntry }
        })
        setData(newData)
      })
  }, [])

  if (!data) return <h1> waiting for Calendar </h1>

  return (<>
    <h1> put a full size calander down here </h1>
    <Calendar data={data} />
  </>
  )
}

export default MealPlan