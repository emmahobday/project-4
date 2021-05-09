
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const AllRecipes = () => {
  const [data, setData] = useState([])
  const [fullData, setfullData] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)


  useEffect(() => {
    fetch(`/api/main/recipes/?page=${pageNumber}`)
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

  return (<div className="section">
    <div className="container">
      <div className="columns is-full-mobile is-multiline is-centered mobile-padding">

        {data.map(recipe => {

          return <Link key={recipe.id} className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile" to={`recipe/${recipe.id}`}>
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
    <div className="allpagebuttons">
      <button className="pagebutton prevnextbutton" onClick={() => setPageNumber(pageNumber - 1)} disabled={!fullData.previous}> Previous </button>
      <span>
        {displayPageNumbers.map(page => {
          return <button className="pagebutton" onClick={() => setPageNumber(page)} key={page}> {page} </button>

          // <>
          //   <a key={page} onClick={() => setPageNumber(page)} target='_blank' href=''>
          //     {page}
          //   </a>
          //   <span>  </span>
          // </>
          // <button onClick={() => setPageNumber(page)} key={page}> {page} </button>
        })}
      </span>
      <button className="prevnextbutton pagebutton" onClick={() => setPageNumber(pageNumber + 1)} disabled={!fullData.next} > Next </button>


    </div>

  </div >)
}


export default AllRecipes