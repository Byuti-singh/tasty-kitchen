import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'
import {BsFilterLeft} from 'react-icons/bs'

import {Redirect, Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import OfferSlider from '../OfferSlider'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isLoading: true,
    restaurantList: [],
    limit: 9,
    total: 0,
    carouselImages: [],
    isOffersLoading: true,
    isRestaurantsLoading: true,
    activeOptionId: sortByOptions[0].id,
    activeCategoryId: '',
    searchInput: '',
    activeRatingId: '',
    restaurantApiStatus: restaurantsApiStatusConstants.initial,
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
  }

  componentDidMount() {
    Cookies.set('offset', 0)
    this.getOffers()
    this.getRestaurantsList()
    this.getProducts()
  }

  getOffers = async () => {
    const url = `https://apis.ccbp.in/restaurants-list/offers`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options) // ----> call to backend server to get data from database with token for valid user identification.
    if (response.ok === true) {
      const data = await response.json()
      const {offers} = data
      const updatedOffers = offers.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        carouselImages: updatedOffers,
        isOffersLoading: false,
      })
    } else {
      this.setState({
        isOffersLoading: false,
      })
    }
  }

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getRestaurantsList)
  }

  getRestaurantsList = async () => {
    this.setState({
      restaurantApiStatus: restaurantsApiStatusConstants.inProgress,
    })
    const {limit, selectedSortByValue, activePage, searchInput} = this.state
    const offset = Cookies.get('offset')
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {restaurants} = data

      const formattedRestaurants = restaurants.map(eachItem => ({
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        groupByTime: eachItem.group_by_time,
        hasOnlineDelivery: eachItem.has_online_delivery,
        hasTableBooking: eachItem.has_table_booking,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        isDeliveringNow: eachItem.is_delivering_now,
        location: eachItem.location,
        menuType: eachItem.menu_type,
        name: eachItem.name,
        opensAt: eachItem.opens_at,
        userRating: eachItem.user_rating.rating,
        userRatingColor: eachItem.user_rating.rating_color,
        userRatingText: eachItem.user_rating.rating_text,
        totalReviews: eachItem.user_rating.total_reviews,
      }))
      this.setState({
        restaurantList: formattedRestaurants,
        restaurantApiStatus: restaurantsApiStatusConstants.success,
        isRestaurantsLoading: false,
        total: data.total,
      })
    } else {
      this.setState({
        isRestaurantsLoading: false,
        restaurantApiStatus: restaurantsApiStatusConstants.failure,
      })
    }
  }

  getProducts = async () => {
    // this.setState({
    //   apiStatus: apiStatusConstants.inProgress,
    // })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, activeCategoryId} = this.state
    const {searchInput, activeRatingId} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    // const response = await fetch(apiUrl, options)
    // if (response.ok) {
    //   const fetchedData = await response.json()
    //   // const updatedData = fetchedData.products.map(product => ({
    //   //   title: product.title,
    //   //   brand: product.brand,
    //   //   price: product.price,
    //   //   id: product.id,
    //   //   imageUrl: product.image_url,
    //   //   rating: product.rating,
    //   // }))
    //   this.setState({
    //     productsList: updatedData,
    //     // apiStatus: apiStatusConstants.success,
    //   })
    // } else {
    //   this.setState({
    //     apiStatus: apiStatusConstants.failure,
    //   })
    // }
  }

  changeTheSortByOptionValue = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getRestaurantsList,
    )
  }

  onSearchRestaurant = event => {
    this.setState({searchInput: event.target.value}, this.getRestaurantsList)
  }

  onBackClick = () => {
    const {limit} = this.state
    let offset = Cookies.get('offset')
    offset = Number(offset) - limit
    if (offset <= 0) {
      offset = 0
    }
    Cookies.set('offset', offset)
    this.getRestaurantsList()
  }

  onNextClick = () => {
    const {limit, total} = this.state
    let offset = Cookies.get('offset')
    offset = Number(offset) + limit
    if (offset >= total) {
      offset = Number(offset) - limit
    }
    Cookies.set('offset', offset)
    this.getRestaurantsList()
  }

  render() {
    const {
      restaurantList,
      carouselImages,
      isOffersLoading,
      isRestaurantsLoading,
      selectedSortByValue,
    } = this.state

    return (
      <>
        <div className="home-container">
          <Header />
          {isRestaurantsLoading ? (
            <div
              className="products-loader-container"
              testid="restaurants-list-loader"
            >
              <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
            </div>
          ) : (
            <>
              {isOffersLoading ? (
                <div
                  className="products-loader-container"
                  testid="restaurants-offers-loader"
                >
                  <Loader
                    type="TailSpin"
                    color="#f7931e"
                    height="50"
                    width="50"
                  />
                </div>
              ) : (
                <div className="carousel-images">
                  <OfferSlider carouselImages={carouselImages} />
                </div>
              )}
              <div className="popular-restaurant-card">
                <div>
                  <h2 className="popular-restaurant-heading">
                    Popular Restaurants
                  </h2>
                  <p className="popular-restaurant-para">
                    Select Your favourite restaurant special dish and make your
                    day happy...
                  </p>
                </div>
                <div className="sort-detail">
                  <BsFilterLeft className="filter-left" />
                  <p className="sort-para">Sort By</p>
                  <select
                    id="sortBy"
                    onChange={this.changeTheSortByOptionValue}
                    value={selectedSortByValue}
                    className="sort-select"
                  >
                    {sortByOptions.map(eachOption => (
                      <option key={eachOption.id}>
                        {eachOption.displayText}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <ul className="restaurant-item-container">
                  {restaurantList.map(eachItem => (
                    <RestaurantCard
                      key={eachItem.id}
                      testid="restaurant-item"
                      id={eachItem.id}
                      eachItem={eachItem}
                    />
                  ))}
                </ul>
              </div>
              <div className="pagination-button">
                <button
                  type="button"
                  testid="pagination-left-button"
                  className="lessthan-btn"
                  onClick={this.onBackClick}
                >
                  <FaLessThan
                    label="Lessthan"
                    testid="pagination-left-button"
                  />
                </button>
                <p>1 of 20</p>
                <button
                  type="button"
                  testid="pagination-right-button"
                  className="greaterthan-btn"
                  onClick={this.onNextClick}
                >
                  <FaGreaterThan
                    label="Greaterthan"
                    testid="pagination-right-button"
                  />
                </button>
              </div>
              <Footer />
            </>
          )}
        </div>
      </>
    )
  }
}

export default Home
