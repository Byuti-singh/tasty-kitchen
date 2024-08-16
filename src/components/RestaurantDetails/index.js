import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
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
      <>
        <Header />
        <div className="product-detail-restro-intro-complete-container">
          <img
            className="restaurant-detail-page-image-main"
            src={imageUrl}
            alt="restaurant"
          />

          <div className="restaurant-detail-page-main-top-content">
            <h1 className="restaurant-detail-page-main-heading">{name}</h1>
            <p className="restaurant-detail-page-main-cuisine">{cuisine}</p>
            <p className="restaurant-detail-page-main-location">{location}</p>
            <div className="restaurant-detail-page-main-rate-container">
              <div className="restaurant-detail-page-main-bottom-container-left">
                <div className="restaurant-detail-page-main-flex">
                  <AiFillStar />
                  <p className="detail-page-rating-and-rupees">{rating}</p>
                </div>
                <p className="detail-page-rating-and-rupees-details">
                  {reviewsCount}+ Ratings
                </p>
              </div>
              <div className="detail-page-main-vertical-line">{null}</div>
              <div className="restaurant-detail-page-main-bottom-container-right">
                <div className="restaurant-detail-page-main-flex">
                  <BiRupee />
                  <p className="detail-page-rating-and-rupees">{costForTwo}</p>
                </div>
                <p className="detail-page-rating-and-rupees-details">
                  Cost for two
                </p>
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

        <div>
          <Footer />
        </div>
      </>
    )
  }
}

export default RestaurantDetails
