import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  // const jwtToken = Cookies.get('jwt_token')
  //   if (jwtToken !== undefined) {
  //     return <Redirect to="/" />
  //   }

  // <p className="marking">
  //         * Designed & Developed by{' '}
  //         <span className="marking-span">Byuti Singh</span>
  //       </p>

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <div className="input-card">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-filed"
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <div className="input-card">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-filed"
            value={username}
            onChange={this.onChangeUsername}
          />
        </div>
      </>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="container">
        <div>
          <div className="login-form-container">
            <form className="form-container" onSubmit={this.submitForm}>
              <img
                src="https://res.cloudinary.com/dxgtgmvys/image/upload/v1721756334/Frame_274_cf5ihx.svg"
                alt="website logo"
                className="logo-image"
              />
              <h1 className="tasty-kitchen-heading">Tasty Kitchens</h1>
              <h1 className="login-heading">Login</h1>

              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}

              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <img
              src="https://res.cloudinary.com/dxgtgmvys/image/upload/v1721799961/Rectangle_1456_awcoqc.png"
              alt="website login"
              className="image1"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
