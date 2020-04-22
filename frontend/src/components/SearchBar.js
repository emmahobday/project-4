import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SearchBar = ({ query, onChange, onSubmit }) => {


  const [healthLabels, setHealthLabels] = useState([])
  const [dietLabels, setDietLabels] = useState([])
  const [hidden, setHidden] = useState(true)

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
      <div className="searchField">
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
            pathname: `/recipes/search/${searchTerms}`,
            state: {
              query: query,
              searchTerms: searchTerms
            }
          }}
        >
          <button className='button is-primary' onClick={() => setHidden(true)}>Find me a recipe!</button>
        </Link>
      </div>

      <div className={`dropdown ${hidden ? '' : 'is-active'}`}>
        <div className="dropdown-trigger" onClick={() => setHidden(!hidden)}>
          <button className="button advanced-search" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={(event) => event.preventDefault()}>
            <span>Advanced search</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
          <div className="dropdown-content">
            {/* <h1>Diet labels</h1> */}
            <label className='checkbox asitem'>Balanced<input type='checkbox' name='Balanced' className='check' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>
            <label className='checkbox asitem'>High-Protein<input type='checkbox' name='High-Protein' className='check' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>
            <label className='checkbox asitem'>Low-Carb<input type='checkbox' name='Low-Carb' className='check' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>
            <label className='checkbox asitem'>Low-Fat<input type='checkbox' name='Low-Fat' className='check' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>
            <label className='checkbox asitem'>Low-Sodium<input type='checkbox' name='Low-Sodium' className='check' onClick={() => handleDietCheck(event.target.checked, event.target.name)} /></label>
            <hr className="dropdown-divider" />
            {/* <h1>Health labels</h1> */}
            <label className='checkbox asitem'>Alcohol-Free<input type='checkbox' name='Alcohol-Free'className='check'  onClick={() => handleHealthCheck(event.target.checked, event.target.name)} /></label>
            <label className='checkbox asitem'>Vegetarian<input type='checkbox' name='Vegetarian' className='check' onClick={() => handleHealthCheck(event.target.checked, event.target.name)} /></label>
            <label className='checkbox asitem'>Peanut-Free<input type='checkbox' name='Peanut-Free' className='check' onClick={() => handleHealthCheck(event.target.checked, event.target.name)} /></label>
            <label className='checkbox asitem'>Vegan<input type='checkbox' name='Vegan' className='check' onClick={() => handleHealthCheck(event.target.checked, event.target.name)} /></label>
            <label className='checkbox asitem'>Sugar-Conscious<input type='checkbox' name='Sugar-Conscious' className='check' onClick={() => handleHealthCheck(event.target.checked, event.target.name)} /></label>
            <label className='checkbox asitem'>Tree-Nut-Free<input type='checkbox' name='Tree-Nut-Free' className='check' onClick={() => handleHealthCheck(event.target.checked, event.target.name)} /></label>
            <hr className="dropdown-divider" />
            <Link
              to={{
                pathname: `/recipes/search/${searchTerms}`,
                state: {
                  query: query,
                  searchTerms: searchTerms
                }
              }}
            >
              <button className='button is-primary' onClick={() => setHidden(true)}>Apply filters</button>
            </Link>
          </div>
        </div>

      </div>


      <div>

      </div>



    </form>
  </>
}

export default SearchBar