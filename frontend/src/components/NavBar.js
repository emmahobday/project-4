import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../../lib/auth'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {
      navMobileOpen: false
    }
  }

  handleLogout() {
    auth.logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navMobileOpen: false })
    }
  }

  render() {
    const isLoggedIn = auth.isLoggedIn()
    return <>
      <nav className="navbar recipenavbar">
        <div className="container navbar-container">

          <div className="navbar-brand">
            <div className="navbar-item navitem">
              <Link className="navbar-edited" to="/recipes">Find a recipe</Link>
            </div>
            {/* burger at the end */}
            <a
              role="button"
              className={`navbar-burger burger ${this.state.navMobileOpen ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={() => this.setState({ navMobileOpen: !this.state.navMobileOpen })}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>


          <div className={`navbar-menu ${this.state.navMobileOpen ? 'is-active' : ''}`}>
            <div className="navbar-start">


              {/* should be centered - LOGO */}
              <div className="navbar-item">
                <Link className="navbar-edited navbar-home" to="/">recipedia</Link>
              </div>
            </div>
            <div className="navbar-end">


              {/* Not logged in - show signup/login */}
              {!isLoggedIn && <div className="navbar-item">
                <Link className="navbar-edited nav-reg-text" to="/register"><small>Sign-up /</small></Link>
                <Link className="navbar-edited nav-login-text" to="/login"><small>Log-in</small></Link>
              </div>}


              {isLoggedIn && <div className="navbar-item has-dropdown is-hoverable navbar-name">

                <div className="navbar-link">
                  <Link className="navbar-edited" to="/">{auth.getName()}</Link>
                </div>

                <div className="navbar-dropdown">

                  {isLoggedIn && <div className="navbar-item">
                    <Link className="navbar-edited" to="/fivestarredrecipes"> Your &#9733;&#9733;&#9733;&#9733;&#9733; Recipes</Link>
                  </div>}

                  {isLoggedIn && <div className="navbar-item">
                    <Link className="navbar-edited" to="/suggestedrecipes">Suggested For You</Link>
                  </div>}

                  {isLoggedIn && <div className="navbar-item">
                    <Link className="navbar-edited" to="/shoppinglist">Shopping List</Link>
                  </div>}

                  {isLoggedIn && <div className="navbar-item">
                    <Link className="navbar-edited" to="/mealplan">Meal Plan</Link>
                  </div>}
                  <div className="navbar-edited navbar-item">
                    <div
                      onClick={() => this.handleLogout()}
                      className="navbar-item dropdown-item"
                    >
                      Log out
                    </div>
                  </div>


                </div>

                {/* <div className="navbar-dropdown">
                  <div className="navbar-edited">
                    <div
                      onClick={() => this.handleLogout()}
                      className="navbar-item dropdown-item"
                    >
                      Log out
                    </div>
                  </div>
                </div> */}

              </div>}


            </div>
          </div>
        </div>
      </nav>

    </>
  }
}

export default withRouter(NavBar)
// will need to be withRouter in future