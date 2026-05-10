import React, { useState, useEffect } from 'react';
import Carousel from '../Carousel';

const SHOPPING_CATEGORIES = [
  { id: 'all', name: 'All Picks', icon: '🛍️', sub: 'Explore Everything' },
  { id: 'textiles', name: 'Textiles', icon: '🧣', sub: 'Bandhej & Block Prints' },
  { id: 'jewellery', name: 'Jewellery', icon: '💎', sub: 'Kundan & Meenakari' },
  { id: 'handicrafts', name: 'Handicrafts', icon: '🏺', sub: 'Blue Pottery & Lac' }
];

const MARKETS_DATA = [
  {
    id: 1,
    name: "Johari Bazaar",
    category: "jewellery",
    featured: true,
    image: "https://i.pinimg.com/736x/8f/55/40/8f55404f451c715ce3ac30ebdceb12aa.jpg",
    description: "Jaipur's oldest and most glittering market, Johari Bazaar is a haven for jewellery lovers. Specializing in gold, silver, and the world-famous Kundan and Meenakari work.",
    speciality: "Precious Gemstones",
    timings: "10:00 AM - 8:00 PM",
    bargain: "High",
    rating: "4.9",
    tips: ["Visit during wedding season for the best collections", "Check multiple shops for price comparison", "Try the famous Lassi nearby"]
  },
  {
    id: 2,
    name: "Bapu Bazaar",
    category: "textiles",
    featured: true,
    image: "https://i.pinimg.com/736x/df/c8/6f/dfc86f8738627f52657b6ae68680343a.jpg",
    description: "A vibrant, pink-hued market known for its authenticity. Bapu Bazaar is the go-to destination for leather mojris, colorful bandhej suits, and traditional Rajasthani puppets.",
    speciality: "Textiles & Puppets",
    timings: "11:00 AM - 9:00 PM",
    bargain: "Moderate",
    rating: "4.8",
    tips: ["Best for wholesale Jaipuri quilts", "Perfect for street food lovers", "Very crowded on weekends"]
  },
  {
    id: 3,
    name: "Tripolia Bazaar",
    category: "handicrafts",
    featured: true,
    image: "https://d3gw4aml0lneeh.cloudfront.net/assets/locations/14716/oJQgbbb6Dtf6.jpg",
    description: "Famous for its stunning lac bangles and traditional brassware, Tripolia Bazaar offers a peek into the royal crafts of Rajasthan. Watch artisans make bangles live.",
    speciality: "Lac Bangles",
    timings: "10:00 AM - 7:00 PM",
    bargain: "Low",
    rating: "4.7",
    tips: ["Watch artisans make bangles live", "Closed on Sundays", "Great for home decor items"]
  },
  {
    id: 4,
    name: "Chandpole Bazaar",
    category: "handicrafts",
    featured: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa-n2VwhtW8Pen6CanPiVsppEkx29UbC4BmA&s",
    description: "Where creativity meets tradition. Chandpole is renowned for its exquisite marble sculptures and handicrafts. Find the finest stone carvers of the city.",
    speciality: "Marble Carvings",
    timings: "11:00 AM - 8:00 PM",
    bargain: "High",
    rating: "4.6",
    tips: ["Buy small marble artifacts as souvenirs", "Check Khazanewalon ka Rasta for jewelry", "Morning visits are peaceful"]
  },
  {
    id: 5,
    name: "Nehru Bazaar",
    category: "textiles",
    featured: false,
    image: "https://media1.thrillophilia.com/filestore/fqhf4bu1yqhqr3rkbmkrjoh7yq35_1568709132_market-2691177_1920.jpg",
    description: "A continuation of Bapu Bazaar's charm, Nehru Bazaar is famous for its collection of multi-colored juttis and traditional fabrics.",
    speciality: "Traditional Juttis & Garments",
    timings: "10:30 AM - 8:30 PM",
    bargain: "High",
    rating: "4.5",
    tips: ["Check for leather quality", "Good for souvenirs"]
  },
  {
    id: 6,
    name: "Kishanpole Bazaar",
    category: "handicrafts",
    featured: false,
    image: "https://i.pinimg.com/736x/75/34/c9/7534c9e9577751cd3112536dd546e992.jpg",
    description: "Known for its textile goods and wooden furniture, Kishanpole is a great place to find Bandhani and Leheriya textiles.",
    speciality: "Wooden Furniture & Bandhani",
    timings: "11:00 AM - 9:00 PM",
    bargain: "Moderate",
    rating: "4.4",
    tips: ["Look for hand-carved boxes", "Best for ethnic furniture"]
  },
  {
    id: 7,
    name: "Sireh Deori Bazaar",
    category: "handicrafts",
    featured: false,
    image: "https://s3.india.com/wp-content/uploads/2024/07/Sireh-Deori-Bazaar.jpg?impolicy=Medium_Widthonly&w=350&h=263",
    description: "Located right outside Hawa Mahal, this market is perfect for a quick shopping spree after visiting the monument.",
    speciality: "Camel Leather Shoes & Bags",
    timings: "10:00 AM - 10:00 PM",
    bargain: "Very High",
    rating: "4.5",
    tips: ["Avoid buying from first shops you see", "Perfect for photo ops"]
  },
  {
    id: 8,
    name: "MI Road",
    category: "jewellery",
    featured: false,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHb-VQN1uAhEAAmtvOk691DEqSJMaUFVvCkQ&s",
    description: "The upscale side of Jaipur's shopping. MI Road is lined with premium emporiums and high-end jewelry stores.",
    speciality: "Branded Jewelry & Blue Pottery",
    timings: "10:00 AM - 9:00 PM",
    bargain: "Fixed",
    rating: "4.8",
    tips: ["Visit Rajmandir Cinema nearby", "Known for authentic pottery stores"]
  },
  {
    id: 9,
    name: "The Gem Palace",
    category: "jewellery",
    featured: false,
    image: "https://d3gw4aml0lneeh.cloudfront.net/assets/locations/zvfIDwP04Oa6.jpg",
    description: "The most legendary jewelry store in Jaipur, serving royalty and celebrities for generations with antique and royal pieces.",
    speciality: "Antique & Royal Jewelry",
    timings: "10:30 AM - 7:00 PM",
    bargain: "Fixed",
    rating: "4.9",
    tips: ["A must-visit for vintage jewelry lovers", "Carries museum-quality pieces"]
  },
  {
    id: 10,
    name: "Kripal Kumbh",
    category: "handicrafts",
    featured: false,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPAqDjz29lbzZr4SAJWQlvR2vyuwlw7wwlsA&s",
    description: "The original home of Jaipur's famous Blue Pottery, started by the legendary Kripal Singh Shekhawat.",
    speciality: "Authentic Blue Pottery",
    timings: "10:00 AM - 6:00 PM",
    bargain: "Fixed",
    rating: "4.8",
    tips: ["Buy directly from the master's workshop", "Handle items with extreme care"]
  },
  {
    id: 11,
    name: "Anokhi",
    category: "textiles",
    featured: false,
    image: "https://i.pinimg.com/1200x/79/40/ae/7940ae5d92a97cca8031cf654b13a876.jpg",
    description: "The ultimate destination for premium block-printed textiles, garments, and home furnishings.",
    speciality: "Premium Hand Block Prints",
    timings: "10:00 AM - 8:00 PM",
    bargain: "Fixed",
    rating: "4.9",
    tips: ["Visit the Anokhi Cafe next door", "Great for organic cotton fabrics"]
  },
  {
    id: 12,
    name: "Purohit ji ka Katla",
    category: "textiles",
    featured: false,
    image: "https://i.pinimg.com/1200x/53/be/e4/53bee4de2d71e0bb84655976876bc44d.jpg",
    description: "A bustling wholesale market tucked away in narrow lanes, offering incredible deals on fabrics and wedding attire.",
    speciality: "Wedding Lehengas & Fabrics",
    timings: "11:00 AM - 8:00 PM",
    bargain: "High",
    rating: "4.6",
    tips: ["Perfect for bulk buying", "A maze of small shops, so explore thoroughly"]
  }
];

