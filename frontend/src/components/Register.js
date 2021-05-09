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
      .then(res => console.log('response line 29', res))
      .then(() => {
        console.log('hi - line 31')
        this.props.history.push('/login')
      })
      .catch(error => {
        console.log('error 35', error.response.data)
        this.setState({ errors: error.response.data })
      })
  }



  render() {
    const { errors } = this.state

    return <div className="login-container">
      <section className="hero is-success is-fullheight registerbackground">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 registerboxonright">
              <div className="login-top">
                <h1 className="title">Register</h1>
                <hr className="login-hr" />
                <p className="subtitle marginbottomsubtitle">Please enter your details to register.</p>
              </div>
              <div className="box box-override">
                <div className="transparent-background">
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
                        {errors.email}
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
                        {errors.username}
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
                        {errors.password}
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
                        {errors.password_confirmation}
                      </small>}
                    </div>
                    <button className="button is-success is-normal">
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