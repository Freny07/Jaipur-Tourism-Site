import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { API_BASE_URL } from './apiConfig'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from './pages/Home'
import Attractions from './pages/Attractions'
import Shopping from './pages/Shopping'
import Cuisine from './pages/Cuisine'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Explorer from './pages/Explorer'
import Chatbot from './components/Chatbot'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE_URL}/me`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
          localStorage.setItem("user", JSON.stringify(data.user))
        } else {
          // If not logged in on backend, also check local storage as fallback
          const localUser = localStorage.getItem('user')
          if (localUser) setUser(JSON.parse(localUser))
        }
      })
      .catch(() => {
        const localUser = localStorage.getItem('user')
        if (localUser) setUser(JSON.parse(localUser))
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading-screen">
      <div className="loader"></div>
      <p>Verifying Royal Credentials...</p>
    </div>
  }


  function handleUserChange(u) {
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
  }

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/explorer" element={<Explorer />} />

        <Route path="*" element={
          <>
            <Navbar user={user} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/attractions" element={<Attractions />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="/cuisine" element={<Cuisine />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile user={user} onUserChange={handleUserChange} />} />
            </Routes>

            <Footer />
            <Chatbot />
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App