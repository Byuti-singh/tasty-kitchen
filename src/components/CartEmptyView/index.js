import {Link} from 'react-router-dom'

import './index.css'

const CartEmptyView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/dxgtgmvys/image/upload/v1722576709/Layer_2_c76ivb.png"
      className="cart-empty-img"
      alt="empty cart"
    />
    <h1 className="cart-empty-heading">No Orders Yet!</h1>
    <p className="cart-empty-para">
      Your cart is empty. Add something from the menu.
    </p>

    <Link to="/">
      <button type="button" className="shop-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default CartEmptyView
