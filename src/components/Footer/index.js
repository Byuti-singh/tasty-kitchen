import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
// import {FaInstagram} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-heading-card">
        <img
          className="website-logo-footer"
          src="https://res.cloudinary.com/dxgtgmvys/image/upload/v1722154618/Frame_275_e3rnav.png"
          alt="website-footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food. <br />
        Contact us on
      </p>
      <div className="footer-icon-card">
        <FaPinterestSquare className="icon" testid="pintrest-social-icon" />
        <FaInstagram className="icon" testid="instagram-social-icon" />
        <FaTwitter className="icon" testid="twitter-social-icon" />
        <FaFacebookSquare className="icon" testid="facebook-social-icon" />
      </div>
    </div>
  )
}
