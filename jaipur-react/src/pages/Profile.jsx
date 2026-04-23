import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

function Profile({ onUserChange }) {
  const navigate = useNavigate()

  const getLoggedInUser = () => JSON.parse(localStorage.getItem('user'))
  
  const [authMode, setAuthMode] = useState(() => (getLoggedInUser() ? 'profile' : 'signin'))
  
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', age: '', city: '', travelType: '', interest: '', photo: ''
  })
  
  const [loginData, setLoginData] = useState({ email: '', password: '' })

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleLoginChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFormData({ ...formData, photo: reader.result })
      reader.readAsDataURL(file)
    }
  }

  const API_URL = 'http://localhost:8080/api';

  async function handleSignup(e) {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (!response.ok || result.error) {
        alert(result.error || "Signup failed");
        return;
      }
      localStorage.setItem('user', JSON.stringify(result.user))
      onUserChange(result.user)
      setAuthMode('profile')
      alert("Account created successfully!");
    } catch (err) {
      alert("Backend error. Make sure the Java server is running and MySQL is active!");
    }
  }

  async function handleSignin(e) {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const result = await response.json();
      if (response.ok && !result.error) {
        localStorage.setItem('user', JSON.stringify(result.user))
        onUserChange(result.user)
        setAuthMode('profile')
      } else {
        alert(result.error || "Invalid credentials");
      }
    } catch (err) {
      alert("Backend error. Make sure the Java server is running and MySQL is active!");
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Fetch user info using the access token
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      const decoded = await res.json();
      
      const googleUser = {
        name: decoded.name,
        email: decoded.email,
        photo: decoded.picture,
        city: 'Jaipur (Auto)',
        interest: 'Heritage'
      };
      
      localStorage.setItem('user', JSON.stringify(googleUser));
      onUserChange(googleUser);
      setAuthMode('profile');
      alert(`Welcome ${decoded.name}!`);
    },
    onError: () => alert('Google Login Failed'),
  });

  const handleGoogleError = () => {
    alert('Google Login Failed');
  };

  function handleEditSave(e) {
    e.preventDefault()
    // For simplicity, we just update local storage here, but in a real app, you'd have a PUT endpoint
    localStorage.setItem('user', JSON.stringify(formData))
    onUserChange(formData)
    setAuthMode('profile')
    alert("Profile updated locally!")
  }

  function logout() {
    localStorage.removeItem('user')
    onUserChange(null)
    setAuthMode('signin')
    setLoginData({ email: '', password: '' })
    navigate('/')
  }

  function startEdit() {
    setFormData(getLoggedInUser())
    setAuthMode('edit')
  }

  const user = getLoggedInUser()

  if (authMode === 'profile' && user) {
    return (
      <div className="profile-page">
        <div className="profile-card futuristic">
          <h2>My Profile</h2>

          {user.photo ? (
            <img src={user.photo} alt="User" className="profile-photo" />
          ) : (
            <div className="profile-avatar">👤</div>
          )}

          <div className="profile-info">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            {user.phone && <p><b>Phone:</b> {user.phone}</p>}
            {user.age && <p><b>Age:</b> {user.age}</p>}
            <p><b>City:</b> {user.city}</p>
            {user.travelType && <p><b>Travel Type:</b> {user.travelType}</p>}
            <p><b>Interest:</b> {user.interest}</p>
          </div>

          <div className="profile-btns">
            <button onClick={startEdit}>Edit Profile</button>
            <button onClick={logout} style={{ background: '#c0392b' }}>Logout</button>
          </div>
        </div>
      </div>
    )
  }

  if (authMode === 'edit' && user) {
    return (
      <div className="profile-page">
        <div className="profile-card futuristic">
          <h2>Update Profile</h2>
          
          <div className="photo-upload-area">
            <div className="photo-preview">
              {formData.photo ? (
                <img src={formData.photo} alt="preview" />
              ) : (
                <i className="fa-solid fa-camera"></i>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ fontSize: '12px' }} />
          </div>

          <form onSubmit={handleEditSave} style={{ width: '100%' }}>
            <input name="name" placeholder="Full Name" required value={formData.name} onChange={handleFormChange} />
            <input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleFormChange} readOnly title="Email cannot be changed" style={{ background: '#eee' }} />
            <input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleFormChange} />
            <input name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleFormChange} />
            <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleFormChange} />
            <input name="city" placeholder="City" required value={formData.city} onChange={handleFormChange} />

            <select name="travelType" value={formData.travelType} onChange={handleFormChange}>
              <option value="">Travel Type</option>
              <option value="Solo">Solo</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Couple">Couple</option>
            </select>

            <select name="interest" value={formData.interest} onChange={handleFormChange}>
              <option value="">Interest</option>
              <option value="Culture">Culture</option>
              <option value="Food">Food</option>
              <option value="Adventure">Adventure</option>
              <option value="Shopping">Shopping</option>
              <option value="Heritage">Heritage</option>
            </select>

            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setAuthMode('profile')} style={{ background: '#888', marginTop: '10px' }}>Cancel</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-card futuristic">
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '0 0 25px 0' }}>
          <h2 
            onClick={() => setAuthMode('signin')} 
            style={{ 
              cursor: 'pointer', 
              borderBottom: authMode === 'signin' ? '3px solid #A1673F' : 'none', 
              color: authMode === 'signin' ? '#A1673F' : '#ccc',
              margin: 0,
              paddingBottom: '5px'
            }}
          >
            Sign In
          </h2>
          <h2 
            onClick={() => setAuthMode('signup')} 
            style={{ 
              cursor: 'pointer', 
              borderBottom: authMode === 'signup' ? '3px solid #A1673F' : 'none', 
              color: authMode === 'signup' ? '#A1673F' : '#ccc',
              margin: 0,
              paddingBottom: '5px'
            }}
          >
            Sign Up
          </h2>
        </div>

        {authMode === 'signin' ? (
          <>
            <form onSubmit={handleSignin} style={{ width: '100%' }}>
              <input name="email" type="email" placeholder="Email" required value={loginData.email} onChange={handleLoginChange} />
              <input name="password" type="password" placeholder="Password" required value={loginData.password} onChange={handleLoginChange} />
              <button type="submit" style={{ marginTop: '10px' }}>Sign In</button>
            </form>
          </>
        ) : (
          <>
            <div className="photo-upload-area">
              <div className="photo-preview">
                {formData.photo ? (
                  <img src={formData.photo} alt="preview" />
                ) : (
                  <i className="fa-solid fa-camera"></i>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ fontSize: '12px' }} />
            </div>

            <form onSubmit={handleSignup} style={{ width: '100%' }}>
              <input name="name" placeholder="Full Name" required value={formData.name} onChange={handleFormChange} />
              <input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleFormChange} />
              <input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleFormChange} />
              <input name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleFormChange} />
              <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleFormChange} />
              <input name="city" placeholder="City" required value={formData.city} onChange={handleFormChange} />

              <select name="travelType" value={formData.travelType} onChange={handleFormChange}>
                <option value="">Travel Type</option>
                <option value="Solo">Solo</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Couple">Couple</option>
              </select>

              <select name="interest" value={formData.interest} onChange={handleFormChange}>
                <option value="">Interest</option>
                <option value="Culture">Culture</option>
                <option value="Food">Food</option>
                <option value="Adventure">Adventure</option>
                <option value="Shopping">Shopping</option>
                <option value="Heritage">Heritage</option>
              </select>

              <button type="submit">Create Account</button>
            </form>
          </>
        )}

        <div className="divider"><span>or</span></div>

        <div className="google-auth-container" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <button className="google-btn" onClick={() => loginWithGoogle()}>
            {authMode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
