// import * as React from 'react';
import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';

import {
  Scheduler,
  MonthView,
  Appointments,
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
          currentDate={currentDate}
        />
        <MonthView />
        <Appointments />
      </Scheduler>
    </Paper>
  )

}


export default Calander