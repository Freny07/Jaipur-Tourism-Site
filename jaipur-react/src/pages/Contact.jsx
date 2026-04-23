import { useState } from 'react'
import Carousel from '../Carousel'

const STORAGE_KEY = 'jaipur_users'
const PACKAGES = {
  1: { title: 'Jaipur One-Day Tour', details: 'Amber Fort, Hawa Mahal, City Palace, Jantar Mantar, Shopping at Bapu Bazaar.' },
  2: { title: '2 Days Heritage Tour', details: 'Day 1: Amber Fort, Jaigarh Fort, Nahargarh Fort.\nDay 2: City Palace, Albert Hall Museum, Birla Mandir, Chokhi Dhani.' },
  3: { title: '3 Days Jaipur–Ajmer–Pushkar Tour', details: 'Day 1: Jaipur sightseeing.\nDay 2: Ajmer Sharif Dargah.\nDay 3: Pushkar Lake & Brahma Temple.' },
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

function Contact() {
  const [users, setUsers] = useState(loadUsers)
  const [form, setForm] = useState({ name: '', email: '', phone: '', pkg: '' })
  const [editingId, setEditingId] = useState(null)
  const [popup, setPopup] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { name, email, phone, pkg } = form
    if (!name || !email || !phone || !pkg) { alert('Please complete all fields.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email.'); return }
    if (!/^[0-9+\-\s()]{6,20}$/.test(phone)) { alert('Please enter a valid phone number.'); return }

    const packageName = PACKAGES[pkg]?.title || pkg

    let updated
    if (editingId) {
      updated = users.map(u => u.id === editingId ? { ...u, name, email, phone, packageValue: pkg, packageName } : u)
      setEditingId(null)
    } else {
      const id = String(Date.now()) + Math.floor(Math.random() * 999)
      updated = [{ id, name, email, phone, packageValue: pkg, packageName }, ...users]
      alert(`Thank you, ${name}! You have successfully registered for ${packageName}. Confirmation will be sent to ${email}.`)
    }

    saveUsers(updated)
    setUsers(updated)
    setForm({ name: '', email: '', phone: '', pkg: '' })
  }

  function startEdit(u) {
    setForm({ name: u.name, email: u.email, phone: u.phone, pkg: u.packageValue || '' })
    setEditingId(u.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteUser(id) {
    if (!confirm('Delete this registration?')) return
    const updated = users.filter(u => u.id !== id)
    saveUsers(updated)
    setUsers(updated)
    if (editingId === id) { setEditingId(null); setForm({ name: '', email: '', phone: '', pkg: '' }) }
  }

  function showPackage() {
    if (!form.pkg) { alert('Please select a package first!'); return }
    setPopup(PACKAGES[form.pkg])
  }

  return (
    <>
      <Carousel 
        title="Contact &amp; Book Your Jaipur Tour" 
        subtitle="Send us your details to register for a tourism package" 
      />

      <div className="container">
        <div className="section-title">Get in Touch</div>
        <div className="desc-wrapper">
          <p>
            <b>Address:</b> Jaipur Tourism Office, Pink City, Jaipur, Rajasthan<br />
            <b>Email:</b> info@jaipurtourism.com<br />
            <b>Phone:</b> +91-12345-67890<br />
            <b>Timings:</b> 9:00 AM – 7:00 PM (All days)
          </p>
        </div>

        <div className="form-section">
          <h2>Register for a Tourism Package</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Full Name" required value={form.name} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email Address" required value={form.email} onChange={handleChange} />
            <input name="phone" type="tel" placeholder="Phone Number" required value={form.phone} onChange={handleChange} />
            <select name="pkg" required value={form.pkg} onChange={handleChange}>
              <option value="">-- Select a Package --</option>
              <option value="1">Package 1: Jaipur One-Day Tour</option>
              <option value="2">Package 2: 2 Days Heritage Tour</option>
              <option value="3">Package 3: 3 Days Jaipur–Ajmer–Pushkar Tour</option>
            </select>
            <button type="button" onClick={showPackage}>View Package Details</button>
            <button type="submit">{editingId ? 'Update' : 'Register'}</button>
          </form>
        </div>

        <div className="form-section" style={{ marginTop: '10px' }}>
          <h2>Registered Users</h2>
          <div style={{ overflowX: 'auto' }}>
            {users.length === 0 ? (
              <p style={{ color: '#b37400' }}>No registrations yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'inherit', fontSize: '0.95em' }}>
                <thead>
                  <tr style={{ background: '#5f2aee', color: '#ffffff' }}>
                    <th style={{ padding: '10px', border: '1px solid black', textAlign: 'center' }}>Name</th>
                    <th style={{ padding: '10px', border: '1px solid black', textAlign: 'center' }}>Email</th>
                    <th style={{ padding: '10px', border: '1px solid black', textAlign: 'center' }}>Phone</th>
                    <th style={{ padding: '10px', border: '1px solid black', textAlign: 'center' }}>Package</th>
                    <th style={{ padding: '10px', border: '1px solid black', textAlign: 'center', width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td style={{ padding: '10px', color: '#5f2aee', border: '1px solid black' }}>{u.name}</td>
                      <td style={{ padding: '10px', color: '#5f2aee', border: '1px solid black' }}>{u.email}</td>
                      <td style={{ padding: '10px', color: '#5f2aee', border: '1px solid black' }}>{u.phone}</td>
                      <td style={{ padding: '10px', color: '#5f2aee', border: '1px solid black' }}>{u.packageName}</td>
                      <td style={{ padding: '8px', color: '#5f2aee', border: '1px solid black', textAlign: 'center' }}>
                        <button onClick={() => startEdit(u)} style={{ marginRight: '8px', padding: '6px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => deleteUser(u.id)} style={{ padding: '6px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {popup && (
        <div className="popup" style={{ display: 'flex' }}>
          <div className="popup-content">
            <span className="close-btn" onClick={() => setPopup(null)}>×</span>
            <h3>{popup.title}</h3>
            <p>{popup.details}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Contact
