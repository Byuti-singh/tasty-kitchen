import Slider from 'react-slick'

import './index.css'

const OfferSlider = props => {
  const {carouselImages} = props

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop sliding
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Auto-slide the items
    autoplaySpeed: 2000, // Time before auto-slide (in ms)
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {carouselImages.map(eachItem => (
          <div>
            <img
              src={eachItem.imageUrl}
              alt="offer"
              key={eachItem.id}
              className="home-food-img"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default OfferSlider
