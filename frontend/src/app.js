import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'


import 'bulma'

import './style.scss'

import Homepage from './components/Homepage'
// import AllRecipes from './components/AllRecipes'
import SingleRecipe from './components/SingleRecipe'
import Register from './components/Register'
import Login from './components/Login'
import FiveStarredRecipes from './components/FiveStarredRecipes'
import NavBar from './components/NavBar'
import Fridge from './components/Fridge'
import SuggestedRecipes from './components/SuggestedRecipes'
import ShoppingList from './components/ShoppingList'
import AllRecipes from './components/AllRecipes'
import AllRecipesByType from './components/AllRecipesByType'
import RecipesByMainProtein from './components/RecipesByMainProtein'
import SearchResults from './components/SearchResults'
import MealPlan from './components/MealPlan'
import RecipesbyDietType from './components/RecipesByDietType'


const App = () => {
  return <HashRouter>
    <NavBar />
    <Switch>
      <Route exact path={'/'} component={Homepage} />
      {/* <Route exact path={'/recipes/'} component={AllRecipes} /> */}
      <Route exact path={'/recipe/section/:id'} component={RecipesByMainProtein} />
      <Route exact path={'/recipes/diet/:id'} component={RecipesbyDietType} />
      <Route exact path={'/recipes/'} component={AllRecipesByType} />
      <Route exact path={'/recipe/:id'} component={SingleRecipe} />
      <Route exact path={'/register/'} component={Register} />
      <Route exact path={'/login/'} component={Login} />
      <Route exact path={'/fivestarredrecipes/'} component={FiveStarredRecipes} />
      <Route exact path={'/fridge'} component={Fridge} />
      <Route exact path={'/recipes/search/:query'} component={SearchResults} />
      <Route exact path={'/suggestedrecipes/'} component={SuggestedRecipes} />
      <Route exact path={'/shoppinglist/'} component={ShoppingList} />
      <Route exact path={'/mealplan'} component={MealPlan} />

    </Switch>
  </HashRouter>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
