import {Component} from 'react'
import CartEmptyView from '../CartEmptyView'
import Header from '../Header'
import SuccessfulPayment from '../SuccessfulPayment'
import CartItemCard from '../CartItemCard'
import './index.css'

class Cart extends Component {
  state = {
    cartItemList: [],
    isOrderPlaced: false,
    totalAmountToPay: 0,
    totalItemInCart: 0,
  }

  componentDidMount() {
    this.getCartItems()
  }

  getCartItems = () => {
    let {totalAmountToPay} = this.state
    const {cartItemList} = this.state
    const emptyCartItemKeyList = []
    const totalItemInCart = localStorage.length
    for (let i = 0; i < totalItemInCart; i += 1) {
      const key = localStorage.key(i) // Get the key at index i
      const valueInString = localStorage.getItem(key) // Get the corresponding value
      const cartItem = JSON.parse(valueInString) // Parse the JSON string back to an object (if applicable)

      const {count, cost} = cartItem
      totalAmountToPay += cost * count

      if (count > 0) {
        cartItemList[i] = cartItem
      } else {
        emptyCartItemKeyList.push(key)
      }
    }

    emptyCartItemKeyList.map(key => localStorage.removeItem(key))
    this.setState({
      cartItemList,
      totalAmountToPay,
      totalItemInCart,
    })
  }

  onPlaceOrder = () => {
    const {isOrderPlaced} = this.state
    const totalAmountToPay = 0
    localStorage.clear()
    this.setState({
      isOrderPlaced: !isOrderPlaced,
      totalAmountToPay,
    })
  }

  render() {
    const {cartItemList, totalAmountToPay} = this.state
    const {totalItemInCart, isOrderPlaced} = this.state

    return (
      <>
        <Header />
        <>
          {isOrderPlaced ? (
            <SuccessfulPayment />
          ) : (
            <>
              <div>
                {totalItemInCart === 0 ? (
                  <CartEmptyView />
                ) : (
                  <div>
                    <div className="cart-heading">
                      <h1>Item</h1>
                      <h1>Quantity</h1>
                      <h1>Price</h1>
                    </div>
                    <ul className="cart-order-list">
                      {cartItemList.map(eachItem => (
                        <CartItemCard key={eachItem.id} eachItem={eachItem} />
                      ))}
                    </ul>
                    <hr className="hr-line" />
                    <div className="order-total">
                      <h1 className="total-order-heading">Order Total : </h1>
                      <h1 className="total-amount-heading">
                        ₹ {totalAmountToPay}
                      </h1>
                    </div>
                    <div className="place-order-container">
                      <button
                        className="place-order"
                        type="button"
                        onClick={this.onPlaceOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      </>
    )
  }
}
export default Cart
