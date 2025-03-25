import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

export const Carousel = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {movies.map((item) => (
          <div key={item.id} className="image-slide">
            <div>
              <h3>{item.title}</h3>
            </div>
            <div>
              <p>{item.rating}</p>
            </div>
            <div className="image-slider__img">
              <img src={item.imageUrl} alt="img" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
