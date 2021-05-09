
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import LoadSpinner from './LoadSpinner'


const AllRecipes = () => {
  const proteins = ['chicken', 'salmon', 'pasta', 'beef', 'prawn', 'lamb', 'cheese', 'tuna', 'tofu', 'salad', 'scallop', 'pork', 'egg', 'potato', 'rice', 'mussels', 'beans', 'cod', 'crab', 'falafel']
  const [recipes, setRecipes] = useState([[{ main_protein: '' }]])
  const [query, setQuery] = useState('')

  const searchTerms = query.split(' ')


  useEffect(() => {
    const promises = []
    const finalArray = []
    proteins.forEach(protein => {
      promises.push(
        fetch(`/api/main/recipes/type/summary/${protein}`)
          .then(resp => resp.json())
          .then(resp => {
            console.log(resp),
              finalArray.push(resp.results.concat({ 'id': `section/${protein}`, 'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png', 'dish_name': 'See more' }))
          }))
    })
    Promise.all(promises)
      .then(() => {
        setRecipes(finalArray)
      })
  }, [])

  //when all the proteins load recipes.length will be 20
  if (recipes.length < 20) return <LoadSpinner />


  return (<>
    <section className="hero is-medium is-bold is-allrecipes-primary">
      <div className="hero-body center">
        <div className="container">
          <h1 className="allrecipestitle">
            Browse All Recipes
          </h1>
        </div>
      </div>
    </section>

    <section className="neutral">
      {/* search all recipes search bar - search ingredients and name */}
      {/* this would need to redirect to a new results page, given layout */}
      {/* that page could show 'you searched for "....." - x results' and a searchbar to search again */}
      {/* would need to remove whitespace and send each word through as a search term */}
      {/* Send though the whole string as props when you click submit? */}
      <SearchBar query={query} onChange={() => setQuery(event.target.value)} onSubmit={() => event.preventDefault()} />
    </section>

    <div className="section neutral">
      {recipes.map((protein) => {
        // console.log(protein[0].id)
        return <div key={protein[0].main_protein}>
          <h1 className='recipe-subheading'>{protein[0].main_protein.toUpperCase()} RECIPES</h1>
          <div className="container scroll">
            <div className="columns is-full-mobile is-centered mobile-padding">
              {protein.map(recipe => {
                return <Link key={recipe.id} className="column is-one-fifth-desktop is-one-quarter-tablet is-one-third-mobile" to={`recipe/${recipe.id}`}>
                  <div className="card" >
                    <div className="card-image">
                      <figure className="image">
                        <img src={recipe.image} alt="Placeholder image" className="resImage" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="subtitle">{recipe.dish_name}</div>
                    </div>
                  </div>
                </Link>
              })
              }
            </div>
          </div>
        </div>
      })}
    </div>

  </>)
}


export default AllRecipes