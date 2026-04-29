import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
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
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')))

  function handleUserChange(u) {
    setUser(u)
  }

  return (
    <GoogleOAuthProvider clientId="841581793985-rlaalqdfbbkr11c3cdoj2qvrlhftoa62.apps.googleusercontent.com">
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
                <Route path="/profile" element={<Profile onUserChange={handleUserChange} />} />
              </Routes>
              <Footer />
              <Chatbot />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
