import Carousel from '../Carousel'

function Attractions() {
  return (
    <>
      <Carousel 
        title="Top Attractions in Jaipur" 
        subtitle="Explore forts, palaces, and heritage sites that define the Pink City." 
      />

      <div className="container">
        <div className="section-title">Forts &amp; Palaces</div>
        <div className="cards-row">
          <div className="card">
            <img src="https://media.istockphoto.com/id/469788052/photo/amer-fort-near-jaipur.jpg?s=612x612&w=0&k=20&c=Rsd9v_Ix39ce8U9QKo3UnWfEMG1DUq4hnzh3APPi3g8=" alt="Amber Fort" />
            <div className="card-content">
              <div className="card-title">Amber Fort</div>
              <div className="card-desc">A majestic hilltop fort offering elephant rides, light &amp; sound shows, and stunning views of Maota Lake.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://media.istockphoto.com/id/482557081/photo/hawa-mahal-jaipur-india.jpg?s=612x612&w=0&k=20&c=A6qCUjoNH74nXCkB07RNgK3eIt2mun8PgsLPw9dNkVI=" alt="Hawa Mahal" />
            <div className="card-content">
              <div className="card-title">Hawa Mahal</div>
              <div className="card-desc">The "Palace of Winds" with 953 windows, built for royal ladies to view street processions.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://media.istockphoto.com/id/487804438/photo/jaipur-india-chandra-mahal-palace-within-the-city-palace.jpg?s=612x612&w=0&k=20&c=nMPsdxL9iCyKhDFHmh8cE2ItkC8gp7awos6pL_t076s=" alt="City Palace" />
            <div className="card-content">
              <div className="card-title">City Palace</div>
              <div className="card-desc">A royal residence complex with courtyards, museums, and beautiful gateways like the Peacock Gate.</div>
            </div>
          </div>
        </div>

        <div className="section-title">Science &amp; Heritage</div>
        <div className="cards-row">
          <div className="card">
            <img src="https://plus.unsplash.com/premium_photo-1697730309688-cc2a3a573494?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFudGFyJTIwbWFudGFyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000" alt="Jantar Mantar" />
            <div className="card-content">
              <div className="card-title">Jantar Mantar</div>
              <div className="card-desc">An astronomical observatory featuring the world's largest stone sundial and precise instruments.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/7a/c9/89/photo0jpg.jpg?w=900&h=500&s=1" alt="Albert Hall Museum" />
            <div className="card-content">
              <div className="card-title">Albert Hall Museum</div>
              <div className="card-desc">Houses an impressive collection of paintings, carpets, ivory, stone, and metal sculptures.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://s7ap1.scene7.com/is/image/incredibleindia/birla-temple-hyderabad-secunderabad-telangana-1-attr-hero?qlt=82&ts=1742170051392" alt="Birla Mandir" />
            <div className="card-content">
              <div className="card-title">Birla Mandir</div>
              <div className="card-desc">A modern temple built in white marble, glowing beautifully under the Jaipur evening sky.</div>
            </div>
          </div>
        </div>

        <div className="desc-wrapper">
          <p>
            Most attractions are open from morning till evening, with separate entry fees for Indian and foreign tourists.
            Carry water, wear comfortable footwear, and book tickets online where possible to avoid queues.
          </p>
        </div>
      </div>
    </>
  )
}

export default Attractions
