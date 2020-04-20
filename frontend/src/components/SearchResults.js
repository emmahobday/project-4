import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

const SearchResults = () => {

  const [displaySearchResults, setDisplaySearchResults] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  const { query } = useParams()

  useEffect(() => {
    fetch(`/api/main/recipes/fridge/${query}?page=${pageNumber}`)
    // this should be a different fetch that checks dish_name as well as ingredients!
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setDisplaySearchResults(resp.results)
      })
    return () => console.log('Unmounting component')
  }, [pageNumber])



  // take search query from searchbar/allrecipesbytype component
  // make the request to the backend
  // display results

  // should have a searchbar at the top, and display what was searched for

  console.log(displaySearchResults)
  console.log('query', query)

  const queryString = query.split('&').join(' ')



  return (<>
    <h1>You searched for "{queryString}"</h1>
    <div className="section">
      <div className="container">
        <div className="columns is-full-mobile is-multiline is-centered mobile-padding">

          {displaySearchResults.map(recipe => {

            return <Link key={recipe.id} className="column is-one-fifth-desktop is-one-quarter-tablet is-one-third-mobile" to={`/recipe/${recipe.id}`}>
              <div className="card" >
                <div className="card-image">
                  <figure className="image">
                    <img src={recipe.image} alt="Placeholder image" className="resImage" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="subtitle">{recipe.dish_name}</div>
                  <div className="subtitle">Serves {recipe.servings}</div>
                </div>

              </div>
            </Link>
          })}
        </div>
      </div >
      {/* <button onClick={() => setPageNumber(pageNumber - 1)} disabled={!fullData.previous}> previous </button>
      <button onClick={() => setPageNumber(pageNumber + 1)} disabled={!fullData.next} > next </button>
      <div>
        {displayPageNumbers.map(page => {
          return <button onClick={() => setPageNumber(page)} key={page}> {page} </button>
        })}
      </div> */}
    </div >
  </>)



}

export default SearchResults