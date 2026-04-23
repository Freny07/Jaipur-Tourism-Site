import Carousel from '../Carousel'

function Shopping() {
  return (
    <>
      <Carousel 
        title="Shopping in Jaipur" 
        subtitle="From gemstones to handicrafts – take a piece of the Pink City home." 
      />

      <div className="container">
        <div className="section-title">Popular Markets</div>
        <div className="cards-row">
          <div className="card">
            <img src="https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fd1zvcmhypeawxj.cloudfront.net%2Fblogs%2Fcover_web%2Fjohari-bazar-webp-2dac12dc1a-1760116805911.webp&w=3840&q=50" alt="Johari Bazaar" />
            <div className="card-content">
              <div className="card-title">Johari Bazaar</div>
              <div className="card-desc">Famous for gold, kundan, and meenakari jewellery. Perfect spot for wedding shopping.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://images.tv9hindi.com/wp-content/uploads/2022/10/Bapu-Bazar.jpg" alt="Bapu Bazaar" />
            <div className="card-content">
              <div className="card-title">Bapu Bazaar</div>
              <div className="card-desc">Colorful market packed with mojris, bandhej sarees, kurtis, and Jaipuri quilts.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://jaipurculture.com/wp-content/uploads/2025/05/Fun-Facts-Curiosities-About-Jaipur.jpg" alt="Pink City Market" />
            <div className="card-content">
              <div className="card-title">Pink City Market</div>
              <div className="card-desc">Traditional Rajasthani attire, handicrafts, puppets, and decorative items.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://jaipurtourism.co.in/images/places-to-visit/header/tripolia-bazar-jaipur-header-jaipur-tourism.jpg.jpg" alt="Tripolia Bazaar" />
            <div className="card-content">
              <div className="card-title">Tripolia Bazaar</div>
              <div className="card-desc">Renowned for lac bangles, brassware, and premium textiles at wholesale prices.</div>
            </div>
          </div>
        </div>

        <div className="section-title">Shopping Tips</div>
        <p
          style={{
            background: 'rgb(212, 188, 255)',
            borderRadius: '16px',
            padding: '14px 18px',
            color: 'black',
          }}
        >
          • Bargaining is common in local markets – start low and smile while negotiating.
          <br />
          • Prefer fixed-price government emporiums for gemstones and expensive items.
          <br />
          • Keep cash handy for small shops; many bigger stores accept UPI and cards.
          <br />
          • Shop in the evening during summers – afternoons can be very hot.
        </p>
      </div>
    </>
  )
}

export default Shopping
