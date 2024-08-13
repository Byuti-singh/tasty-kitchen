import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const RestaurantCard = props => {
  const {id, eachItem} = props
  const {imageUrl, cuisine, name, userRating} = eachItem
  const {totalReviews, userRatingColor} = eachItem

  return (
    <Link to={`/restaurant/${id}`} className="restaurant-link">
      <li key={id} className="restaurant-list-type">
        <div className="restaurant-card-image-card">
          <img
            src={imageUrl}
            alt="restaurant"
            className="resturant-image-card"
          />
        </div>
        <div>
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>

          <div className="restaurant-card-details">
            <FaStar className="star-icon" color={userRatingColor} />

            <p className="restaurant-rating">{userRating}</p>
            <p className="restaurant-reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
