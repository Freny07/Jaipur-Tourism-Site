import { useEffect } from 'react'

function Carousel({ title, subtitle }) {
  useEffect(() => {
    const carouselElement = document.querySelector('#myCarousel')
    if (carouselElement && window.bootstrap) {
      new window.bootstrap.Carousel(carouselElement, {
        interval: 5000,
        ride: 'carousel'
      })
    }
  }, [])

  return (
    <header style={{ paddingTop: '0' }}>
      <div id="myCarousel" className="carousel slide pointer-event" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item">
            <img
              src="https://www.agoda.com/wp-content/uploads/2024/09/Featured-image-Royal-Palace-of-Jaipur-India.jpg"
              className="d-block w-100"
              alt="Jaipur Palace"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.pinimg.com/1200x/17/16/0c/17160cf3dcae938504300466062deedf.jpg"
              className="d-block w-100"
              alt="Jaipur Architecture"
            />
          </div>
          <div className="carousel-item active">
            <img
              src="https://www.refreshingholidays.com/uploads/blogs/1758105207.jpg"
              className="d-block w-100"
              alt="Jaipur Hawa Mahal"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.pinimg.com/1200x/63/87/5a/63875ab4490b4128fd63901cbcc3bf79.jpg"
              className="d-block w-100"
              alt="Jaipur Culture"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.pinimg.com/1200x/22/84/79/22847951e521c8ef10021a3578ec2967.jpg"
              className="d-block w-100"
              alt="Jaipur Night"
            />
          </div>
          <div className="hero-box">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </header>
  )
}

export default Carousel
