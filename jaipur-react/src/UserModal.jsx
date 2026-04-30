import { useState } from 'react'

function UserModal({ onClose, onUserChange }) {

const getUser = () => JSON.parse(localStorage.getItem('user'))

const [view, setView] = useState(() => (getUser() ? 'profile' : 'form'))

const [formData, setFormData] = useState(() => {
const u = getUser()
return u || {
name: '',
email: '',
password: '',
phone: '',
age: '',
city: '',
travelType: '',
interest: '',
photo: ''
}
})

function handleChange(e) {
setFormData({ ...formData, [e.target.name]: e.target.value })
}

function handlePhotoChange(e) {
const file = e.target.files[0]
if (file) {
const reader = new FileReader()
reader.onloadend = () => setFormData({ ...formData, photo: reader.result })
reader.readAsDataURL(file)
}
}

async function handleSubmit(e) {
e.preventDefault()

try {
  const isUpdate = !!getUser()

  const url = isUpdate
    ? "http://localhost:8080/api/update"
    : "http://localhost:8080/api/signup"

  const method = isUpdate ? "PUT" : "POST"

  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(formData)
  })

  const data = await res.json()

  if (data.error) {
    alert(data.error)
    return
  }

  const user = data.user

  localStorage.setItem('user', JSON.stringify(user))
  onUserChange(user)

  setView('profile')

} catch (err) {
  console.error(err)
  alert("Server error")
}
}

function logout() {
localStorage.removeItem('user')
onUserChange(null)
onClose()
}

function startEdit() {
setFormData(getUser())
setView('form')
}

const user = getUser()

if (view === 'profile' && user) {
return ( <div className="modal-backdrop">
<div className="modal-box" style={{ textAlign: 'center' }}> <div className="modal-header"> <h2>My Profile</h2> <span className="close-btn" onClick={onClose}>✖</span> </div>

      {user.photo ? (
        <img
          src={user.photo}
          alt="User"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
      ) : (
        <div>Profile</div>
      )}

      <div style={{ textAlign: 'left' }}>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Age:</b> {user.age}</p>
        <p><b>City:</b> {user.city}</p>
        <p><b>Travel Type:</b> {user.travelType}</p>
        <p><b>Interest:</b> {user.interest}</p>
      </div>

      <button onClick={startEdit}>Edit Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  </div>
)

}

return ( <div className="modal-backdrop"> <div className="modal-box"> <div className="modal-header"> <h2>{user ? 'Update Profile' : 'Create Your Profile'}</h2> <span className="close-btn" onClick={onClose}>✖</span> </div>

    <form onSubmit={handleSubmit}>

      <input name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />

      <input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} />

      {!user && (
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
      )}

      <input name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} />

      <input name="age" type="number" placeholder="Age" required value={formData.age} onChange={handleChange} />

      <input name="city" placeholder="City" required value={formData.city} onChange={handleChange} />

      <select name="travelType" required value={formData.travelType} onChange={handleChange}>
        <option value="">Travel Type</option>
        <option value="Solo">Solo</option>
        <option value="Family">Family</option>
        <option value="Friends">Friends</option>
        <option value="Couple">Couple</option>
      </select>

      <select name="interest" required value={formData.interest} onChange={handleChange}>
        <option value="">Interest</option>
        <option value="Culture">Culture</option>
        <option value="Food">Food</option>
        <option value="Adventure">Adventure</option>
        <option value="Shopping">Shopping</option>
        <option value="Heritage">Heritage</option>
      </select>

      <input type="file" accept="image/*" onChange={handlePhotoChange} />

      <button type="submit">
        {user ? 'Save Changes' : 'Create Profile'}
      </button>
    </form>
  </div>
</div>

)
}

export default UserModal
