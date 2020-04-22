
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



class Fridge extends React.Component {

  constructor() {
    super()
    this.state = {
      fields: {
        query1: '',
        query2: '',
        query3: ''
      },
      data: [
      ],
      error: ''
    }
  }



  handleChange(event) {
    const { name, value } = event.target
    const fields = { ...this.state.fields, [name]: value }
    console.log(fields)
    this.setState({ fields })
  }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   axios.get(`/api/main/recipes/fridge/${this.state.fields.query1}&${this.state.fields.query2}&${this.state.fields.query3}`)
  //     .then(response => this.setState({
  //       data: response.data.results
  //     }))
  //     .catch(error => this.setState({ error: error.response.data.message }))
  // }



  render() {
    const query = [this.state.fields.query1, this.state.fields.query2, this.state.fields.query3].join('&')
    const searchTerms = `${query}$$`

    console.log('searchTerms', searchTerms)
    console.log('query1', this.state.fields.query1)
    console.log('this.state.data.', this.state.fields)

    if (!this.state.data) return <h1> ... </h1>

    return <div>
      <section className="fridgesection">
        {/* <h1>RECIPE BY FRIDGE INGREDIENTS</h1> */}
        <h1 className="homepagesubtitle">Enter up to 3 ingredients</h1>
        <form className="fridgeform">

          <div className="field fridgeformfield">
            <div className="control">
              <input
                className="input is-primary"
                onChange={(event) => this.handleChange(event)}
                type="text"
                name="query1"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input is-primary"
                onChange={(event) => this.handleChange(event)}
                type="text"
                name="query2"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input is-primary"
                onChange={(event) => this.handleChange(event)}
                type="text"
                name="query3"
              />
            </div>
          </div>
          <Link
            to={{
              pathname: `/recipes/search/${searchTerms}`,
              state: {
                // query: query,
                searchTerms: searchTerms
              }
            }}

          >
            <button className="button is-grouped-centered fridgebutton">Find me a recipe!</button>
          </Link>
        </form>
      </section>

      {/* <section>

        <div className="section">
          <div className="container">
            <div className="columns is-full-mobile is-multiline is-centered mobile-padding">

              {this.state.data.map(recipe => {

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
          {/* <button onClick={() => setPageNumber(pageNumber - 1)} disabled={!fullData.previous}> previous </button>
          <button onClick={() => setPageNumber(pageNumber + 1)} disabled={!fullData.next} > next </button>
          <div>
            {displayPageNumbers.map(page => {
              return <button onClick={() => setPageNumber(page)} key={page}> {page} </button>
            })}
          </div> */}
      {/* </div > */}
      {/* // </section> */}
    </div>
  }
}

export default Fridge