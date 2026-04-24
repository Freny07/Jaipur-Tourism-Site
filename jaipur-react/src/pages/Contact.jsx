import { useState } from 'react'
import Carousel from '../Carousel'

const STORAGE_KEY = 'jaipur_users'
const PACKAGES = {
  1: { title: 'Jaipur One-Day Tour', details: 'Amber Fort, Hawa Mahal, City Palace, Jantar Mantar, Shopping at Bapu Bazaar.' },
  2: { title: '2 Days Heritage Tour', details: 'Day 1: Amber Fort, Jaigarh Fort, Nahargarh Fort.\nDay 2: City Palace, Albert Hall Museum, Birla Mandir, Chokhi Dhani.' },
  3: { title: '3 Days Jaipur–Ajmer–Pushkar Tour', details: 'Day 1: Jaipur sightseeing.\nDay 2: Ajmer Sharif Dargah.\nDay 3: Pushkar Lake & Brahma Temple.' },
}

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
        <div
          className="cards-row"
          style={{
            backgroundColor: '#ffd4b7',
            borderRadius: '20px',
            padding: '20px 25px',
            color: 'black',
            marginBottom: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div style={{ flex: '1 1 300px' }}>
            <p style={{ margin: '0 0 8px 0' }}><b>Address:</b> Jaipur Tourism Office, Pink City, Jaipur, Rajasthan</p>
            <p style={{ margin: '0 0 8px 0' }}><b>Email:</b> info@jaipurtourism.com</p>
            <p style={{ margin: '0 0 8px 0' }}><b>Phone:</b> +91-12345-67890</p>
            <p style={{ margin: '0' }}><b>Timings:</b> 9:00 AM – 7:00 PM (All days)</p>
          </div>

          <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
            <p style={{ fontWeight: '700', marginBottom: '12px', color: '#A1673F' }}>Connect with us</p>
            <div style={{ display: 'flex', gap: '15px' }}>
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
