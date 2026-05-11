import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Carousel from '../Carousel';
import './Attractions.css';

const attractionsData = [
  // Forts & Palaces
  { id: 1, title: 'Amber Fort', desc: 'A majestic hilltop fort offering light & sound shows and stunning views.', image: '/packages/amber_fort.png', category: 'Forts & Palaces', rating: '4.8', duration: '2-3 Hours', fee: '₹500 (Foreign) / ₹100 (Indian)' },
  { id: 2, title: 'City Palace', desc: 'A royal residence complex with courtyards, museums, and beautiful gateways.', image: '/packages/city_palace.png', category: 'Forts & Palaces', rating: '4.7', duration: '2-3 Hours', fee: '₹700 (Foreign) / ₹300 (Indian)' },
  { id: 3, title: 'Hawa Mahal', desc: 'The "Palace of Winds" with 953 windows, built for royal ladies.', image: '/packages/hawa_mahal.png', category: 'Forts & Palaces', rating: '4.6', duration: '1-2 Hours', fee: '₹200 (Foreign) / ₹50 (Indian)' },
  { id: 4, title: 'Jaigarh Fort', desc: 'Known as the Fort of Victory, it houses the world\'s largest cannon on wheels.', image: '/packages/jaigarh fort.jpg', category: 'Forts & Palaces', rating: '4.5', duration: '1-2 Hours', fee: '₹85 (Foreign) / ₹35 (Indian)' },
  { id: 5, title: 'Jal Mahal', desc: 'The beautiful water palace situated in the middle of Man Sagar Lake.', image: '/packages/jal_mahal.png', category: 'Forts & Palaces', rating: '4.6', duration: '1 Hour', fee: 'Free (View from outside)' },
  { id: 6, title: 'Nahargarh Fort', desc: 'Experience Nahargarh fort overlooking the glittering city of Jaipur.', image: '/packages/nahagarh fort.jpg', category: 'Forts & Palaces', rating: '4.7', duration: '2-3 Hours', fee: '₹200 (Foreign) / ₹50 (Indian)' },
  { id: 8, title: 'Samode Haveli', desc: 'A traditional Indian mansion showcasing elegant fresco paintings and heritage.', image: '/packages/samode haveli.jpg', category: 'Forts & Palaces', rating: '4.5', duration: '1-2 Hours', fee: 'Varies' },
  { id: 9, title: 'Samode Palace', desc: 'A grand heritage palace offering luxury and an insight into Rajput grandeur.', image: '/packages/samode palace.jpg', category: 'Forts & Palaces', rating: '4.6', duration: '2 Hours', fee: 'Varies' },

  // Gates
  { id: 7, title: 'Patrika Gate', desc: 'A vibrant, hand-painted architectural marvel serving as an entrance.', image: '/packages/patrika gate.jpg', category: 'Gates', rating: '4.8', duration: '1 Hour', fee: 'Free' },
  { id: 10, title: 'Tripolia Gate', desc: 'The historic three-arched gate leading to the City Palace.', image: '/packages/tripola gate.jpg', category: 'Gates', rating: '4.4', duration: '30 Mins', fee: 'Free' },
  { id: 11, title: 'New Gate', desc: 'A prominent gateway adding to the majestic aura of the walled city.', image: '/packages/new gate.jpg', category: 'Gates', rating: '4.3', duration: '30 Mins', fee: 'Free' },
  { id: 42, title: 'Ajmeri Gate', desc: 'A busy and historically significant gate of the walled city of Jaipur.', image: '/packages/ajmeri gate.jpg', category: 'Gates', rating: '4.4', duration: '30 Mins', fee: 'Free' },
  { id: 43, title: 'Sanganeri Gate', desc: 'A beautiful historical gateway leading to the famous Johari Bazaar.', image: '/packages/sanganeri gate.jpg', category: 'Gates', rating: '4.5', duration: '30 Mins', fee: 'Free' },
  { id: 44, title: 'Chandpole Gate', desc: 'An imposing gateway adorned with majestic architectural details.', image: '/packages/chandpole gate.jpg', category: 'Gates', rating: '4.3', duration: '30 Mins', fee: 'Free' },
  { id: 45, title: 'Zorawar Singh Gate', desc: 'The northern gate of the walled city, originally built for defense.', image: '/packages/zorwar singh gate.jpg', category: 'Gates', rating: '4.4', duration: '30 Mins', fee: 'Free' },
  { id: 46, title: 'Surajpol Gate', desc: 'The sun gate, facing east towards the rising sun in the walled city.', image: '/packages/surajpol gate.jpg', category: 'Gates', rating: '4.5', duration: '30 Mins', fee: 'Free' },
  { id: 47, title: 'Kishanpole Gate', desc: 'A vibrant and bustling entry gate to the historic walled pink city.', image: '/packages/kishanpole gate.jpg', category: 'Gates', rating: '4.3', duration: '30 Mins', fee: 'Free' },
  { id: 48, title: 'Ghat Gate', desc: 'The southeastern gate, steeped in the rich history of old Jaipur.', image: '/packages/ghat gate.jpg', category: 'Gates', rating: '4.2', duration: '30 Mins', fee: 'Free' },

  // Temples
  { id: 14, title: 'Akshardham Temple', desc: 'A stunning temple known for its brilliant architecture and spiritual ambiance.', image: '/packages/akshardham temple.jpg', category: 'Temples', rating: '4.7', duration: '1-2 Hours', fee: 'Free' },
  { id: 15, title: 'Digamber Jain Mandir', desc: 'An ancient Jain temple of immense spiritual significance.', image: '/packages/digamber jain mandir.jpg', category: 'Temples', rating: '4.6', duration: '1 Hour', fee: 'Free' },
  { id: 16, title: 'Galtaji Temple', desc: 'An ancient Hindu pilgrimage site known for its natural water springs.', image: '/packages/galtaji temple.jpg', category: 'Temples', rating: '4.5', duration: '2 Hours', fee: 'Free' },
  { id: 17, title: 'Govind Dev Ji Temple', desc: 'One of the most sacred and famous temples dedicated to Lord Krishna.', image: '/packages/govind dev ji temple.jpg', category: 'Temples', rating: '4.8', duration: '1 Hour', fee: 'Free' },
  { id: 18, title: 'ISKCON Temple', desc: 'A beautiful temple dedicated to Lord Krishna offering a peaceful environment.', image: '/packages/iskcon temple.jpg', category: 'Temples', rating: '4.7', duration: '1-2 Hours', fee: 'Free' },
  { id: 19, title: 'Khole Ke Hanuman Ji Temple', desc: 'A highly revered temple of Lord Hanuman situated on a hillock.', image: '/packages/khole ke hanuman ji temple.jpg', category: 'Temples', rating: '4.6', duration: '1 Hour', fee: 'Free' },
  { id: 20, title: 'Moti Dungri Ganesh Temple', desc: 'A popular Ganesh temple frequented by locals and tourists alike.', image: '/packages/moti dungri ganesh temple.jpg', category: 'Temples', rating: '4.7', duration: '1 Hour', fee: 'Free' },
  { id: 21, title: 'Shila Devi Temple', desc: 'A famous temple inside Amber Fort dedicated to Goddess Durga.', image: '/packages/shila dev temple.jpg', category: 'Temples', rating: '4.6', duration: '1 Hour', fee: 'Free' },
  { id: 22, title: 'Tarkeshwar Mahadev Temple', desc: 'An ancient and highly revered Shiva temple in the city.', image: '/packages/tarkeshwar mahadev temple.jpg', category: 'Temples', rating: '4.7', duration: '1 Hour', fee: 'Free' },

  // Gardens
  { id: 23, title: 'Central Park', desc: 'The largest park in Jaipur featuring a lush green landscape and a polo ground.', image: '/packages/central park.jpg', category: 'Gardens', rating: '4.6', duration: '1-2 Hours', fee: 'Free' },
  { id: 24, title: 'Kanak Ghati', desc: 'A serene valley offering beautiful gardens and scenic views.', image: '/packages/kanak ghati.jpg', category: 'Gardens', rating: '4.5', duration: '1-2 Hours', fee: 'Free' },
  { id: 25, title: 'Kanak Vrindavan Garden', desc: 'A picturesque garden nestled in the valley of Nahargarh hills.', image: '/packages/kanak vrindavan garden.jpg', category: 'Gardens', rating: '4.5', duration: '1-2 Hours', fee: 'Free' },
  { id: 26, title: 'Ram Niwas Garden', desc: 'A historical garden built by Maharaja Ram Singh, housing the Albert Hall Museum.', image: '/packages/ram nivas garden.jpg', category: 'Gardens', rating: '4.4', duration: '1-2 Hours', fee: 'Free' },
  { id: 27, title: 'Sisodia Rani Garden and Palace', desc: 'Beautifully landscaped multi-tiered gardens featuring fountains and pavilions.', image: '/packages/sisodiya rani garden and palace.jpg', category: 'Gardens', rating: '4.3', duration: '1 Hour', fee: '₹200 (Foreign) / ₹50 (Indian)' },
  { id: 28, title: 'Smriti Van Biodiversity Park', desc: 'A tranquil forest area perfect for nature walks and bird watching.', image: '/packages/smriti van biodiversity park.jpg', category: 'Gardens', rating: '4.6', duration: '2 Hours', fee: 'Free' },
  { id: 29, title: 'Vidyadhar Garden', desc: 'A beautiful garden dedicated to the chief architect of Jaipur, Vidyadhar Bhattacharya.', image: '/packages/vidhyadar garden.jpg', category: 'Gardens', rating: '4.4', duration: '1 Hour', fee: 'Free' },

  // Science & Heritage
  { id: 30, title: 'Jantar Mantar', desc: 'An astronomical observatory featuring the world\'s largest stone sundial.', image: '/packages/jantar_mantar.png', category: 'Science & Heritage', rating: '4.5', duration: '1-2 Hours', fee: '₹200 (Foreign) / ₹50 (Indian)' },
  { id: 31, title: 'Jawahar Kala Kendra', desc: 'A multi-arts center dedicated to preserving Rajasthani arts and crafts.', image: '/packages/jawahar kala kendra.jpg', category: 'Science & Heritage', rating: '4.6', duration: '2 Hours', fee: 'Free' },
  { id: 32, title: 'Gaitore Ki Chhatriyan', desc: 'The royal crematorium featuring beautifully carved marble cenotaphs.', image: '/packages/gaitore ki chhatriyan.jpg', category: 'Science & Heritage', rating: '4.5', duration: '1 Hour', fee: '₹30' },
  { id: 33, title: 'Maota Lake', desc: 'A serene lake situated at the base of the Amber Fort.', image: '/packages/maota lake.jpg', category: 'Science & Heritage', rating: '4.7', duration: '1 Hour', fee: 'Free' },
  { id: 34, title: 'Pushkar', desc: 'A spiritual trip to the holy Pushkar lake surrounded by traditional temples.', image: '/packages/pushkar.png', category: 'Science & Heritage', rating: '4.8', duration: 'Half Day', fee: 'Free' },
  { id: 13, title: 'Isarlat Sargasuli', desc: 'A historic tower offering panoramic views of the pink city.', image: '/packages/isarlat sargasuli.jpg', category: 'Science & Heritage', rating: '4.4', duration: '1 Hour', fee: '₹70' },
  { id: 12, title: 'Panna Meena ka Kund', desc: 'A historic stepwell famous for its symmetrical staircases and architecture.', image: '/packages/panna meena ka kund.jpg', category: 'Science & Heritage', rating: '4.6', duration: '1 Hour', fee: 'Free' },

  // Museums
  { id: 35, title: 'Albert Hall Museum', desc: 'Houses an impressive collection of paintings, carpets, and sculptures.', image: '/packages/albert_hall.png', category: 'Museums', rating: '4.6', duration: '1.5-2 Hours', fee: '₹300 (Foreign) / ₹40 (Indian)' },
  { id: 36, title: 'Amrapali Museum', desc: 'A mesmerizing collection of traditional Indian jewelry and artifacts.', image: '/packages/amrapali museum.jpg', category: 'Museums', rating: '4.7', duration: '1-2 Hours', fee: '₹600' },
  { id: 37, title: 'Anokhi Museum of Hand Printing', desc: 'A museum dedicated to the traditional art of block printing.', image: '/packages/anoki museum of hand printing.jpg', category: 'Museums', rating: '4.6', duration: '1 Hour', fee: '₹80' },
  { id: 38, title: 'Dolls Museum', desc: 'Showcasing a vast collection of dolls from various countries and cultures.', image: '/packages/dolls museum.jpg', category: 'Museums', rating: '4.2', duration: '1 Hour', fee: '₹10' },
  { id: 39, title: 'Gem and Jewellery Museum', desc: 'Displays the rich heritage of gem cutting and jewelry making in Jaipur.', image: '/packages/gem and jwellery museum.jpg', category: 'Museums', rating: '4.5', duration: '1 Hour', fee: '₹100' },
  { id: 40, title: 'Museum of Legacies', desc: 'A museum showcasing Rajasthan’s diverse cultural heritage and art.', image: '/packages/museum of legacies.jpg', category: 'Museums', rating: '4.5', duration: '1 Hour', fee: '₹100' },
  { id: 41, title: 'Wax Museum', desc: 'A popular museum featuring lifelike wax statues of celebrities and historic figures.', image: '/packages/wax museum.jpg', category: 'Museums', rating: '4.3', duration: '1-2 Hours', fee: '₹500' }
];

