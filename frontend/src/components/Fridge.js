
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
          <div className="field fridgeformfield">
            <div className="control">
              <input
                className="input is-primary"
                onChange={(event) => this.handleChange(event)}
                type="text"
                name="query2"
              />
            </div>
          </div>
          <div className="field fridgeformfield">
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
            <button className="button is-grouped-centered fridgebutton fridgeformfield">Find me a recipe!</button>
          </Link>
        </form>
      </section>


    </div>
  }
}

export default Fridge