import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'



const SearchBar = ({ query, onChange, onSubmit }) => {


  const [healthLabels, setHealthLabels] = useState([])
  const [dietLabels, setDietLabels] = useState([])

  const searchTerms = `${query.split(' ').join('&')}$${dietLabels.join('&')}$${healthLabels.join('&')}`

  function handleDietCheck(e, label) {
    if (e) {
      setDietLabels([...dietLabels, label])
    } else {
      const newArr = dietLabels.filter(item => item !== label)
      setDietLabels(newArr)

    }
  }

  function handleHealthCheck(e, label) {
    if (e) {
      setHealthLabels([...healthLabels, label])
    } else {
      const newArr = healthLabels.filter(item => item !== label)
      setHealthLabels(newArr)
    }
  }

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


      <div>
        <h1>Diet labels</h1>
        <label className='checkbox'>Balanced<input type='checkbox' name='Balanced' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>
        <label className='checkbox'>High-Protein<input type='checkbox' name='High-Protein' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>
        <label className='checkbox'>Low-Carb<input type='checkbox' name='Low-Carb' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>
        <label className='checkbox'>Low-Fat<input type='checkbox' name='Low-Fat' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>
        <label className='checkbox'>Low-Sodium<input type='checkbox' name='Low-Sodium' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>

        <h1>Health labels</h1>
        <label className='checkbox'>Alcohol-Free<input type='checkbox' name='Alcohol-Free' onClick={() => handleHealthCheck(event.target.checked, event.target.name)} /></label>
        <label className='checkbox'>Vegetarian<input type='checkbox' name='Vegetarian' onClick={() => handleHealthCheck(event.target.checked, event.target.name)}/></label>
        <label className='checkbox'>Peanut-Free<input type='checkbox' name='Peanut-Free' onClick={() => handleHealthCheck(event.target.checked, event.target.name)}/></label>
        <label className='checkbox'>Vegan<input type='checkbox' name='Vegan' onClick={() => handleHealthCheck(event.target.checked, event.target.name)}/></label>
        <label className='checkbox'>Sugar-Conscious<input type='checkbox' name='Sugar-Conscious' onClick={() => handleHealthCheck(event.target.checked, event.target.name)}/></label>
        <label className='checkbox'>Tree-Nut-Free<input type='checkbox' name='Tree-Nut-Free' onClick={() => handleHealthCheck(event.target.checked, event.target.name)}/></label>

      </div>

      <Link
        to={{
          pathname: `/recipes/search/${searchTerms}`,
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