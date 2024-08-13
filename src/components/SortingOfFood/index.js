import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const SortingOfFood = props => {
  const {sortbyOptions, id, displayText, value, updateActiveOptionId} = props
  const onChangeSortby = event => {
    updateActiveOptionId(event.target.value)
  }

  return (
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <h1 className="sort-by">Sort by</h1>
        <select className="sort-by-select" value={id} onChange={onChangeSortby}>
          {sortbyOptions.map(eachOption => (
            <option key={eachOption.id} value={value} className="select-option">
              {displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SortingOfFood
