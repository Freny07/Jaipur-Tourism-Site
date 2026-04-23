function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Jaipur Tourism</h3>
          <p className="footer-text">
            Official Jaipur Tourism Portal — Explore attractions, food, culture, shopping &amp; heritage of the Pink City.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">About Jaipur</Link></li>
            <li><Link to="/attractions">Tourist Spots</Link></li>
            <li><Link to="/shopping">Shopping Destinations</Link></li>
            <li><Link to="/cuisine">Cuisines</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Help &amp; Support</h4>
          <ul className="footer-links">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Contact Info</h4>
          <p className="footer-text">📍 Jaipur Tourism Office,<br />Rajasthan, India</p>
          <p className="footer-text">📞 +91 98765 43210</p>
          <p className="footer-text">📧 info@jaipurtourism.in</p>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="footer-bottom">
        © 2025 Jaipur Tourism. All Rights Reserved.
      </p>
    </footer>
  )
}

import { Link } from 'react-router-dom'
export default Footer
