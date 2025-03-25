import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";

interface Movie {
  id: number;
  title: string;
  rating: number;
  imageUrl: string;
}

interface CarouselProps {
  movies: Movie[];
}


export const Carousel: React.FC<CarouselProps> = ({ movies }) => {
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
    <div className={styles.imageSlider}>
      <Slider {...settings}>
        {movies.map((item) => (
          <div key={item.id} className={styles.imageSlide}>
            <div>
              <h3>{item.title}</h3>
            </div>
            <div>
              <p>{item.rating}</p>
            </div>
            <div className={styles.imageSliderImg}>
              <img src={item.imageUrl} alt="img" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
