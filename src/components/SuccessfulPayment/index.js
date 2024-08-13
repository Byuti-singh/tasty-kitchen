import {Link} from 'react-router-dom'
import {FaCheckCircle} from 'react-icons/fa'

import './index.css'

const SuccessfulPayment = () => (
  <div className="cart-empty-view-container">
    <FaCheckCircle className="check-icon" testid="pintrest-social-icon" />
    <h1 className="cart-empty-heading">Payment Successful</h1>
    <p className="cart-empty-para">
      Thank you for ordering <br />
      Your payment is successfully completed.
    </p>

    <Link to="/">
      <button type="button" className="shop-now-btn">
        Go To Home Page
      </button>
    </Link>
  </div>
)

export default SuccessfulPayment
