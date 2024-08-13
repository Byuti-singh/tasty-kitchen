import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    count: 0,
  }

  onDecrement = props => {
    const {forCartItem, key} = props
    const {id, imageUrl, name, cost} = forCartItem
    let {count} = forCartItem
    count = count - 1
    if (count <= 0) {
      count = 0
    }

    const forCartItemUpdated = {id, imageUrl, name, cost, count}
    const forCartItemUpdatedStringify = JSON.stringify(forCartItemUpdated)
    localStorage.setItem(key, forCartItemUpdatedStringify)
    this.setState({
      count,
    })
  }

  onIncrement = props => {
    const {forCartItem, key} = props
    const {id, imageUrl, name, cost} = forCartItem
    let {count} = forCartItem
    count = count + 1

    const forCartItemUpdated = {id, imageUrl, name, cost, count}
    const forCartItemUpdatedStringify = JSON.stringify(forCartItemUpdated)
    localStorage.setItem(key, forCartItemUpdatedStringify)
    this.setState({
      count,
    })
  }

  render() {
    const {id} = this.props
    const key = `forCartItem${id}`
    const forCartItemStringify = localStorage.getItem(key)
    const forCartItem = JSON.parse(forCartItemStringify)
    const {count} = forCartItem

    return (
      <div className="counter-button-container">
        <button
          testid="decrement-count"
          type="button"
          onClick={() => this.onDecrement({forCartItem, key})}
          className="counter-button-decrement"
        >
          -
        </button>
        <div className="counter">{count}</div>
        <button
          testid="increment-count"
          type="button"
          onClick={() => this.onIncrement({forCartItem, key})}
          className="counter-button-increment"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
