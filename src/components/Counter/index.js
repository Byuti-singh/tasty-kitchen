import {Component} from 'react'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'

import './index.css'

class Counter extends Component {
  state = {
    count1: 0,
  }

  onDecrement = props => {
    const {forCartItem, key} = props
    const {id, imageUrl, name, cost} = forCartItem
    let {count} = forCartItem
    count -= 1
    if (count <= 0) {
      count = 0
    }

    const forCartItemUpdated = {id, imageUrl, name, cost, count}
    const forCartItemUpdatedStringify = JSON.stringify(forCartItemUpdated)
    localStorage.setItem(key, forCartItemUpdatedStringify)
    this.setState({
      count1: count,
    })
  }

  onIncrement = props => {
    const {forCartItem, key} = props
    const {id, imageUrl, name, cost} = forCartItem
    let {count} = forCartItem
    count += 1

    const forCartItemUpdated = {id, imageUrl, name, cost, count}
    const forCartItemUpdatedStringify = JSON.stringify(forCartItemUpdated)
    localStorage.setItem(key, forCartItemUpdatedStringify)
    this.setState({
      count1: count,
    })
  }

  render() {
    const {count1} = this.state
    console.log(count1)
    const {id} = this.props
    const key = `forCartItem${id}`
    const forCartItemStringify = localStorage.getItem(key)
    const forCartItem = JSON.parse(forCartItemStringify)
    const {count} = forCartItem

    return (
      <div className="counter-button-container">
        <button
          type="button"
          onClick={() => this.onDecrement({forCartItem, key})}
          className="counter-button-decrement"
        >
          <HiOutlineMinusSm label="minus" />
        </button>
        <div className="counter">{count}</div>
        <button
          type="button"
          onClick={() => this.onIncrement({forCartItem, key})}
          className="counter-button-increment"
        >
          <BsPlus className="plus-icon" label="plus" />
        </button>
      </div>
    )
  }
}

export default Counter
