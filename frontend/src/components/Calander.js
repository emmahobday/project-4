// import * as React from 'react';
import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'


import {
  Scheduler,
  MonthView,
  Appointments,
  DateNavigator,
  Toolbar,
  AppointmentTooltip
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
        <AppointmentTooltip
          showDeleteButton
          showCloseButton
        // appointmentMeta
        />
      </Scheduler>
    </Paper>
  )

}

export default Calander

// {isLoggedIn && <button onClick={() => addIngredientToShoppingList(ingredient)}> Add ingredient to shopping list </button>}
