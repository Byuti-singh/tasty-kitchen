import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dxgtgmvys/image/upload/v1721756334/Frame_274_cf5ihx.svg"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <h1 className="tasty-kitchen-heading">Tasty Kitchens</h1>
      <nav className="header-end">
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </nav>
    </nav>
  )
}
export default withRouter(Header)
