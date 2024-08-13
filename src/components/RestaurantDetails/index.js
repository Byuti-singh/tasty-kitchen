import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import FoodItemCard from '../FoodItemCard'

import './index.css'

class RestaurantDetails extends Component {
  state = {
    restaurantInfo: {},
    foodItems: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateRestaurantInfo = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }

      const updateFoodItems = data.food_items.map(eachItem => ({
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        rating: eachItem.rating,
      }))
      this.setState({
        restaurantInfo: updateRestaurantInfo,
        foodItems: updateFoodItems,
      })
    } else {
      console.log('error')
    }
  }

  render() {
    const {restaurantInfo, foodItems} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantInfo

    return (
      <div>
        <Header />
        <div className="restaurant-info-container">
          <div className="restaurant-info-card">
            <img
              src={imageUrl}
              alt="restaurant"
              className="restaurant-info-image"
            />
            <div className="restaurant-info-details-card">
              <h2 className="restaurant-info-name">{name}</h2>
              <p className="restaurant-info-cuisine">{cuisine}</p>
              <p className="restaurant-info-location">{location}</p>
              <div className="restaurant-info-rating-view">
                <FaStar className="star-icon" />
                <p className="restaurant-info-rating">{rating}</p>
              </div>
              <div className="restaurant-info-rating-view">
                <p className="restaurant-info-cost">{reviewsCount}+ Ratings</p>
                <hr className="horizontal-line" />
                <div>
                  <p className="restaurant-info-cost">₹ {costForTwo}</p>

                  <p className="restaurant-info-cost">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ul className="food-item-container">
            {foodItems.map(eachItem => (
              <FoodItemCard
                key={eachItem.id}
                id={eachItem.id}
                eachItem={eachItem}
              />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
