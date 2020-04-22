import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
      },
      errors: {}
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    console.log(data)
    this.setState({ data })
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/register',
      this.state.data)
      .then(res => console.log('response ', res))
      .then(() => {
        this.props.history.push('/login')
      })
      .catch(error => {
        console.log('line 34', error.response)
        console.log('line 35', error.response.data)
        this.setState({ errors: error.response.data.errors })
      })
  }

  render() {
    const { errors } = this.state
    console.log('errors:', errors)


    return <div className="login-container">
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <div className="login-top">
                <h1 className="title">Register</h1>
                <hr className="login-hr" />
                <p className="subtitle">Please enter your details to register.</p>
              </div>
              <div className="box box-override">
                <div className="transparent-background">
                  <figure className="avatar">
                    {/* <img src="https://cdn.webshopapp.com/shops/251281/files/208187906/muddaritaville-mu-welcome-small.jpg" /> */}
                  </figure>
                  <form
                    className="form"
                    onSubmit={(event) => this.handleSubmit(event)}
                  >
                    <div className="field">
                      <label className="label">
                        Email
                      </label>
                      <div className="control">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="text"
                          name="email"
                          className="input"
                        />
                      </div>
                      {errors.email && <small className="help is-danger">
                        {errors.email.message}
                      </small>}
                    </div>

                    <div className="field">
                      <label className="label">
                        Username
                      </label>
                      <div className="control">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="text"
                          name="username"
                          className="input"
                        />
                      </div>
                      {errors.username && <small className="help is-danger">
                        {errors.username.message}
                      </small>}
                    </div>

                    <div className="field">
                      <label className="label">
                        Password
                      </label>
                      <div className="control">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="password"
                          name="password"
                          className="input"
                        />
                      </div>
                      {errors.password && <small className="help is-danger">
                        {errors.password.message}
                      </small>}
                    </div>

                    <div className="field">
                      <label className="label">
                        Confirm your password
                      </label>
                      <div className="control">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="password"
                          name="password_confirmation"
                          className="input"
                        />
                      </div>
                      {errors.password_confirmation && <small className="help is-danger">
                        {errors.password_confirmation.message}
                      </small>}
                    </div>
                    <button className="button is-success is-large">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  }

}

export default Register