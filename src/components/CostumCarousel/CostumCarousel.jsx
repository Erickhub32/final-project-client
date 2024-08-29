import './CostumCoursel.css'
import { Carousel } from "react-bootstrap"

const CostumCarousel = ({ images, postId, size }) => {

  const customStyle = size === 'LG' ?
    { objectFit: 'cover', width: '100%', height: '600px' } :
    { width: '100%', height: '200px' }

  return (
    <Carousel>
      {
        images.map((eachImage, idx) => {
          return (
            <Carousel.Item key={`carousel-item-${postId}-${idx}`}>
              <div >
                <img
                  className=".img-fluid. max-width: 100%"
                  src={eachImage}
                  alt="slide"
                  style={customStyle}
                />
              </div>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}

export default CostumCarousel