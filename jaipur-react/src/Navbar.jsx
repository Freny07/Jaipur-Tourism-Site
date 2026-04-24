import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ user }) {
  const [active, setActive] = useState(false)
  const location = useLocation()

  return (
    <>
      <nav>
        <div className="logo-area">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img
                style={{ borderRadius: '50%', margin: '0 12px 6px 0px' }}
                src="/favicon.jpeg"
                alt="JT"
                width="37"
              />
              <h1>JAIPUR-TOUR</h1>
            </Link>
          </div>

          <Link to="/explorer" className="nav-map-pill explorer-link">
            <i className="fa-solid fa-map-location-dot"></i>
            <span>Explorer Map</span>
          </Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active-nav' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/attractions" className={location.pathname === '/attractions' ? 'active-nav' : ''}>Attractions</Link>
          </li>
          <li>
            <Link to="/shopping" className={location.pathname === '/shopping' ? 'active-nav' : ''}>Shopping</Link>
          </li>
          <li>
            <Link to="/cuisine" className={location.pathname === '/cuisine' ? 'active-nav' : ''}>Cuisine</Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active-nav' : ''}>Packages</Link>
          </li>
          <li style={{ marginLeft: '10px' }}>
            {user ? (
              <Link
                to="/profile"
                className="nav-profile-circle"
                title={`${user.name}'s Profile`}
              >
                <img
                  src={user.photo || user.picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Link>
            ) : (
              <Link to="/profile" className="nav-login-btn">
                Log In
              </Link>
            )}
          </li>
        </ul>

        <div className={active ? 'hamburger hamburger-active' : 'hamburger'} onClick={() => setActive(!active)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>

      <div className={active ? 'menubar active' : 'menubar'}>
        <ul>
          <li><Link to="/" onClick={() => setActive(false)}>Home</Link></li>
          <li><Link to="/explorer" onClick={() => setActive(false)}>Explorer Map</Link></li>
          <li><Link to="/attractions" onClick={() => setActive(false)}>Attractions</Link></li>
          <li><Link to="/shopping" onClick={() => setActive(false)}>Shopping</Link></li>
          <li><Link to="/cuisine" onClick={() => setActive(false)}>Cuisine</Link></li>
          <li><Link to="/contact" onClick={() => setActive(false)}>Packages</Link></li>
          <li><Link to="/profile" onClick={() => setActive(false)}>Profile</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
