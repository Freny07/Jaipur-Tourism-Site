import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="main-footer">
      <div style={{ maxWidth: '1300px', margin: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 250px', marginBottom: '25px' }}>
          <h3 style={{ color: '#f4c27a', fontWeight: '700', marginBottom: '15px' }}>Jaipur Tourism</h3>
          <p style={{ lineHeight: '1.7' }}>
            Official Jaipur Tourism Portal — Explore attractions, food, culture, shopping & heritage of the Pink City.
          </p>
        </div>

        <div style={{ flex: '1 1 200px', marginBottom: '25px' }}>
          <h4 style={{ color: '#f4c27a', fontWeight: '700', marginBottom: '10px' }}>Quick Links</h4>
          <ul style={{ lineHeight: '2', paddingLeft: '0', listStyle: 'none' }}>
            <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>About Jaipur</Link></li>
            <li><Link to="/attractions" style={{ color: 'white', textDecoration: 'none' }}>Tourist Spots</Link></li>
            <li><Link to="/shopping" style={{ color: 'white', textDecoration: 'none' }}>Shopping Destinations</Link></li>
            <li><Link to="/cuisine" style={{ color: 'white', textDecoration: 'none' }}>Cuisines</Link></li>
          </ul>
        </div>

        <div style={{ flex: '1 1 200px', marginBottom: '25px' }}>
          <h4 style={{ color: '#f4c27a', fontWeight: '700', marginBottom: '10px' }}>Help & Support</h4>
          <ul style={{ lineHeight: '2', paddingLeft: '0', listStyle: 'none' }}>
            <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms & Conditions</a></li>
          </ul>
        </div>

        <div style={{ flex: '1 1 250px', marginBottom: '25px' }}>
          <h4 style={{ color: '#f4c27a', fontWeight: '700', marginBottom: '10px' }}>Contact Info</h4>
          <p>📍 Jaipur Tourism Office,<br />Rajasthan, India</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 info@jaipurtourism.in</p>
        </div>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#555', margin: '20px 0' }} />

      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
        © 2025 Jaipur Tourism. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
