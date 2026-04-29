import { Link } from 'react-router-dom';

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/jaipur_tour_updates/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    gradient: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    glow: 'rgba(220, 39, 67, 0.6)',
    label: 'Instagram',
  },
  {
    name: 'X',
    url: 'https://x.com/Jaipur_Packages',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
    gradient: 'linear-gradient(45deg, #000000, #14171A)',
    glow: 'rgba(29, 161, 242, 0.6)',
    label: 'X (Twitter)',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61560712251459',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    gradient: 'linear-gradient(45deg, #1877F2, #42A5F5)',
    glow: 'rgba(24, 119, 242, 0.6)',
    label: 'Facebook',
  },
];

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-upper">
        <div style={{ maxWidth: '1300px', margin: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 250px', marginBottom: '25px' }}>
            <h3 style={{ color: '#f4c27a', fontWeight: '700', marginBottom: '15px' }}>Jaipur Tourism</h3>
            <p style={{ lineHeight: '1.7' }}>
              Official Jaipur Tourism Portal — Explore attractions, food, culture, shopping &amp; heritage of the Pink City.
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
            <h4 style={{ color: '#f4c27a', fontWeight: '700', marginBottom: '10px' }}>Help &amp; Support</h4>
            <ul style={{ lineHeight: '2', paddingLeft: '0', listStyle: 'none' }}>
              <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms &amp; Conditions</a></li>
            </ul>
          </div>

          <div style={{ flex: '1 1 250px', marginBottom: '25px' }}>
            <h4 style={{ color: '#f4c27a', fontWeight: '700', marginBottom: '10px' }}>Contact Info</h4>
            <p>📍 Jaipur Tourism Office,<br />Rajasthan, India</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 info@jaipurtourism.in</p>

            {/* Social Media Icons */}
            <div style={{ marginTop: '18px' }}>
              <p style={{ color: '#f4c27a', fontWeight: '600', marginBottom: '12px', fontSize: '0.95em', letterSpacing: '0.5px' }}>
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className={`footer-social-btn footer-social-${s.name.toLowerCase()}`}
                    style={{ '--glow': s.glow, '--grad': s.gradient }}
                  >
                    <span className="footer-social-icon">{s.icon}</span>
                    <span className="footer-social-ring" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>© 2025 Jaipur Tourism. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
