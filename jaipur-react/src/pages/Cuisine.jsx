import { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel';
import './Cuisine.css';

const cuisineData = [
  { id: 1, title: 'Rajasthani Thali', desc: 'A royal platter of dal-baati-churma, gatte ki sabzi, kadhi, roti, rice, and sweets.', image: 'https://i.redd.it/e9yo0utefpo61.jpg', category: 'Main Course', spiceLevel: 'Medium', diet: 'Veg', isMustTry: true, whereToEat: 'LMB Hotel, Chokhi Dhani, Thali House', ingredients: 'Dal, Wheat, Gram Flour, Yogurt, Ghee, Jaggery', bestTime: 'Lunch or Dinner' },
  { id: 2, title: 'Ghewar', desc: 'Honeycomb-like sweet cake, especially popular during Teej and monsoon season.', image: 'https://www.olddelhifoods.com/wp-content/uploads/2024/08/Paneer-Ghewar.jpg', category: 'Sweets', spiceLevel: 'Mild', diet: 'Veg', isMustTry: true, whereToEat: 'LMB Hotel, Rawat Mishthan Bhandar, BMB', ingredients: 'Flour, Ghee, Milk, Sugar Syrup, Saffron, Nuts', bestTime: 'After meals or festivals (Monsoon)' },
  { id: 3, title: 'Pyaz Kachori', desc: 'Crispy pastry stuffed with spicy onion filling – a favourite Jaipur breakfast snack.', image: 'https://www.sweedesi.com/cdn/shop/products/pyaz-kachori-rawat-rawat-mishthan-bhandar-368768.jpg?v=1740033789', category: 'Snacks', spiceLevel: 'Medium', diet: 'Veg', isMustTry: true, whereToEat: 'Rawat Mishthan Bhandar, Sodhani Sweets', ingredients: 'Flour, Onions, Potatoes, Coriander Seeds, Spices', bestTime: 'Breakfast or Evening Tea' },
  { id: 4, title: 'Laal Maas', desc: 'Fiery red mutton curry slow-cooked with Mathania chillies and traditional spices.', image: 'https://aromaticessence.co/wp-content/uploads/2016/03/image60-768x1365.jpeg', category: 'Main Course', spiceLevel: 'Hot', diet: 'Non-Veg', isMustTry: true, whereToEat: 'Handi Restaurant, Spice Court, Niros', ingredients: 'Mutton, Mathania Red Chillies, Garlic, Ghee, Yogurt', bestTime: 'Dinner' },
  { id: 5, title: 'Mirchi Bada', desc: 'Large green chillies stuffed with spicy potato filling and deep-fried.', image: '/packages/food/mirchi bada.jpg', category: 'Street Food', spiceLevel: 'Hot', diet: 'Veg', isMustTry: false, whereToEat: 'Sodhani Sweets, Street Stalls in Johari Bazaar', ingredients: 'Large Green Chillies, Potatoes, Gram Flour, Spices', bestTime: 'Evening Snack with Chai' },
  { id: 6, title: 'Mawa Kachori', desc: 'A sweet version of kachori stuffed with mawa (khoya) and dipped in sugar syrup.', image: '/packages/food/mawa kachori.jpg', category: 'Sweets', spiceLevel: 'Mild', diet: 'Veg', isMustTry: false, whereToEat: 'Rawat Mishthan Bhandar, Kanha', ingredients: 'Flour, Khoya (Mawa), Dry Fruits, Sugar Syrup', bestTime: 'Dessert' },
  { id: 7, title: 'Kulhad Lassi', desc: 'Rich, creamy yogurt drink served in traditional earthen kulhads.', image: '/packages/food/kulhad laasi.jpg', category: 'Beverages', spiceLevel: 'Mild', diet: 'Veg', isMustTry: true, whereToEat: 'Lassiwala (MI Road)', ingredients: 'Fresh Yogurt, Sugar, Malai, Ice', bestTime: 'Morning or Afternoon' },
  { id: 8, title: 'Aloo Tikki', desc: 'Crispy potato patties served with sweet and spicy chutneys and yogurt.', image: '/packages/food/aloo tikki.jpg', category: 'Street Food', spiceLevel: 'Medium', diet: 'Veg', isMustTry: false, whereToEat: 'Masala Chowk, Bapu Bazaar Streets', ingredients: 'Potatoes, Peas, Tamarind Chutney, Mint Chutney, Yogurt', bestTime: 'Evening' },
  { id: 9, title: 'Bajre Ki Roti', desc: 'Healthy and wholesome pearl millet flatbread, best enjoyed with garlic chutney.', image: '/packages/food/bajre ki roti.jpg', category: 'Main Course', spiceLevel: 'Mild', diet: 'Veg', isMustTry: false, whereToEat: 'Chokhi Dhani, Traditional Dhabas', ingredients: 'Pearl Millet Flour, Warm Water, Ghee', bestTime: 'Dinner (Winter)' },
  { id: 10, title: 'Bread Pakora', desc: 'Deep-fried bread slices stuffed with spiced mashed potatoes.', image: '/packages/food/bread pakora.jpg', category: 'Street Food', spiceLevel: 'Medium', diet: 'Veg', isMustTry: false, whereToEat: 'Samrat, Tapri Central', ingredients: 'Bread, Gram Flour, Potatoes, Spices', bestTime: 'Breakfast or Evening Tea' },
  { id: 11, title: 'Dahi Puri', desc: 'Crispy hollow shells filled with potatoes, chutneys, and sweet yogurt.', image: '/packages/food/dahi puri.jpg', category: 'Street Food', spiceLevel: 'Mild', diet: 'Veg', isMustTry: false, whereToEat: 'Nand Chaat Bhandar, Raja Park', ingredients: 'Puris, Potatoes, Sweet Yogurt, Tamarind Chutney, Sev', bestTime: 'Evening Snack' },
  { id: 12, title: 'Dal Baati Churma', desc: 'The iconic trio of spicy lentils, baked wheat balls, and sweet crumbled cereal.', image: '/packages/food/dal baati churma.jpg', category: 'Main Course', spiceLevel: 'Medium', diet: 'Veg', isMustTry: true, whereToEat: 'Chokhi Dhani, Santosh Bhojanalaya', ingredients: 'Wheat Flour, Ghee, Mixed Lentils, Spices, Jaggery/Sugar', bestTime: 'Lunch' },
  { id: 13, title: 'Feeni', desc: 'A traditional flaky, thread-like sweet deep-fried in ghee.', image: '/packages/food/feeni.jpg', category: 'Sweets', spiceLevel: 'Mild', diet: 'Veg', isMustTry: false, whereToEat: 'LMB Hotel, Bhagat Misthan Bhandar', ingredients: 'Flour, Ghee, Sugar Syrup, Saffron', bestTime: 'Festivals (Makar Sankranti)' },
  { id: 14, title: 'Gatte Ki Sabzi', desc: 'Gram flour dumplings cooked in a spicy, tangy yogurt-based curry.', image: '/packages/food/gatte ki saabzi.jpg', category: 'Main Course', spiceLevel: 'Medium', diet: 'Veg', isMustTry: true, whereToEat: 'Thali House, Handi, Natraj', ingredients: 'Gram Flour, Yogurt, Coriander, Mustard Seeds, Spices', bestTime: 'Lunch or Dinner' },
  { id: 15, title: 'Jalebi', desc: 'Deep-fried wheat flour batter soaked in saffron sugar syrup.', image: '/packages/food/jalebi.jpg', category: 'Sweets', spiceLevel: 'Mild', diet: 'Veg', isMustTry: false, whereToEat: 'Saras Parlour, Samrat', ingredients: 'All-Purpose Flour, Yogurt, Sugar, Saffron, Ghee', bestTime: 'Breakfast (with milk/rabri)' },
  { id: 16, title: 'Jaljeera', desc: 'A refreshing and tangy cumin-flavored beverage to beat the heat.', image: '/packages/food/jaljeera.jpg', category: 'Beverages', spiceLevel: 'Medium', diet: 'Veg', isMustTry: false, whereToEat: 'Street Vendors, Masala Chowk', ingredients: 'Cumin, Mint, Tamarind, Black Salt, Water', bestTime: 'Summer Afternoons' },
  { id: 17, title: 'Kachori', desc: 'Flaky, deep-fried pastry stuffed with a spiced lentil mixture.', image: '/packages/food/kachori.jpg', category: 'Snacks', spiceLevel: 'Medium', diet: 'Veg', isMustTry: false, whereToEat: 'Rawat Mishthan Bhandar, Sampat Namkeen', ingredients: 'Flour, Moong Dal/Urad Dal, Fennel, Spices', bestTime: 'Breakfast or Evening Snack' },
  { id: 18, title: 'Ker Sangri', desc: 'A traditional desert vegetable curry made with dried berries and beans.', image: '/packages/food/ker sangri.jpg', category: 'Main Course', spiceLevel: 'Medium', diet: 'Veg', isMustTry: true, whereToEat: '1135 AD, Suvarna Mahal, Chokhi Dhani', ingredients: 'Ker (berries), Sangri (beans), Dry Red Chillies, Spices', bestTime: 'Lunch or Dinner' },
  { id: 19, title: 'Malpua', desc: 'Indian pancakes fried in ghee and dunked in sugar syrup.', image: '/packages/food/malpua.jpg', category: 'Sweets', spiceLevel: 'Mild', diet: 'Veg', isMustTry: false, whereToEat: 'Mahaveer Rabri Bhandar', ingredients: 'Flour, Milk, Fennel Seeds, Sugar Syrup, Ghee', bestTime: 'Dessert' },
  { id: 20, title: 'Missi Roti', desc: 'Flavorful flatbread made with whole wheat flour, gram flour, and spices.', image: '/packages/food/missi roti.jpg', category: 'Main Course', spiceLevel: 'Medium', diet: 'Veg', isMustTry: false, whereToEat: 'Traditional Dhabas, LMB', ingredients: 'Whole Wheat Flour, Gram Flour, Kasuri Methi, Spices', bestTime: 'Lunch or Dinner' },
  { id: 21, title: 'Mohan Maas', desc: 'A creamy, rich meat delicacy cooked with milk, mild spices, and dry fruits.', image: '/packages/food/mohan maas.jpg', category: 'Main Course', spiceLevel: 'Medium', diet: 'Non-Veg', isMustTry: false, whereToEat: 'Suvarna Mahal (Rambagh Palace)', ingredients: 'Meat, Milk, Cream, Cashews, Cardamom', bestTime: 'Dinner' },
  { id: 22, title: 'Pani Puri', desc: 'Crispy puris filled with spicy, tangy mint water and tamarind chutney.', image: '/packages/food/pani puri.jpg', category: 'Street Food', spiceLevel: 'Hot', diet: 'Veg', isMustTry: true, whereToEat: 'Nand Chaat Bhandar, Raja Park', ingredients: 'Semolina/Flour Puris, Mint Water, Tamarind Chutney, Chickpeas', bestTime: 'Evening Snack' },
  { id: 23, title: 'Papad Ki Sabzi', desc: 'A quick and delicious Rajasthani curry made with roasted papad and yogurt.', image: '/packages/food/papad ki saabzi.jpg', category: 'Main Course', spiceLevel: 'Medium', diet: 'Veg', isMustTry: false, whereToEat: 'Local Dhabas, Thali Restaurants', ingredients: 'Papad, Yogurt, Turmeric, Cumin, Spices', bestTime: 'Lunch or Dinner' },
  { id: 24, title: 'Rabri', desc: 'Thickened, sweetened milk layered with malai and garnished with nuts.', image: '/packages/food/rabri.jpg', category: 'Sweets', spiceLevel: 'Mild', diet: 'Veg', isMustTry: false, whereToEat: 'Mahaveer Rabri Bhandar', ingredients: 'Milk, Sugar, Cardamom, Almonds, Pistachios', bestTime: 'Dessert' },
  { id: 25, title: 'Safed Maas', desc: 'A subtle, white meat curry prepared with almonds, cashew nuts, and yogurt.', image: '/packages/food/safed maas.jpg', category: 'Main Course', spiceLevel: 'Mild', diet: 'Non-Veg', isMustTry: true, whereToEat: '1135 AD, Handi', ingredients: 'Mutton/Chicken, Yogurt, Cashews, Almonds, White Pepper', bestTime: 'Dinner' },
  { id: 26, title: 'Samosa', desc: 'A triangular fried pastry with a savory spiced potato filling.', image: '/packages/food/samosa.jpg', category: 'Snacks', spiceLevel: 'Medium', diet: 'Veg', isMustTry: false, whereToEat: 'Samrat, Thaggu Ke Samose', ingredients: 'Flour, Potatoes, Peas, Coriander, Spices', bestTime: 'Evening Snack with Chai' },
  { id: 27, title: 'Thandai', desc: 'A chilled milk beverage flavored with almonds, fennel seeds, and saffron.', image: '/packages/food/thandai.jpg', category: 'Beverages', spiceLevel: 'Mild', diet: 'Veg', isMustTry: false, whereToEat: 'Pandit Kulfi, Local Sweets Shops', ingredients: 'Milk, Almonds, Fennel, Rose Petals, Saffron, Sugar', bestTime: 'Summer (Holi festival)' }
];

const categorySubtitles = {
  'Snacks': 'Perfect bites to start your day or enjoy with evening tea.',
  'Sweets': 'Indulge in the rich, sugar-soaked heritage of Rajasthan.',
  'Main Course': 'Hearty, robust flavors that define royal Rajput dining.',
  'Street Food': 'Spicy, tangy treats from the bustling bazaars of Jaipur.',
  'Beverages': 'Refreshing traditional drinks to beat the desert heat.'
};

function Cuisine() {
  const [selectedFood, setSelectedFood] = useState(null);

  const filters = ['Snacks', 'Sweets', 'Main Course', 'Street Food', 'Beverages'];

  const handleSidebarClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const renderSectionHeader = (category) => {
    const categoryId = category.toLowerCase().replace(/ /g, '-');
    return (
      <div key={category} id={categoryId} className="section-header" style={{ marginTop: '40px' }}>
        <div className="section-title">{category}</div>
        <div className="decorative-divider">
          <span></span><i className="fa-solid fa-diamond"></i><span></span>
        </div>
        <div className="section-subtitle">
          <i>{categorySubtitles[category] || 'Explore delicious local flavors.'}</i>
        </div>
      </div>
    );
  };

  const renderCard = (dish) => {
    return (
      <div className="cuisine-card" key={dish.id} onClick={() => setSelectedFood(dish)} style={{ cursor: 'pointer' }}>
        {dish.isMustTry && <div className="must-try-ribbon"><span>Must Try</span></div>}
        <div className="cuisine-img-wrapper">
          <img src={dish.image} alt={dish.title} />
          <div className={`diet-badge ${dish.diet === 'Veg' ? 'veg' : 'non-veg'}`} title={dish.diet}>
            <div className="dot"></div>
          </div>
          <div className={`spice-badge spice-${dish.spiceLevel.toLowerCase()}`}>
            🌶️ {dish.spiceLevel}
          </div>
        </div>
        <div className="card-content">
          <div className="card-title">{dish.title}</div>
          <div className="card-desc">{dish.desc}</div>
          <button className="explore-btn" style={{ marginTop: '15px' }}>Learn More <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Carousel 
        title="Flavours of Jaipur" 
        subtitle="Traditional Rajasthani dishes that you must try at least once." 
      />

      <div className="cuisine-page-container container">
        <aside className="cuisine-sidebar">
          <div className="cuisine-sidebar-sticky">
            <h4 className="sidebar-title">Menu Categories</h4>
            <div className="sidebar-divider"></div>
            <ul className="sidebar-links">
              {filters.map(category => {
                const categoryId = category.toLowerCase().replace(/ /g, '-');
                return (
                  <li key={category}>
                    <a href={`#${categoryId}`} onClick={(e) => handleSidebarClick(e, categoryId)}>
                      <i className="fa-solid fa-utensils"></i> {category}
                    </a>
                  </li>
                );
              })}
              <li>
                <a href="#where-to-eat" onClick={(e) => handleSidebarClick(e, 'where-to-eat')}>
                  <i className="fa-solid fa-location-dot"></i> Where to Eat
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <main className="cuisine-main-content">
          {filters.map(category => {
            const categoryDishes = cuisineData.filter(dish => dish.category === category);
            if (categoryDishes.length === 0) return null;
            
            return (
              <div key={category} className="category-section">
                {renderSectionHeader(category)}
                <div className="cuisine-grid">
                  {categoryDishes.map(renderCard)}
                </div>
              </div>
            );
          })}

          <div className="seasonal-banner">
            <div className="banner-content">
              <i className="fa-solid fa-leaf"></i>
              <span><strong>Best enjoyed during:</strong> October – March (Winter Season)</span>
            </div>
          </div>

          {renderSectionHeader('Where to Eat')}
          
          <div className="location-cards-grid">
            <div className="location-card">
              <div className="location-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="location-details">
                <h4>LMB (Laxmi Mishthan Bhandar)</h4>
                <p>Iconic spot in Johari Bazaar, famous for its Ghewar, Paneer Tikka, and traditional Rajasthani Thali.</p>
              </div>
            </div>
            <div className="location-card">
              <div className="location-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="location-details">
                <h4>Rawat Mishthan Bhandar</h4>
                <p>Located near Sindhi Camp, this legendary spot is world-renowned for its crispy Pyaaz Kachori and Mawa Kachori.</p>
              </div>
            </div>
            <div className="location-card">
              <div className="location-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="location-details">
                <h4>Chokhi Dhani</h4>
                <p>A mock Rajasthani village on Tonk Road offering an immersive cultural dining experience with authentic Dal Baati Churma.</p>
              </div>
            </div>
            <div className="location-card">
              <div className="location-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="location-details">
                <h4>Shreenath Lassiwala</h4>
                <p>The original Lassiwala on MI Road serving thick, creamy lassi in earthen kulhads since 1944. Arrive early!</p>
              </div>
            </div>
            <div className="location-card">
              <div className="location-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="location-details">
                <h4>Tapri Central</h4>
                <p>A chic rooftop cafe in C-Scheme offering spectacular views of Central Park alongside artisanal chai and fusion snacks.</p>
              </div>
            </div>
            <div className="location-card">
              <div className="location-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="location-details">
                <h4>Masala Chowk</h4>
                <p>An open-air street food court in Ram Niwas Garden bringing all of Jaipur's famous street food vendors to one place.</p>
              </div>
            </div>
            <div className="location-card">
              <div className="location-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="location-details">
                <h4>Pandit Kulfi</h4>
                <p>Located near Hawa Mahal, offering historic, mouth-watering Kulfi Faluda and Thandai to beat the desert heat.</p>
              </div>
            </div>
          </div>

          <div className="food-walk-cta">
            <div className="cta-overlay"></div>
            <div className="cta-content">
              <h3>Ready for a culinary adventure?</h3>
              <p>Discover these iconic food spots and map out your gastronomic journey across the Pink City.</p>
              <Link to="/explorer" className="cta-btn">Plan Your Food Walk <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>

          {/* New Traveler Note Section */}
          <div className="section-header" style={{ marginTop: '50px', marginBottom: '20px' }}>
              <div className="section-title">A Note for the Foodie</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div
              style={{
                background: 'radial-gradient(circle at center, #FDF6E3 0%, #ECE2C6 100%)',
                border: '1px solid #D4C3A3',
                borderRadius: '2px 12px 3px 15px',
                padding: '25px 35px',
                maxWidth: '600px',
                width: '100%',
                color: '#4A3B32',
                boxShadow: '2px 4px 10px rgba(0,0,0,0.1), inset 0 0 20px rgba(139, 69, 19, 0.05)',
                transform: 'rotate(-0.5deg)',
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

              <i className="fa-solid fa-utensils" style={{ 
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
                fontSize: '1.05rem', 
                lineHeight: '1.6', 
                fontFamily: '"Segoe Script", "Bradley Hand", "Lucida Handwriting", cursive', 
                color: '#3B2C24',
                letterSpacing: '0.1px'
              }}>
                Dear Foodie,<br/><br/>
                Remember to start with lower spice levels when trying a cuisine and for the best taste, take tips from the locals! If you have any allergies, do ask the cook or mention it once since ingredients can slightly vary. Have an open mind when it comes to exploring the culinary palette of Rajasthan and you sure will love it!<br/>
                <span style={{ display: 'block', textAlign: 'right', marginTop: '15px', fontSize: '1rem', color: '#5A473E' }}>
                  - Yours Sincerely;<br/>
                  <strong style={{ fontSize: '1.1rem' }}>Jaipur Tourism</strong>
                </span>
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Food Details Modal */}
      {selectedFood && (
        <div className="food-modal-overlay" onClick={() => setSelectedFood(null)}>
          <div className="food-modal" onClick={e => e.stopPropagation()}>
            <div className="close-btn" onClick={() => setSelectedFood(null)}>
              <i className="fa-solid fa-xmark"></i>
            </div>
            
            <div className="food-modal-img">
              <img src={selectedFood.image} alt={selectedFood.title} />
              {selectedFood.isMustTry && <div className="must-try-badge">Must Try</div>}
            </div>

            <div className="food-modal-content">
              <div className="food-modal-header">
                <h2>{selectedFood.title}</h2>
                <div className="food-modal-badges">
                  <span className={`badge-pill ${selectedFood.diet === 'Veg' ? 'badge-veg' : 'badge-nonveg'}`}>
                    <div className="dot"></div> {selectedFood.diet}
                  </span>
                  <span className={`badge-pill badge-spice-${selectedFood.spiceLevel.toLowerCase()}`}>
                    🌶️ {selectedFood.spiceLevel}
                  </span>
                </div>
              </div>
              
              <p className="food-modal-desc">{selectedFood.desc}</p>
              
              <div className="food-modal-details">
                <div className="detail-item">
                  <i className="fa-solid fa-location-dot detail-icon"></i>
                  <div className="detail-text">
                    <strong>Where to Eat</strong>
                    <span>{selectedFood.whereToEat}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <i className="fa-solid fa-bowl-food detail-icon"></i>
                  <div className="detail-text">
                    <strong>Key Ingredients</strong>
                    <span>{selectedFood.ingredients}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <i className="fa-regular fa-clock detail-icon"></i>
                  <div className="detail-text">
                    <strong>Best Time to Eat</strong>
                    <span>{selectedFood.bestTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cuisine;
