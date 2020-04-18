import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'

// import './style.scss'

import Homepage from './components/Homepage'
import AllRecipes from './components/AllRecipes'
import SingleRecipe from './components/SingleRecipe'

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path={'/'} component={Homepage} />
      <Route exact path={'/recipes/'} component={AllRecipes} />
      <Route exact path={'/recipe/:id'} component={SingleRecipe} />


    </Switch>
  </BrowserRouter>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
