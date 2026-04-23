import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ user }) {
  const [active, setActive] = useState(false)
  const location = useLocation()

  return (
    <nav>
      <div className="logo">
        <h1 style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>JAIPUR-TOUR</h1>
      </div>

      <ul className={active ? 'menubar active' : 'menubar'}>
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

      <div className="hamburger" onClick={() => setActive(!active)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  )
}

export default Navbar
