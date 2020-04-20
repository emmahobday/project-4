import React from 'react'
import { Link } from 'react-router-dom'



const SearchBar = ({ query, onChange, onSubmit }) => {

  const searchTerms = query.split(' ').join('&')
  console.log(searchTerms)

  //on submit, this should redirect to searchrecipes page, sending through query as state


  return <>
    <form
      onSubmit={(event) => onSubmit(event)}
    >
      <div className="search">
        <div className="field">
          {/* <label className="label is-flex"> <strong className="searchfont"> SEARCH BY RESTAURANT NAME </strong> </label> */}
          <div className="control">
            <input
              className="input is-rounded"
              type="text"
              placeholder="Search for a recipe name or ingredient..."
              value={query}
              onChange={onChange}>
            </input>
          </div>
        </div>
      </div >

      <Link
        to={{
          pathname: `recipes/search/${searchTerms}`,
          state: {
            query: query,
            searchTerms: searchTerms
          }
        }}

      >

        <button>Find me a recipe!</button>
      </Link>

    </form>
  </>
}

export default SearchBar