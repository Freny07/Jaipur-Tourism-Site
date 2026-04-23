import Carousel from '../Carousel'

function Cuisine() {
  return (
    <>
      <Carousel 
        title="Flavours of Jaipur" 
        subtitle="Traditional Rajasthani dishes that you must try at least once." 
      />

      <div className="container">
        <div className="section-title">Signature Dishes</div>
        <div className="cards-row">
          <div className="card">
            <img src="https://i.redd.it/e9yo0utefpo61.jpg" alt="Rajasthani Thali" />
            <div className="card-content">
              <div className="card-title">Rajasthani Thali</div>
              <div className="card-desc">A royal platter of dal-baati-churma, gatte ki sabzi, kadhi, roti, rice, and sweets.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://www.olddelhifoods.com/wp-content/uploads/2024/08/Paneer-Ghewar.jpg" alt="Ghewar" />
            <div className="card-content">
              <div className="card-title">Ghewar</div>
              <div className="card-desc">Honeycomb-like sweet cake, especially popular during Teej and monsoon season.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://www.sweedesi.com/cdn/shop/products/pyaz-kachori-rawat-rawat-mishthan-bhandar-368768.jpg?v=1740033789" alt="Pyaz Kachori" />
            <div className="card-content">
              <div className="card-title">Pyaz Kachori</div>
              <div className="card-desc">Crispy pastry stuffed with spicy onion filling – a favourite Jaipur breakfast snack.</div>
            </div>
          </div>
          <div className="card">
            <img src="https://aromaticessence.co/wp-content/uploads/2016/03/image60-768x1365.jpeg" alt="Laal Maas" />
            <div className="card-content">
              <div className="card-title">Laal Maas</div>
              <div className="card-desc">Fiery red mutton curry slow-cooked with Mathania chillies and traditional spices.</div>
            </div>
          </div>
        </div>

        <div className="section-title">Where to Eat</div>
        <div className="desc-wrapper">
          <p>
            • Try local dhabas and roof-top restaurants in the old city for authentic taste and ambience.<br />
            • Many thali restaurants near MI Road and C-Scheme serve unlimited Rajasthani thalis.<br />
            • For street food, explore areas around Bapu Bazaar and Johari Bazaar in the evening.<br />
            • Always check spice levels before ordering if you are not used to very spicy food!
          </p>
        </div>
      </div>
    </>
  )
}

export default Cuisine
