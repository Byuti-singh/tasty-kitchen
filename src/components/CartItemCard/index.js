import Counter from '../Counter'
import './index.css'

const CartItemCard = props => {
  const {eachItem} = props
  const {id, imageUrl, name, cost, count} = eachItem
  const totalCost = count * cost

  return (
    <li key={id} className="cart-items-list">
      <div className="image-name-card">
        <img src={imageUrl} alt="cart-image" className="cart-item-image" />
        <h1 className="cart-name">{name}</h1>
      </div>
      <div className="counter-button-container">
        <Counter id={id} />
      </div>
      <h1 className="price">₹ {totalCost}.00</h1>
    </li>
  )
}

export default CartItemCard
