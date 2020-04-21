import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import SearchBar from './SearchBar'

const SearchResults = () => {

  const [displaySearchResults, setDisplaySearchResults] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  // track what's being typed in state here, send it through to searchbar 
  // the searchbar component contains a link to a new searchresult page
  // the searchbar uses searchTerms as its URL, which is built from query
  // so searchbar needs query sent through, but in this component we need to call it 'reQuery', but send this value through as 'query'

  const [reQuery, setReQuery] = useState('')

  // this comes directly from the URL
  const { query } = useParams()

  

  // setSearchQuery(query)

  // searchQuery should be:
  //  - all recipe search --- from params
  //  - when searching again --- from params?

  useEffect(() => {
    
    fetch(`/api/main/recipes/search/${query}?page=${pageNumber}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setDisplaySearchResults(resp.results)
      })
    return () => console.log('Unmounting component')
  }, [query])



  // take search query from searchbar/allrecipesbytype component
  // make the request to the backend
  // display results

  // should have a searchbar at the top, and display what was searched for

  console.log(displaySearchResults)
  console.log('query', query)
  console.log('requery', reQuery)

  const queryString = query.split('&').join(' ')

  

  return (<>
    <h1>You searched for "{queryString}" - {displaySearchResults.length} results</h1>
    <SearchBar query={reQuery} onChange={() => setReQuery(event.target.value)}  />

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