import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ user }) {
  const [active, setActive] = useState(false)
  const location = useLocation()

  return (
    <>
      <nav>
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

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active-nav' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/attractions" className={location.pathname === '/attractions' ? 'active-nav' : ''}>Attraction</Link>
          </li>
          <li>
            <Link to="/shopping" className={location.pathname === '/shopping' ? 'active-nav' : ''}>Shopping</Link>
          </li>
          <li>
            <Link to="/cuisine" className={location.pathname === '/cuisine' ? 'active-nav' : ''}>Cuisine</Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active-nav' : ''}>Package</Link>
          </li>
          <li>
            <Link to="/profile" className={location.pathname === '/profile' ? 'active-nav' : ''}>
              {user ? (
                <img src={user.picture} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #A1673F' }} />
              ) : (
                <i className="fa-solid fa-user"></i>
              )}
            </Link>
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
          <li>
            <Link to="/" onClick={() => setActive(false)}>Home</Link>
          </li>
          <li>
            <Link to="/attractions" onClick={() => setActive(false)}>Attraction</Link>
          </li>
          <li>
            <Link to="/shopping" onClick={() => setActive(false)}>Shopping</Link>
          </li>
          <li>
            <Link to="/cuisine" onClick={() => setActive(false)}>Cuisine</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setActive(false)}>Package</Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setActive(false)}>Profile</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
