import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../Carousel'

function Home() {
  const [weather, setWeather] = useState({ value: '32°C Sunny', icon: '☀', isImg: false })

  useEffect(() => {
    async function getWeather() {
      const apiKey = '47a0d7b7b4449c79f6167bd2245b2755'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Jaipur,IN&appid=${apiKey}&units=metric`
      try {
        const res = await fetch(url)
        const data = await res.json()
        const temp = data.main.temp
        const desc = data.weather[0].description
        const iconCode = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
        setWeather({ value: `${temp}°C ${desc}`, icon: iconUrl, isImg: true })
      } catch {
        setWeather({ value: 'Unable to load weather', icon: '☀', isImg: false })
      }
    }
    getWeather()
    const interval = setInterval(getWeather, 900000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Carousel 
        title="Jaipur City Tourism" 
        subtitle="The Pink City – Heritage, Colors, Culture, Wonders &amp; More" 
      />

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏰</div>
            <div className="stat-title">Attractions</div>
            <div className="stat-value">32</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-title">Tourists This Month</div>
            <div className="stat-value">28,510</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              {weather.isImg ? (
                <img src={weather.icon} alt="weather icon" style={{ width: '50px', height: '50px' }} />
              ) : weather.icon}
            </div>
            <div className="stat-title">Current Weather</div>
            <div className="stat-value">{weather.value}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎭</div>
            <div className="stat-title">Today's Events</div>
            <div className="stat-value">6</div>
          </div>
        </div>

        <div className="about-wrapper">
          <div className="about-class">About Jaipur</div>
          <div className="about-content">
            <p>
              Jaipur, the capital of Rajasthan, is famously known as the Pink City
              due to its distinct pink-colored buildings. Founded in 1727 by
              Maharaja Sawai Jai Singh II, it is India's first planned city.
              Jaipur is renowned for its rich history, royal palaces, and vibrant
              culture, including the Amber Fort, Hawa Mahal, and City Palace. It's
              also part of the Golden Triangle tourist circuit with Delhi and
              Agra. The city beautifully blends tradition and modernity,
              attracting visitors from around the world.
            </p>
          </div>
        </div>

        <div className="section-title">Today's Featured Events</div>
        <div className="cards-row">
          <div className="card event-card">
            <img src="https://c4.wallpaperflare.com/wallpaper/132/50/490/laser-show-laser-light-lot-wallpaper-preview.jpg" alt="Light & Sound Show" />
            <div className="card-content">
              <div className="card-title">Light &amp; Sound Show</div>
              <div className="card-desc">Amber Fort, 7:00 PM</div>
            </div>
          </div>
          <div className="card event-card">
            <img src="https://media.istockphoto.com/id/609720544/vector/couple-playing-garba-in-dandiya-night-navratri-dussehra-festival.jpg?s=612x612&w=0&k=20&c=Aveqw-4ETGoS90quC5dJ6WyXLqu3bZfjeoUesCmleGE=" alt="Folk Dance Night" />
            <div className="card-content">
              <div className="card-title">Folk Dance Night</div>
              <div className="card-desc">Central Park, 8:30 PM</div>
            </div>
          </div>
          <div className="card event-card">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/050/808/926/small/bustling-outdoor-craft-and-artisan-market-of-handmade-products-traditional-artisanal-goods-photo.jpeg" alt="Artisan Market" />
            <div className="card-content">
              <div className="card-title">Artisan Market</div>
              <div className="card-desc">Johari Bazaar, All Day</div>
            </div>
          </div>
          <div className="card event-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH0xOmdbSBMfa_j-qFc6iozhBRLs1f4p55Gg&s" alt="Rajasthani Food Fest" />
            <div className="card-content">
              <div className="card-title">Rajasthani Food Fest</div>
              <div className="card-desc">Bapu Bazaar, 5:00 PM</div>
            </div>
          </div>
        </div>

        <div id="attractions" className="section-title">Popular Attractions</div>
        <div className="desc-wrapper">
          <p>
            Jaipur is celebrated for its magnificent forts, grand palaces, and
            timeless architectural wonders. Every landmark reflects the proud
            legacy of the Rajput kings and the artistic brilliance of the Pink City.
          </p>
        </div>
        <div className="cards-with-button">
          <div className="cards-row two-cards">
            <div className="card">
              <img src="https://media.istockphoto.com/id/469788052/photo/amer-fort-near-jaipur.jpg?s=612x612&w=0&k=20&c=Rsd9v_Ix39ce8U9QKo3UnWfEMG1DUq4hnzh3APPi3g8=" alt="Amber Fort" />
              <div className="card-content">
                <div className="card-title">Amber Fort</div>
                <div className="card-desc">Majestic hilltop fort with stunning views.</div>
              </div>
            </div>
            <div className="card">
              <img src="https://media.istockphoto.com/id/482557081/photo/hawa-mahal-jaipur-india.jpg?s=612x612&w=0&k=20&c=A6qCUjoNH74nXCkB07RNgK3eIt2mun8PgsLPw9dNkVI=" alt="Hawa Mahal" />
              <div className="card-content">
                <div className="card-title">Hawa Mahal</div>
                <div className="card-desc">Iconic pink palace with intricate lattice windows.</div>
              </div>
            </div>
          </div>
          <div className="view-more-btn">
            <Link to="/attractions">View All Attractions →</Link>
          </div>
        </div>

        <div id="shopping" className="section-title">Jaipur's Famous Shopping Spots</div>
        <div className="desc-wrapper">
          <p>
            Jaipur's vibrant bazaars are filled with traditional crafts, colorful
            textiles, handcrafted jewelry, and unique souvenirs.
          </p>
        </div>
        <div className="cards-with-button">
          <div className="cards-row two-cards">
            <div className="card shopping-spot">
              <img src="https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fd1zvcmhypeawxj.cloudfront.net%2Fblogs%2Fcover_web%2Fjohari-bazar-webp-2dac12dc1a-1760116805911.webp&w=3840&q=50" alt="Johari Bazaar" />
              <div className="card-content">
                <div className="card-title">Johari Bazaar</div>
                <div className="card-desc">Famous for exquisite jewelry, gemstones, and handcrafted ornaments.</div>
              </div>
            </div>
            <div className="card shopping-spot">
              <img src="https://images.tv9hindi.com/wp-content/uploads/2022/10/Bapu-Bazar.jpg" alt="Bapu Bazaar" />
              <div className="card-content">
                <div className="card-title">Bapu Bazaar</div>
                <div className="card-desc">Popular for colorful textiles, handicrafts, and leather products.</div>
              </div>
            </div>
          </div>
          <div className="view-more-btn">
            <Link to="/shopping">Explore All Shopping Spots →</Link>
          </div>
        </div>

        <div id="food" className="section-title">Jaipur's Favorite Food</div>
        <div className="desc-wrapper">
          <p>
            Jaipur's food culture is a blend of royal Rajasthani flavors, traditional recipes, and iconic street delights.
          </p>
        </div>
        <div className="cards-with-button">
          <div className="cards-row two-cards">
            <div className="card food-card">
              <img src="https://i.redd.it/e9yo0utefpo61.jpg" alt="Rajasthani Thali" />
              <div className="card-content">
                <div className="card-title">Rajasthani Thali</div>
                <div className="card-desc">A wholesome royal platter of dal-baati, churma, kadhi, and more.</div>
              </div>
            </div>
            <div className="card food-card">
              <img src="https://www.olddelhifoods.com/wp-content/uploads/2024/08/Paneer-Ghewar.jpg" alt="Ghewar" />
              <div className="card-content">
                <div className="card-title">Ghewar</div>
                <div className="card-desc">A festival-special sweet known for its crispy texture and saffron flavor.</div>
              </div>
            </div>
          </div>
          <div className="view-more-btn">
            <Link to="/cuisine">See More Jaipur Dishes →</Link>
          </div>
        </div>

        <div className="map-section">
          <b>Explore Jaipur on the Map</b><br />
          <section id="map">
            <h3>Jaipur map</h3>
            <iframe
              className="map"
              title="Jaipur city map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14223.780331040334!2d75.814578!3d26.912433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db14d7070f77b%3A0x3f6a7a3b6d5e7d75!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1710000000000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: '0', width: '100%', height: '500px' }}
            ></iframe>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home
