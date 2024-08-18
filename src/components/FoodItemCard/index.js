import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import Counter from '../Counter'

import './index.css'

class FoodItemCard extends Component {
  state = {
    count: 0,
  }

  add = eachItem => {
    const {id, imageUrl, name, cost} = eachItem
    const count = 1
    const forCartItem = {
      id,
      imageUrl,
      name,
      cost,
      count,
    }

    const key = `forCartItem${id}`
    const forCartItemString = JSON.stringify(forCartItem)

    localStorage.setItem(key, forCartItemString)

    this.setState({
      count,
    })
  }

  render() {
    const {id, eachItem} = this.props
    const {cost, imageUrl, name, rating} = eachItem

    const key = `forCartItem${id}`
    const forCartItemString = localStorage.getItem(key)
    const forCartItem = JSON.parse(forCartItemString)
    let countForCheck = null
    if (forCartItem === null) {
      const {count} = this.state
      countForCheck = count
    } else {
      const {count} = forCartItem
      countForCheck = count
    }

    return (
      <li key={id} className="food-item-list-container">
        <div className="restaurant-card-image-card">
          <img src={imageUrl} alt="restaurant" className="food-image-card" />
        </div>
        <div>
          <h1 className="food-name">{name}</h1>
          <p className="food-cost">₹ {cost}</p>

          <div className="food-card-details">
            <FaStar className="star-icon" color="#ffa412" />
            <p className="food-rating">{rating}</p>
          </div>
          <div>
            {countForCheck !== 0 ? (
              <Counter id={id} />
            ) : (
              <button
                type="button"
                className="add-button"
                onClick={() => this.add(eachItem)}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default FoodItemCard