const categorySubtitles = {
  'Forts & Palaces': 'Discover the royal heritage and majestic strongholds of the Pink City.',
  'Gates': 'Walk through the majestic historical entryways of the walled city.',
  'Science & Heritage': 'Marvel at architectural precision and ancient wisdom.',
  'Gardens': 'Relax in serene, beautifully landscaped royal retreats.',
  'Temples': 'Experience spiritual tranquility and architectural beauty.',
  'Museums': 'Uncover the rich history, art, and culture of Rajasthan.'
};

function Attractions() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showScroll, setShowScroll] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const location = useLocation();

  const filters = ['All', 'Forts & Palaces', 'Gates', 'Science & Heritage', 'Gardens', 'Temples', 'Museums'];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const y = element.getBoundingClientRect().top + window.pageYOffset - 120; // 120px offset for sticky navbar
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

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

  const handleSidebarClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const renderSectionHeader = (category) => (
    <div className="section-header">
      <div className="section-title">{category}</div>
      <div className="decorative-divider">
        <span></span><i className="fa-solid fa-diamond"></i><span></span>
      </div>
      <div className="section-subtitle">
        <i>{categorySubtitles[category]}</i>
      </div>
    </div>
  );

  const renderCard = (attr) => (
    <div className="attraction-card" key={attr.id}>
      <div className="attraction-img-wrapper">
        <img src={attr.image} alt={attr.title} />
        <span className="rating-badge">
          <i className="fa-solid fa-star"></i> {attr.rating}
        </span>
      </div>
      <div className="card-content">
        <div className="card-title">{attr.title}</div>
        <div className="card-desc">{attr.desc}</div>
        <div className="card-meta">
          <div className="meta-item"><i className="fa-regular fa-clock"></i> {attr.duration}</div>
          <div className="meta-item"><i className="fa-solid fa-indian-rupee-sign"></i> {attr.fee}</div>
        </div>
        <button className="explore-btn" onClick={() => setSelectedAttraction(attr)}>Explore <i className="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  );

  const visibleCategories = filters.filter(f => f !== 'All');

  return (
    <>
      <Carousel 
        title="Top Attractions in Jaipur" 
        subtitle="Explore forts, palaces, and heritage sites that define the Pink City." 
      />

      <div className="attractions-page-container container">
        <aside className="attractions-sidebar">
          <div className="sidebar-sticky-content">
            <h4 className="sidebar-title">Quick Navigation</h4>
            <div className="sidebar-divider"></div>
            <ul className="sidebar-links">
              {filters.filter(f => f !== 'All').map(category => {
                const categoryId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                return (
                  <li key={category}>
                    <a 
                      href={`#${categoryId}`} 
                      onClick={(e) => handleSidebarClick(e, categoryId)}
                    >
                      <i className="fa-solid fa-location-dot"></i> {category}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="attractions-main-content">


          {visibleCategories.map(category => {
            const categoryAttractions = attractionsData.filter(attr => attr.category === category);
            if (categoryAttractions.length === 0) return null;
            
            const categoryId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            return (
              <div key={category} id={categoryId} className="category-section">
                {renderSectionHeader(category)}
                <div className="attractions-grid">
                  {categoryAttractions.map(renderCard)}
                </div>
              </div>
            );
          })}

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
                Dear Explorer,<br/><br/>
                Carry water for the desert sun, wear comfortable shoes, and book tickets online to skip the lines. Most heritage sites welcome you from dawn till dusk.<br/>
                <span style={{ display: 'block', textAlign: 'right', marginTop: '15px', fontSize: '1rem', color: '#5A473E' }}>
                  Warmly,<br/>
                  <strong style={{ fontSize: '1.1rem' }}>Jaipur Tourism</strong>
                </span>
              </p>
            </div>
          </div>
        </main>
      </div>

      <button 
        className="back-to-top" 
        onClick={scrollTop} 
        style={{ display: showScroll ? 'flex' : 'none' }}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      {/* Booking/Explore Modal */}
      {selectedAttraction && (
        <div className="modal-overlay" onClick={() => setSelectedAttraction(null)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedAttraction(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="modal-body">
              <div className="modal-img">
                <img src={selectedAttraction.image} alt={selectedAttraction.title} />
              </div>
              <div className="modal-info">
                <h2>{selectedAttraction.title}</h2>
                <span className="modal-category">{selectedAttraction.category}</span>
                <p className="modal-desc">{selectedAttraction.desc}</p>
                <div className="modal-stats">
                  <div className="stat-item">
                    <i className="fa-solid fa-star"></i>
                    <span>{selectedAttraction.rating} Rating</span>
                  </div>
                  <div className="stat-item">
                    <i className="fa-regular fa-clock"></i>
                    <span>{selectedAttraction.duration}</span>
                  </div>
                  <div className="stat-item">
                    <i className="fa-solid fa-ticket"></i>
                    <span>{selectedAttraction.fee}</span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="book-now-btn">Book Tickets Now</button>
                  <Link to="/explorer" className="view-map-btn">View on Map</Link>
                </div>

                <div className="modal-reviews">
                  <h3>Visitor Reviews</h3>
                  {[
                    { id: 1, user: "Ananya Sharma", rating: 5, comment: "Absolutely breathtaking! The architecture is stunning and the guide was very knowledgeable." },
                    { id: 2, user: "James Wilson", rating: 4, comment: "A must-visit in Jaipur. It gets a bit crowded, so try to reach early." },
                    { id: 3, user: "Rajesh Gupta", rating: 5, comment: "The light and sound show in the evening is magical. Don't miss it!" }
                  ].map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <strong>{review.user}</strong>
                        <span className="review-rating">
                          {[...Array(review.rating)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                        </span>
                      </div>
                      <p className="review-comment">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Attractions;
