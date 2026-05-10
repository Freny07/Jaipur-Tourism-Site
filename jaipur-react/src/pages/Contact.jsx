import { useState, useEffect } from 'react'
import Carousel from '../Carousel'
import { API_BASE_URL } from '../apiConfig'

const STORAGE_KEY = 'jaipur_users'

// Calculate future dates for package starts
const getFutureDate = (days) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(9, 0, 0, 0)
  return d.toISOString()
}

// Get min travel date in IST (must be after today)
const getMinTravelDateIST = () => {
  // Current time in UTC
  const now = new Date();
  // IST is UTC + 5:30
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  
  // To allow only dates AFTER today (tomorrow onwards)
  istTime.setDate(istTime.getDate() + 1);
  
  return istTime.toISOString().split('T')[0];
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

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date()
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="countdown-box">
      <div className="countdown-item"><span>{timeLeft.days}</span><small>Days</small></div>
      <div className="countdown-item"><span>{timeLeft.hours}</span><small>Hours</small></div>
      <div className="countdown-item"><span>{timeLeft.minutes}</span><small>Mins</small></div>
      <div className="countdown-item"><span>{timeLeft.seconds}</span><small>Secs</small></div>
    </div>
  )
}

function Contact() {
  const [dbPackages, setDbPackages] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [adminFormData, setAdminFormData] = useState({ id: null, title: '', description: '', duration: '', price: '', imageUrl: '', packageType: 'EXCLUSIVE' })

  useEffect(() => {
    fetch(`${API_BASE_URL}/packages`)
      .then(res => res.json())
      .then(data => setDbPackages(data))
      .catch(err => console.error("Error fetching packages:", err));
      
    fetch(`${API_BASE_URL}/me`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => { 
        const rawEmail = data?.user?.email || data?.email;
        const email = rawEmail?.toLowerCase().trim();
        if (email === 'jaipur.tourism.official@gmail.com') setIsAdmin(true);
      })
      .catch(e => console.error(e));
  }, []);

  const FALLBACK_PACKAGES = [
    {
      id: 'f1',
      title: 'Amber Fort Heritage Tour',
      duration: 'Full Day',
      price: '₹1,500',
      rawPrice: 1500,
      details: 'Explore the majestic Amber Fort, including a guided tour of the Diwan-e-Aam, Sheesh Mahal, and the royal courtyards. Enjoy a magnificent sunset view.',
      image: '/packages/amber_fort.png',
      startDate: getFutureDate(7)
    },
    {
      id: 'f2',
      title: 'Royal Palace Tour',
      duration: 'Half Day',
      price: '₹1,200',
      rawPrice: 1200,
      details: 'A deep dive into the City Palace of Jaipur showcasing its intricate royal architecture, vibrant pink and peach colors, and elegant courtyards.',
      image: '/packages/city_palace.png',
      startDate: getFutureDate(10)
    },
    {
      id: 'f3',
      title: 'Cultural Night Safari',
      duration: 'Evening',
      price: '₹2,000',
      rawPrice: 2000,
      details: 'Experience Nahargarh fort at night overlooking the glittering city of Jaipur. Includes dinner under the starry sky and a magical atmosphere.',
      image: '/packages/nahagarh fort.jpg',
      startDate: getFutureDate(12)
    }
  ];

  const fetchedPackages = dbPackages.filter(p => p.packageType === 'EXCLUSIVE').map(p => ({
    id: String(p.id),
    title: p.title,
    duration: p.duration,
    price: '₹' + (p.price || 0).toLocaleString('en-IN'),
    rawPrice: p.price,
    details: p.description,
    image: p.imageUrl,
    startDate: getFutureDate(7)
  }));

  const PACKAGES = fetchedPackages.length > 0 ? fetchedPackages : FALLBACK_PACKAGES;

  const PLACES = dbPackages.filter(p => p.packageType === 'CUSTOM').map(p => ({
    id: String(p.id),
    name: p.title,
    price: p.price || 0,
    image: p.imageUrl
  }));

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this package?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/packages/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setDbPackages(prev => prev.filter(p => String(p.id) !== String(id)));
      } else {
        alert("Error deleting package. Only admins can do this.");
      }
    } catch (e) { console.error(e); }
  };

  const handleAdminSave = async (e) => {
    e.preventDefault();
    const isEdit = !!adminFormData.id;
    const url = isEdit ? `${API_BASE_URL}/admin/packages/${adminFormData.id}` : `${API_BASE_URL}/admin/packages`;
    const method = isEdit ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminFormData),
        credentials: 'include'
      });
      if (res.ok) {
        const savedPkg = await res.json();
        if (isEdit) {
          setDbPackages(prev => prev.map(p => p.id === savedPkg.id ? savedPkg : p));
        } else {
          setDbPackages(prev => [...prev, savedPkg]);
        }
        setAdminModalOpen(false);
      } else {
        alert("Error saving package. Make sure you are admin.");
      }
    } catch(e) {
      console.error(e);
    }
  };

  const openAdminModal = (pkg = null, type = 'EXCLUSIVE') => {
    if (pkg) {
      setAdminFormData({ id: pkg.id, title: pkg.title || pkg.name, description: pkg.details || pkg.description || '', duration: pkg.duration || '', price: pkg.rawPrice || pkg.price, imageUrl: pkg.image || pkg.imageUrl, packageType: type })
    } else {
      setAdminFormData({ id: null, title: '', description: '', duration: '', price: '', imageUrl: '', packageType: type })
    }
    setAdminModalOpen(true)
  };

  const [users, setUsers] = useState(loadUsers)
  const [form, setForm] = useState({ name: '', email: '', phone: '', pkg: '', travelDate: '', numberOfPersons: 1 })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const localUserRaw = localStorage.getItem('user');
    if (!localUserRaw) return;
    
    try {
      const localUser = JSON.parse(localUserRaw);
      if (localUser && localUser.email) {
        const userEmail = localUser.email.toLowerCase().trim();
        fetch(`${API_BASE_URL}/my-bookings?email=${userEmail}`, {
          credentials: 'include'
        })
        .then(res => res.ok ? res.json() : Promise.reject("Fetch failed"))
        .then(data => {
          if (Array.isArray(data)) {
            const now = new Date();
            // 1. Filter for valid future bookings and sort by proximity
            const futureBookings = data
              .filter(b => new Date(b.travelDate) > now)
              .sort((a, b) => new Date(a.travelDate) - new Date(b.travelDate));

            // 2. Map backend structure to frontend structure
            const syncedUsers = futureBookings.map(db => {
              const pkg = PACKAGES.find(p => p.title === db.packageName);
              let pkgValue = pkg ? pkg.id : '';
              
              // Handle custom packages that don't have a static ID in PACKAGES
              if (!pkgValue && db.packageName && db.packageName.includes('Custom')) {
                pkgValue = 'custom-' + db.id;
              }

              return {
                id: String(db.id),
                name: db.userName,
                email: db.userEmail,
                phone: db.userPhone,
                packageName: db.packageName,
                packageValue: pkgValue,
                price: db.packagePrice,
                startDate: db.travelDate,
                bookingDate: db.bookingDate
              };
            });

            // 3. Synchronize local state and storage
            setUsers(syncedUsers);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(syncedUsers));
            console.log(`Synced ${syncedUsers.length} upcoming bookings from server.`);
          }
        })
        .catch(err => console.warn("Background sync skipped:", err));
      }
    } catch (e) {
      console.error("Sync initialization failed:", e);
    }
  }, []);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)
  
  // Payment Gateway State
  const [paymentStep, setPaymentStep] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Custom Package State
  const [customPlaces, setCustomPlaces] = useState([])
  
  // Payment Formatting State
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')

  function handleCardNumberChange(e) {
    let val = e.target.value.replace(/\D/g, '') // Remove non-digits
    let formatted = val.match(/.{1,4}/g)?.join(' ') || ''
    setCardNumber(formatted)
  }

  function handleExpiryChange(e) {
    let val = e.target.value.replace(/\D/g, '') // Remove non-digits
    if (val.length > 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4)
    }
    setExpiryDate(val)
  }
  
  const totalCustomPrice = customPlaces.reduce((sum, id) => sum + PLACES.find(p => p.id === id).price, 0)
  
  function toggleCustomPlace(id) {
    if (customPlaces.includes(id)) {
      setCustomPlaces(customPlaces.filter(p => p !== id))
    } else {
      setCustomPlaces([...customPlaces, id])
    }
  }

  function openCustomBookingModal() {
    if (customPlaces.length === 0) {
      alert("Please select at least one place for your custom package.")
      return
    }
    const customPkg = {
      id: 'custom-' + Date.now(),
      title: 'Custom Jaipur Package',
      price: `₹${totalCustomPrice}`,
      details: `Visiting: ${customPlaces.map(id => PLACES.find(p => p.id === id).name).join(', ')}`,
      startDate: getFutureDate(5),
      isCustom: true
    }
    openBookingModal(customPkg)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function openBookingModal(pkg) {
    setSelectedPackage(pkg)
    setForm({ ...form, pkg: pkg.id, travelDate: pkg.startDate ? pkg.startDate.split('T')[0] : '' })
    setIsModalOpen(true)
    setPaymentStep(false)
    setPaymentSuccess(false)
  }

  function closeBookingModal() {
    setIsModalOpen(false)
    setSelectedPackage(null)
    setPaymentStep(false)
    setPaymentSuccess(false)
    setIsProcessing(false)
    if (!editingId) {
      setForm({ name: '', email: '', phone: '', pkg: '', travelDate: '', numberOfPersons: 1 })
    }
  }

  function handleDetailsSubmit(e) {
    e.preventDefault()
    const { name, email, phone, pkg, travelDate } = form
    if (!name || !email || !phone || !pkg || !travelDate) { alert('Please complete all fields.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email.'); return }
    if (!/^[0-9+\-\s()]{6,20}$/.test(phone)) { alert('Please enter a valid phone number.'); return }
    
    // Proceed to payment gateway
    setPaymentStep(true)
  }

  function handlePaymentSubmit(e) {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing delay (2 seconds)
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)
      
      // Simulate Email sending delay (1 second)
      setTimeout(() => {
        finalizeBooking()
      }, 1500)
    }, 2000)
  }

  async function finalizeBooking() {
    const { name, email, phone, pkg, travelDate, numberOfPersons } = form
    const pkgData = selectedPackage || PACKAGES.find(p => p.id === pkg)
    const packageName = pkgData ? pkgData.title : pkg
    const price = pkgData ? pkgData.price : 'Custom'
    const startDate = travelDate ? new Date(travelDate).toISOString() : (pkgData ? pkgData.startDate : new Date().toISOString())
    
    const priceNum = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g,"")) || 0 : price;
    const calculatedTotalAmount = priceNum * (numberOfPersons || 1);

    let updated
    let tempId = "";
    if (editingId) {
      updated = users.map(u => u.id === editingId ? { ...u, name, email, phone, packageValue: pkg, packageName, price, startDate } : u)
      setEditingId(null)
    } else {
      tempId = String(Date.now()) + Math.floor(Math.random() * 999)
      updated = [{ id: tempId, name, email, phone, packageValue: pkg, packageName, price, startDate, bookingDate: new Date().toISOString() }, ...users]
    }

    saveUsers(updated)
    setUsers(updated)
    
    // 1. MUST Save to Database first
    try {
      const dbRes = await fetch(`${API_BASE_URL}/save-booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: name,
          userEmail: email,
          userPhone: phone,
          packageName: packageName,
          packagePrice: price,
          travelDate: startDate,
          numberOfPersons: numberOfPersons || 1,
          totalAmount: calculatedTotalAmount
        })
      });
      
      if (!dbRes.ok) throw new Error("Server high demand");
      
      const result = await dbRes.json();
      const savedBooking = result.booking;
      console.log('Booking saved to database successfully', savedBooking);

      // Update local state with the REAL database ID
      if (savedBooking && savedBooking.id) {
         setUsers(prev => {
            const updatedWithId = prev.map(u => {
               if (u.id === tempId) return { ...u, id: String(savedBooking.id) };
               return u;
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWithId));
            return updatedWithId;
         });
      }
      
      // 2. Only if DB save succeeded, try to send email
      try {
        await fetch(`${API_BASE_URL}/send-booking-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, packageName, startDate })
        });
      } catch (e) {
        console.error('Email failed but DB saved:', e);
        // We don't fail the whole process if only email fails, but we notify
      }

      alert(`Payment Successful! Your booking for ${packageName} has been confirmed.`)
      closeBookingModal()

    } catch (err) {
      console.error('Database Save Error:', err);
      alert("Payment not successful due to our servers experiencing high demand on our end. Please try again in a few minutes.");
      // Do NOT close modal so they can try again or check details
      setIsProcessing(false); 
      setPaymentSuccess(false);
      setPaymentStep(true); 
    }
  }

  function startEdit(u) {
    setForm({ name: u.name, email: u.email, phone: u.phone, pkg: u.packageValue || '', travelDate: u.startDate ? u.startDate.split('T')[0] : '', numberOfPersons: u.numberOfPersons || 1 })
    setEditingId(u.id)
    
    let pkgData = PACKAGES.find(p => p.id === u.packageValue)
    if (!pkgData && u.packageValue.startsWith('custom-')) {
       pkgData = {
         id: u.packageValue,
         title: u.packageName,
         price: u.price || 'Custom Price',
         startDate: u.startDate,
         isCustom: true
       }
    }
    
    setSelectedPackage(pkgData)
    setIsModalOpen(true)
    setPaymentStep(false) // editing skips payment for demo, or you could force payment again.
  }

  const [cancelBookingId, setCancelBookingId] = useState(null)
  const [cancelStep, setCancelStep] = useState(1)
  const [cancelOtp, setCancelOtp] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false)

  function startCancel(u) {
    setCancelBookingId(u.id)
    setCancelStep(1)
    setCancelOtp('')
  }

  function closeCancelModal() {
    setCancelBookingId(null)
    setCancelStep(1)
    setCancelOtp('')
  }

  async function handleSendCancelOtp() {
    const u = users.find(user => user.id === cancelBookingId)
    if (!u) return;
    
    setIsSendingOtp(true)
    try {
      const res = await fetch(`${API_BASE_URL}/send-cancellation-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: u.email, packageName: u.packageName })
      });
      if (res.ok) {
        setCancelStep(2)
      } else {
        alert("Failed to send OTP.")
      }
    } catch (err) {
      alert("Failed to connect to server.")
    } finally {
      setIsSendingOtp(false)
    }
  }

  async function handleCancelConfirm() {
    const u = users.find(user => user.id === cancelBookingId)
    if (!u) {
      closeCancelModal()
      return
    }

    try {
      const otpRes = await fetch(`${API_BASE_URL}/verify-cancellation-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: u.email, otp: cancelOtp })
      });
      
      if (!otpRes.ok) {
        alert("Invalid or expired OTP.")
        return
      }
    } catch (err) {
       alert("Error verifying OTP.")
       return
    }

    // Call backend to send cancellation email
    try {
      await fetch(`${API_BASE_URL}/send-cancellation-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: u.name, email: u.email, phone: u.phone, packageName: u.packageName, startDate: u.startDate })
      });
      alert(`Trip Canceled. A cancellation confirmation email has been sent to ${u.email}.`)
    } catch (err) {
      console.error(err)
      alert(`Trip Canceled. However, we couldn't send the cancellation email right now.`)
    }

    const updated = users.filter(user => user.id !== cancelBookingId)
    saveUsers(updated)
    setUsers(updated)
    closeCancelModal()
  }

  return (
    <>
      <style>{`
        .headcount-input::-webkit-outer-spin-button,
        .headcount-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .headcount-input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      <Carousel 
        title="Discover Royal Jaipur" 
        subtitle="Choose from our exclusive, hand-picked tourism packages" 
      />

      <div className="container">
        
        {/* Upcoming Trips (Countdown Timer Section) */}
        {users.length > 0 && (
          <div className="upcoming-trips-section">
            <h2 style={{ textAlign: 'left', color: '#A1673F', marginBottom: '20px' }}>
              <i className="fa-solid fa-plane-departure"></i> Your Upcoming Trips
            </h2>
            {users.map(u => {
              let pkgData = PACKAGES.find(p => p.id === u.packageValue)
              if (!pkgData && u.packageValue.startsWith('custom-')) {
                 pkgData = {
                   id: u.packageValue,
                   title: u.packageName,
                   price: u.price || 'Custom Price',
                   startDate: u.startDate,
                   isCustom: true
                 }
              }
              if (!pkgData) return null;
              
              return (
                <div className="trip-card" key={u.id}>
                  <div className="trip-info">
                    <h4>{u.packageName}</h4>
                    <p><i className="fa-regular fa-calendar"></i> Starts on: {new Date(u.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    <p style={{fontSize: '0.9em', color: '#888'}}>Booked under: {u.name} ({u.email})</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#A1673F' }}>Starts in:</p>
                    <CountdownTimer targetDate={u.startDate} />
                    <button onClick={() => startCancel(u)} style={{ marginTop: '10px', width: '100%', padding: '8px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel Trip</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="section-title" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>Our Exclusive Packages</div>
        <p style={{ textAlign: 'center', color: '#665', fontSize: '1.1rem', marginBottom: '40px' }}>Experience the rich culture, heritage, and flavors of the Pink City.</p>
        
        {/* Packages Grid */}
        <div className="packages-grid">
          {PACKAGES.map((pkg) => (
            <div className="package-card" key={pkg.id} style={{ position: 'relative' }}>
              {isAdmin && (
                <>
                  <button className="delete-badge" style={{ position: 'absolute', top: '10px', left: '10px', background: 'red', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 999, fontWeight: 'bold', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }} onClick={(e) => { e.stopPropagation(); handleDeletePackage(pkg.id); }}>-</button>
                  <button className="edit-btn" style={{ position: 'absolute', top: '50px', left: '10px', background: '#A1673F', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 999, border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }} onClick={(e) => { e.stopPropagation(); openAdminModal(pkg, 'EXCLUSIVE'); }}>✏️</button>
                </>
              )}
              <div className="package-img-wrapper">
                <img src={pkg.image} alt={pkg.title} />
                <div className="package-badge"><i className="fa-regular fa-clock"></i> {pkg.duration}</div>
              </div>
              <div className="package-content">
                <div className="package-title">{pkg.title}</div>
                <div className="package-desc">{pkg.details}</div>
                <div className="package-footer">
                  <div className="package-price">{pkg.price} <span>/ person</span></div>
                  <button className="book-now-btn" onClick={() => openBookingModal(pkg)}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
          {isAdmin && (
             <div className="package-card dummy-card" style={{ border: '2px dashed #A1673F', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px', cursor: 'pointer', background: '#fefefe' }} onClick={() => openAdminModal(null, 'EXCLUSIVE')}>
                 <div style={{ fontSize: '3rem', color: '#A1673F' }}>+</div>
                 <p style={{ color: '#A1673F', fontWeight: 'bold', marginTop: '10px' }}>Add New Package</p>
             </div>
          )}
        </div>

        <div className="section-title" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px', marginTop: '40px' }}>Build Your Custom Package</div>
        <p style={{ textAlign: 'center', color: '#665', fontSize: '1.1rem', marginBottom: '30px' }}>Select the places you want to visit and we will calculate your customized package cost.</p>
        
        <div className="custom-builder-card" style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            {PLACES.map(place => (
              <div 
                key={place.id} 
                style={{ 
                  borderRadius: '15px', 
                  overflow: 'hidden', 
                  boxShadow: customPlaces.includes(place.id) ? '0 0 0 4px #A1673F' : '0 5px 15px rgba(0,0,0,0.1)', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  transform: customPlaces.includes(place.id) ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                {isAdmin && (
                  <>
                    <button className="delete-badge" style={{ position: 'absolute', top: '10px', left: '10px', background: 'red', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 999, fontWeight: 'bold', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }} onClick={(e) => { e.stopPropagation(); handleDeletePackage(place.id); }}>-</button>
                    <button className="edit-btn" style={{ position: 'absolute', top: '50px', left: '10px', background: '#A1673F', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 999, border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }} onClick={(e) => { e.stopPropagation(); openAdminModal(place, 'CUSTOM'); }}>✏️</button>
                  </>
                )}
                <div onClick={() => toggleCustomPlace(place.id)}>
                  <img src={place.image} alt={place.name} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                     {customPlaces.includes(place.id) ? <i className="fa-solid fa-check" style={{ color: '#A1673F', fontWeight: 'bold' }}></i> : <div style={{width:'15px', height:'15px', borderRadius:'50%', border:'2px solid #ccc'}}></div>}
                  </div>
                  <div style={{ padding: '15px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: '#3C2A21', fontSize: '1.1rem' }}>{place.name}</span>
                    <span style={{ color: '#A1673F', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{place.price}</span>
                  </div>
                </div>
              </div>
            ))}
            {isAdmin && (
              <div className="dummy-card" style={{ border: '2px dashed #A1673F', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '180px', cursor: 'pointer', background: '#fefefe' }} onClick={() => openAdminModal(null, 'CUSTOM')}>
                  <div style={{ fontSize: '3rem', color: '#A1673F' }}>+</div>
                  <p style={{ color: '#A1673F', fontWeight: 'bold', marginTop: '10px' }}>Add New Package</p>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px dashed #eee', paddingTop: '20px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ fontSize: '1.2rem', color: '#333' }}>Total Estimated Cost: <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#A1673F' }}>₹{totalCustomPrice}</span> <span style={{ fontSize: '0.9rem', color: '#888' }}>/ person</span></div>
            <button className="book-now-btn" onClick={openCustomBookingModal} style={{ padding: '12px 30px', fontSize: '1.1rem' }}>Book Custom Package</button>
          </div>
        </div>

        {/* Contact Info Glass Card */}
        <div className="contact-glass-card">
          <div style={{ flex: '1 1 350px' }}>
            <h2 style={{ color: '#A1673F', fontSize: '2rem', marginBottom: '25px', fontFamily: '"Playfair Display", serif' }}>Get in Touch</h2>
            
            <div className="contact-info-item">
              <div className="contact-icon-circle"><i className="fa-solid fa-location-dot"></i></div>
              <div className="contact-info-text">
                <h4>Our Office</h4>
                <p>Jaipur Tourism Center, Pink City, Jaipur, Rajasthan</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-circle"><i className="fa-solid fa-envelope"></i></div>
              <div className="contact-info-text">
                <h4>Email Us</h4>
                <p>jaipur.tourism.official@gmail.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-circle"><i className="fa-solid fa-phone"></i></div>
              <div className="contact-info-text">
                <h4>Call Us</h4>
                <p>+91-12345-67890 (9:00 AM - 7:00 PM)</p>
              </div>
            </div>
          </div>

          <div style={{ flex: '0 0 auto', textAlign: 'center', background: 'rgba(255,255,255,0.8)', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontWeight: '700', marginBottom: '20px', color: '#A1673F' }}>Follow Our Journey</h3>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`footer-social-btn footer-social-${s.name.toLowerCase()}`}
                  style={{ '--glow': s.glow, '--grad': s.gradient, width: '55px', height: '55px' }}
                >
                  <span className="footer-social-icon">{s.icon}</span>
                  <span className="footer-social-ring" />
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Booking & Payment Modal */}
      {isModalOpen && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <div className="booking-modal-header">
              <h3>
                {paymentSuccess ? 'Booking Confirmed!' : 
                 paymentStep ? 'Secure Payment' : 
                 editingId ? 'Update Booking' : 'Complete Your Booking'}
              </h3>
              <i className="fa-solid fa-xmark modal-close-icon" onClick={closeBookingModal}></i>
            </div>
            
            {selectedPackage && !paymentSuccess && (
              <div className="selected-package-info">
                <p><strong>Selected:</strong> {selectedPackage.title}</p>
                <p><strong>Price:</strong> {selectedPackage.price} / person</p>
                <p><strong>Date:</strong> {new Date(selectedPackage.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
              </div>
            )}

            {paymentSuccess ? (
              <div className="success-msg">
                <i className="fa-solid fa-circle-check" style={{ fontSize: '4rem', marginBottom: '15px' }}></i>
                <p>Payment Successful!</p>
                <p style={{ fontSize: '1rem', color: '#665', fontWeight: 'normal' }}>Generating your confirmation email...</p>
              </div>
            ) : paymentStep ? (
              <form onSubmit={handlePaymentSubmit} className="payment-gateway-container">
                {/* Hidden dummy fields to trick aggressive browser autofill */}
                <input type="text" name="prevent_autofill_user" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" />
                <input type="password" name="prevent_autofill_pass" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" />

                <p style={{ fontSize: '0.9rem', color: '#665', textAlign: 'center', marginBottom: '10px' }}><i className="fa-solid fa-lock"></i> Mock Payment Gateway (Do not enter real card details)</p>
                
                <input 
                  id="real-card-name-field"
                  name="user_specified_card_name" 
                  type="text" 
                  placeholder="Cardholder Name" 
                  required 
                  autoComplete="new-password" 
                />
                <input 
                  id="real-card-num-field"
                  name="user_specified_card_number"
                  type="text" 
                  placeholder="Card Number" 
                  maxLength="19" 
                  required 
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}" 
                  title="16 digit card number (4 groups of 4)" 
                  autoComplete="new-password"
                />
                
                <div className="card-details-row">
                  <input 
                    id="real-card-expiry-field"
                    name="user_specified_card_expiry"
                    type="text" 
                    placeholder="MM/YY" 
                    maxLength="5" 
                    required 
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    pattern="(0[1-9]|1[0-2])\/[0-9]{2}" 
                    title="Expiry in MM/YY format" 
                    autoComplete="new-password"
                  />
                  <input 
                    id="real-card-cvv-field"
                    name="user_specified_card_cvv"
                    type="tel" 
                    placeholder="CVV" 
                    maxLength="3" 
                    required 
                    pattern="\d{3}" 
                    title="3 digit CVV" 
                    autoComplete="new-password"
                    style={{ WebkitTextSecurity: 'disc' }} 
                  />
                </div>
                
                <button type="submit" className="pay-btn" disabled={isProcessing}>
                  {isProcessing ? 'Processing Payment...' : `Pay ₹${(parseFloat(String(selectedPackage.price).replace(/[^0-9.-]+/g,"")) || 0) * (form.numberOfPersons || 1)}`}
                </button>
                <button type="button" onClick={() => setPaymentStep(false)} style={{ background: '#f0f0f0', color: '#333' }}>Go Back</button>
              </form>
            ) : (
              <form onSubmit={handleDetailsSubmit} style={{ width: '100%', maxWidth: '100%' }}>
                <input name="name" type="text" placeholder="Full Name" required value={form.name} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email Address" required value={form.email} onChange={handleChange} />
                <input name="phone" type="tel" placeholder="Phone Number" required value={form.phone} onChange={handleChange} />
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#665', marginBottom: '5px', textAlign: 'left' }}>Number of Persons</label>
                  <div style={{ display: 'flex', alignItems: 'center', height: '48px', width: '100%', border: '1px solid #A1673F', borderRadius: '8px', overflow: 'hidden', background: '#FFF6EF', boxSizing: 'border-box' }}>
                    <button 
                      type="button" 
                      onClick={() => setForm({...form, numberOfPersons: Math.max(1, (form.numberOfPersons || 1) - 1)})} 
                      style={{ height: '100%', width: '45px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: '#A1673F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0, fontWeight: 'bold' }}
                    >-</button>
                    <input 
                      name="numberOfPersons" 
                      type="number" 
                      min="1" 
                      value={form.numberOfPersons || 1} 
                      onChange={handleChange} 
                      className="headcount-input"
                      style={{ height: '100%', flex: 1, textAlign: 'center', border: 'none', margin: 0, borderRadius: 0, fontSize: '1rem', background: 'transparent', color: '#4A372E', outline: 'none', padding: 0 }} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setForm({...form, numberOfPersons: (form.numberOfPersons || 1) + 1})} 
                      style={{ height: '100%', width: '45px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: '#A1673F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0, fontWeight: 'bold' }}
                    >+</button>
                  </div>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#665', marginBottom: '5px', textAlign: 'left' }}>Travel Date</label>
                  <input name="travelDate" type="date" required value={form.travelDate} onChange={handleChange} min={getMinTravelDateIST()} />
                </div>

                <select name="pkg" required value={form.pkg} onChange={handleChange} disabled={!!selectedPackage && !editingId} style={{ backgroundColor: selectedPackage && !editingId ? '#f0f0f0' : '#FFF6EF' }}>
                  <option value="">-- Select a Package --</option>
                  {PACKAGES.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                  {selectedPackage?.isCustom && (
                    <option value={selectedPackage.id}>{selectedPackage.title}</option>
                  )}
                </select>
                
                {selectedPackage && (
                  <div style={{ marginTop: '10px', padding: '12px 15px', background: '#FFF6EF', borderRadius: '8px', border: '1px solid #A1673F', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1rem', color: '#4A372E', fontWeight: 'bold' }}>Total Amount:</span>
                    <span style={{ fontSize: '1.2rem', color: '#A1673F', fontWeight: 'bold' }}>₹{(parseFloat(String(selectedPackage.price).replace(/[^0-9.-]+/g,"")) || 0) * (form.numberOfPersons || 1)}</span>
                  </div>
                )}
                
                <button type="submit" style={{ marginTop: '5px' }}>{editingId ? 'Proceed to Payment' : 'Proceed to Payment'}</button>
              </form>
            )}
          </div>
        </div>
      )}

      {cancelBookingId && (() => {
        const u = users.find(user => user.id === cancelBookingId)
        if (!u) return null;
        return (
          <div className="booking-modal-overlay">
            <div className="booking-modal" style={{ textAlign: 'center', maxWidth: '400px' }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '3rem', color: '#ff4d4d', marginBottom: '15px' }}></i>
              <h3 style={{ color: '#3C2A21', marginBottom: '10px' }}>Cancel Trip?</h3>
              {cancelStep === 1 ? (
                <>
                  <p style={{ color: '#665', marginBottom: '20px' }}>Are you sure you want to cancel your trip to <strong>{u.packageName}</strong>? We will send an OTP to {u.email} to confirm.</p>
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={closeCancelModal} style={{ background: '#f0f0f0', color: '#333', flex: 1 }}>No, Keep It</button>
                    <button onClick={handleSendCancelOtp} disabled={isSendingOtp} style={{ background: '#ff4d4d', color: 'white', flex: 1 }}>
                      {isSendingOtp ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ color: '#665', marginBottom: '10px' }}>Enter the 6-digit OTP sent to your email to confirm cancellation.</p>
                  <input type="text" placeholder="Enter OTP" value={cancelOtp} onChange={(e) => setCancelOtp(e.target.value)} style={{ width: '100%', marginBottom: '15px', textAlign: 'center', letterSpacing: '2px', fontSize: '1.2rem', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={closeCancelModal} style={{ background: '#f0f0f0', color: '#333', flex: 1 }}>Cancel</button>
                    <button onClick={handleCancelConfirm} style={{ background: '#ff4d4d', color: 'white', flex: 1 }}>Verify & Cancel Trip</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      })()}

      {/* Admin Package Modal */}
      {adminModalOpen && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <div className="booking-modal-header">
              <h3>{adminFormData.id ? 'Edit Package' : 'New Package'}</h3>
              <i className="fa-solid fa-xmark modal-close-icon" onClick={() => setAdminModalOpen(false)}></i>
            </div>
            <form onSubmit={handleAdminSave} style={{ width: '100%' }}>
              <input name="title" type="text" placeholder="Package Title" required value={adminFormData.title} onChange={(e) => setAdminFormData({...adminFormData, title: e.target.value})} />
              
              {adminFormData.packageType === 'EXCLUSIVE' && (
                <>
                  <textarea name="description" placeholder="Package Description" rows="3" value={adminFormData.description} onChange={(e) => setAdminFormData({...adminFormData, description: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}></textarea>
                  
                  <input name="duration" type="text" placeholder="Duration (e.g., Full Day, 2 Days)" value={adminFormData.duration} onChange={(e) => setAdminFormData({...adminFormData, duration: e.target.value})} />
                </>
              )}
              
              <input name="price" type="number" placeholder="Price (Numeric only)" required value={adminFormData.price} onChange={(e) => setAdminFormData({...adminFormData, price: e.target.value})} />
              
              <input name="imageUrl" type="text" placeholder="Image URL (e.g., https://...)" required value={adminFormData.imageUrl} onChange={(e) => setAdminFormData({...adminFormData, imageUrl: e.target.value})} />

              <select name="packageType" value={adminFormData.packageType} onChange={(e) => setAdminFormData({...adminFormData, packageType: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <option value="EXCLUSIVE">Exclusive Package</option>
                <option value="CUSTOM">Custom Package (Place)</option>
              </select>
              
              <button type="submit" style={{ marginTop: '15px' }}>Save Package</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Contact
