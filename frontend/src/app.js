import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'

// import './style.scss'

import Homepage from './components/Homepage'
import AllRecipes from './components/AllRecipes'
import SingleRecipe from './components/SingleRecipe'
import Register from './components/Register'
import Login from './components/Login'
import FiveStarredRecipes from './components/FiveStarredRecipes'
import NavBar from './components/NavBar'
import Fridge from './components/Fridge'
import SuggestedRecipes from './components/SuggestedRecipes'


const App = () => {
  return <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path={'/'} component={Homepage} />
      <Route exact path={'/recipes/'} component={AllRecipes} />
      <Route exact path={'/recipe/:id'} component={SingleRecipe} />
      <Route exact path={'/register/'} component={Register} />
      <Route exact path={'/login/'} component={Login} />
      <Route exact path={'/fivestarredrecipes/'} component={FiveStarredRecipes} />
      <Route exact path={'/fridge'} component={Fridge} />
      <Route exact path={'/suggestedrecipes/'} component={SuggestedRecipes} />

    </Switch>
  </BrowserRouter>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
