import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const RecipesByMainProtein = (props) => {
  const [data, setData] = useState([])
  const [fullData, setfullData] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const id = props.match.params.id
  console.log(id)


  useEffect(() => {
    fetch(`/api/main/recipes/type/${id}?page=${pageNumber}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setfullData(resp)
        setData(resp.results)
      })
    return () => console.log('Unmounting component')
  }, [pageNumber])

  if (!fullData) return <h1> waiting for recipe data </h1>
  console.log(fullData.count)
  const displayPageNumbers = []
  for (let i = 1; i <= Math.ceil(fullData.count / 40); i++) {
    displayPageNumbers.push(i)
  }
  console.log(displayPageNumbers)

  return (<>
  <h1>{id.toUpperCase()}</h1>
  <div className="section">
    <div className="container">
      <div className="columns is-full-mobile is-multiline is-centered mobile-padding">

        {data.map(recipe => {

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
    <button onClick={() => setPageNumber(pageNumber - 1)} disabled={!fullData.previous}> previous </button>
    <button onClick={() => setPageNumber(pageNumber + 1)} disabled={!fullData.next} > next </button>
    <div>
      {displayPageNumbers.map(page => {
        return <button onClick={() => setPageNumber(page)} key={page}> {page} </button>
      })}
    </div>
  </div >
  </>)
}


export default RecipesByMainProtein