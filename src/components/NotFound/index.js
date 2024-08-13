import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dxgtgmvys/image/upload/v1721803027/Group_kpbzkb.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>

    <button type="button">
      <Link className="button" to="/">
        Home Page
      </Link>
    </button>
  </div>
)

export default NotFound
