// import * as React from 'react';
import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler'
import axios from 'axios'
import auth from '../../lib/auth'



import {
  Scheduler,
  MonthView,
  Appointments,
  DateNavigator,
  Toolbar,
  AppointmentTooltip,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';


const Calander = (props) => {
  // const [data, setData] = useState(null)
  const entries = props.data.map(mpr => {
    return mpr.entry
  }
  )

  console.log(entries)
  const today = new Date().toISOString().slice(0, 10)
  const currentDate = today

  function removeMpr() {
    // axios.delete('/api/main/mealplanrecipes/', {
    //   // but i don't think the recipeId will be sent down as a prop........ how do i know which recipe was clicked on 
    //   recipe: props.recipeId,
    // },
    //   { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    // // user/mealplanrecipes
    console.log('hi')

  }

  function commitChanges({ added, changed, deleted }) {
    console.log({ added, changed, deleted })
  }



  return (
    <Paper>
      <Scheduler
        data={entries}
      >
        <ViewState
          defaultCurrentDate={currentDate}
        />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <Appointments />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <AppointmentTooltip
          showDeleteButton
          showCloseButton

        // onDeleteButtonClick ={() => removMpr() })}


        // appointmentMeta
        />
        <ConfirmationDialog />
      </Scheduler>
    </Paper>
  )

}

export default Calander

// {isLoggedIn && <button onClick={() => addIngredientToShoppingList(ingredient)}> Add ingredient to shopping list </button>}