function Shopping() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 500) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 500) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAll = activeFilter === 'all' || !activeFilter;
  const filteredMarkets = isAll 
    ? MARKETS_DATA 
    : MARKETS_DATA.filter(m => m.category === activeFilter);

  const featuredBazaars = MARKETS_DATA.slice(0, 3);
  const gridMarkets = isAll ? MARKETS_DATA.slice(3) : filteredMarkets;

  const openModal = (market) => setSelectedMarket(market);
  const closeModal = () => setSelectedMarket(null);

  const renderCard = (market, minHeight = '300px') => (
    <div className="col-md-4 col-lg-3" key={market.id}>
      <div 
        className="bento-card hover-lift-card" 
        style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem', border: 'none', cursor: 'pointer', height: '100%', minHeight: minHeight }}
        onClick={() => openModal(market)}
      >
        <img src={market.image} alt={market.name} className="bento-img" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)', position: 'absolute', inset: 0, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.5rem', color: '#ffffff', zIndex: 2, pointerEvents: 'none', width: '100%' }}>
          <h5 style={{ fontWeight: 'bold', margin: 0, color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>{market.name}</h5>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem', color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>{market.speciality}</p>
          <p className="card-desc" style={{ color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
            {market.description ? market.description.substring(0, 100) + '...' : ''}
          </p>
        </div>
        <span className="rating-badge" style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 2, background: 'rgba(255,255,255,0.9)', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
          <i className="fa-solid fa-star" style={{ color: '#FFD700' }}></i> {market.rating}
        </span>
      </div>
    </div>
  );

  const renderBentoCard = (market, minHeight) => (
    <div 
      className="bento-card hover-lift-card" 
      style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem', border: 'none', cursor: 'pointer', height: '100%', minHeight: minHeight }}
      onClick={() => openModal(market)}
    >
      <img src={market.image} alt={market.name} className="bento-img" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)', position: 'absolute', inset: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '2rem', color: '#ffffff', zIndex: 2, pointerEvents: 'none', width: '100%' }}>
        <h3 style={{ fontWeight: 'bold', margin: 0, color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>{market.name}</h3>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '1rem', color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>{market.speciality}</p>
        <p className="card-desc" style={{ color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
          {market.description ? market.description.substring(0, 100) + '...' : ''}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          .bento-card .bento-img {
            transition: transform 0.5s ease;
          }
          .bento-card:hover .bento-img {
            transform: scale(1.05);
          }
          .card-desc {
            margin: 0.5rem 0 0 0;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
            transform: translateY(5px);
            font-size: 0.9rem;
          }
          .bento-card:hover .card-desc {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
        `}
      </style>
      <Carousel 
        title="Pink City Shopping" 
        subtitle="Discover ancient bazaars where every lane tells a story of craft and color." 
      />

      <div className="container" style={{ paddingTop: '20px' }}>
        
        {/* Interactive Filters (Spec Strip from Overhaul) */}
        <div className="spec-strip" style={{ marginTop: '20px' }}>
          {SHOPPING_CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              className={`spec-chip ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              <span className="spec-chip-icon">{cat.icon}</span>
              <span className="spec-chip-name">{cat.name}</span>
              <span className="spec-chip-sub">{cat.sub}</span>
            </div>
          ))}
        </div>

        {/* Featured Bento Grid */}
        {isAll && featuredBazaars.length >= 3 && (
          <div className="category-section">
            <div className="section-header">
              <div className="section-title">Must-Visit Featured Bazaars</div>
              <div className="decorative-divider">
                <span></span><i className="fa-solid fa-diamond"></i><span></span>
              </div>
              <div className="section-subtitle">
                <i>The most iconic shopping destinations in Jaipur.</i>
              </div>
            </div>

            <div className="featured-bento-enclosure mb-5" style={{ backgroundColor: '#fdf8f5', border: '1px solid #e0e0e0', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 6px 18px rgba(0,0,0,0.05)' }}>
              <div className="row g-4">
                <div className="col-lg-7">
                  {renderBentoCard(featuredBazaars[0], '380px')}
                </div>
                <div className="col-lg-5 d-flex flex-column gap-3">
                  <div className="flex-fill">
                    {renderBentoCard(featuredBazaars[1], '180px')}
                  </div>
                  <div className="flex-fill">
                    {renderBentoCard(featuredBazaars[2], '180px')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* General Attractions Grid */}
        <div className="category-section">
          <div className="section-header">
            <div className="section-title">Explore More Markets</div>
            <div className="decorative-divider">
              <span></span><i className="fa-solid fa-diamond"></i><span></span>
            </div>
            <div className="section-subtitle">
              <i>Discover local treasures and specialized bazaars.</i>
            </div>
          </div>
          <div className="row g-4">
            {gridMarkets.map(market => renderCard(market))}
          </div>
        </div>

        {/* Missing UI Sections Restored */}
        <div className="category-section" style={{ marginTop: '50px' }}>
          <div className="section-header">
            <div className="section-title">When to Visit?</div>
            <div className="decorative-divider">
              <span></span><i className="fa-regular fa-clock"></i><span></span>
            </div>
          </div>
          <div className="row g-4 mb-5 text-center">
            <div className="col-md-4">
              <div className="hover-lift-card p-4 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#FDF6E3', border: '1px solid #EBE3D5' }}>
                <div className="hover-scale-icon" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🌅</div>
                <h5 className="fw-bold" style={{ color: '#8B5A2B' }}>Morning Calm</h5>
                <p className="text-muted small mb-0">10:00 AM - 1:00 PM<br/>Best for jewelry & focused shopping before the crowds.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hover-lift-card p-4 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#FDF6E3', border: '1px solid #EBE3D5' }}>
                <div className="hover-scale-icon" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>☕</div>
                <h5 className="fw-bold" style={{ color: '#8B5A2B' }}>Lunch & Relax</h5>
                <p className="text-muted small mb-0">1:00 PM - 4:00 PM<br/>Very hot in summer. Great time for indoor emporiums.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hover-lift-card p-4 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#FDF6E3', border: '1px solid #EBE3D5' }}>
                <div className="hover-scale-icon" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>✨</div>
                <h5 className="fw-bold" style={{ color: '#8B5A2B' }}>Evening Magic</h5>
                <p className="text-muted small mb-0">5:00 PM - 9:00 PM<br/>Bustling atmosphere, street food, and vibrant lights.</p>
              </div>
            </div>
          </div>

          <div className="section-header" style={{ marginTop: '50px' }}>
            <div className="section-title">The Traveler's Shopping Guide</div>
            <div className="decorative-divider">
              <span></span><i className="fa-solid fa-map-location-dot"></i><span></span>
            </div>
          </div>
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="hover-lift-card d-flex align-items-start p-4 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#fff', border: '1px solid #eee' }}>
                <div className="hover-scale-icon me-3 mt-1" style={{ fontSize: '1.5rem', color: '#8B5A2B' }}><i className="fa-solid fa-comments"></i></div>
                <div>
                  <h6 className="fw-bold mb-1">The Art of Bargaining</h6>
                  <p className="text-muted small mb-0">In street markets like Bapu and Link Road, quoting 30-40% below the asking price is common. Always smile!</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hover-lift-card d-flex align-items-start p-4 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#fff', border: '1px solid #eee' }}>
                <div className="hover-scale-icon me-3 mt-1" style={{ fontSize: '1.5rem', color: '#8B5A2B' }}><i className="fa-solid fa-certificate"></i></div>
                <div>
                  <h6 className="fw-bold mb-1">Authenticity Check</h6>
                  <p className="text-muted small mb-0">For gems and antiques, ask for government-approved certificates. Johari Bazaar has certified testing labs.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hover-lift-card d-flex align-items-start p-4 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#fff', border: '1px solid #eee' }}>
                <div className="hover-scale-icon me-3 mt-1" style={{ fontSize: '1.5rem', color: '#8B5A2B' }}><i className="fa-solid fa-wallet"></i></div>
                <div>
                  <h6 className="fw-bold mb-1">Payment Methods</h6>
                  <p className="text-muted small mb-0">Most big shops take cards, but street vendors prefer cash or UPI. Keep small denominations handy.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hover-lift-card d-flex align-items-start p-4 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#fff', border: '1px solid #eee' }}>
                <div className="hover-scale-icon me-3 mt-1" style={{ fontSize: '1.5rem', color: '#8B5A2B' }}><i className="fa-solid fa-box-open"></i></div>
                <div>
                  <h6 className="fw-bold mb-1">Heavy Shipping</h6>
                  <p className="text-muted small mb-0">Buying marble or carpets? Reputed stores offer reliable international shipping. Ensure it's insured.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note for the Traveler */}
        <div className="section-header" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <div className="section-title">A Note for the Traveler</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div
            style={{
              background: 'radial-gradient(circle at center, #FDF6E3 0%, #ECE2C6 100%)',
              border: '1px solid #D4C3A3',
              borderRadius: '2px 12px 3px 15px',
              padding: '25px 35px',
              maxWidth: '550px',
              width: '100%',
              color: '#4A3B32',
              boxShadow: '2px 4px 10px rgba(0,0,0,0.1), inset 0 0 20px rgba(139, 69, 19, 0.05)',
              transform: 'rotate(-1deg)',
              position: 'relative'
            }}
          >
            {/* Vintage Tape Effect */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%) rotate(1deg)',
              width: '70px',
              height: '20px',
              background: 'rgba(255, 255, 255, 0.5)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}></div>

            {/* Faded Quill Icon */}
            <i className="fa-solid fa-feather-pointed" style={{ 
              color: '#8B5A2B', 
              fontSize: '2.5rem', 
              opacity: '0.1', 
              position: 'absolute', 
              right: '25px', 
              bottom: '25px', 
              transform: 'rotate(-15deg)',
              pointerEvents: 'none'
            }}></i>
            
            <p style={{ 
              margin: 0, 
              fontWeight: '600', 
              fontSize: '1.1rem', 
              lineHeight: '1.6', 
              fontFamily: '"Segoe Script", "Bradley Hand", "Lucida Handwriting", cursive', 
              color: '#3B2C24',
              letterSpacing: '0.2px'
            }}>
              Dear Traveler,<br/><br/>
              When exploring the vibrant lanes of Jaipur, remember that authenticity is key. Always request a certificate of authenticity for precious gemstones, and negotiate warmly with a smile in the bustling street markets. Enjoy the vibrant colors!<br/>
              <span style={{ display: 'block', textAlign: 'right', marginTop: '15px', fontSize: '1rem', color: '#5A473E' }}>
                Warmly,<br/>
                <strong style={{ fontSize: '1.1rem' }}>Jaipur Tourism</strong>
              </span>
            </p>
          </div>
        </div>

      </div>

      <button 
        className="back-to-top" 
        onClick={scrollTop} 
        style={{ display: showScroll ? 'flex' : 'none' }}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      {/* Modal for Market Details */}
      {selectedMarket && (
        <div className="attraction-modal-overlay" onClick={closeModal}>
          <div className="attraction-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="attraction-modal-close" onClick={closeModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="attraction-modal-left">
              <img src={selectedMarket.image} alt={selectedMarket.name} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
            <div className="attraction-modal-right">
              <h2>{selectedMarket.name}</h2>
              <div className="modal-rating">
                <i className="fa-solid fa-star"></i> {selectedMarket.rating}
              </div>
              <p className="modal-desc">{selectedMarket.description}</p>
              
              <div className="modal-details">
                <div className="modal-detail-item">
                  <div className="detail-icon"><i className="fa-solid fa-tag"></i></div>
                  <div className="detail-text">
                    <strong>Bargain Level</strong>
                    <span>{selectedMarket.bargain}</span>
                  </div>
                </div>
                <div className="modal-detail-item">
                  <div className="detail-icon"><i className="fa-regular fa-clock"></i></div>
                  <div className="detail-text">
                    <strong>Timings</strong>
                    <span>{selectedMarket.timings}</span>
                  </div>
                </div>
                <div className="modal-detail-item">
                  <div className="detail-icon"><i className="fa-solid fa-gem"></i></div>
                  <div className="detail-text">
                    <strong>Speciality</strong>
                    <span>{selectedMarket.speciality}</span>
                  </div>
                </div>
              </div>

              <div className="modal-reviews">
                <h3>What people say</h3>
                {[
                  { name: ['Freny', 'Nayan', 'Bikash', 'Paras', 'Prabal'][selectedMarket.id % 5], text: 'Amazing shopping experience! Found some great pieces.', color: '#A1673F' },
                  { name: ['Freny', 'Nayan', 'Bikash', 'Paras', 'Prabal'][(selectedMarket.id + 2) % 5], text: 'Make sure to bargain well, but the collection is fantastic!', color: '#D9B27C' }
                ].map((review, i) => (
                  <div className="review-item" key={i}>
                    <div className="review-avatar" style={{background: review.color}}>{review.name.charAt(0)}</div>
                    <div className="review-text">
                      <strong>{review.name}</strong>
                      <span>{review.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Shopping;
