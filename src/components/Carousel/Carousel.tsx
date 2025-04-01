import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";


interface CarouselProps {
  carouselData: any[];
}

export const Carousel: React.FC<CarouselProps> = ({ carouselData }) => {
  const settings = {
    dots: false,
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
        {carouselData.map((item: any, index: number) => (
          <div key={index}>
            <h3>{item.category}: {item.name || item.title}</h3>
            {item.category === 'Film' && <p>Episode: {item.episode_id}</p>}
            {item.category === 'Person' && <p>Height: {item.height}</p>}
            {item.category === 'Planet' && <p>Diameter: {item.diameter}</p>}
            {item.category === 'Species' && <p>Classification: {item.classification}</p>}
            {item.category === 'Starship' && <p>Model: {item.model}</p>}
            {item.category === 'Vehicle' && <p>Model: {item.model}</p>}
          </div>
        ))}
      </Slider>
    </div>
  );
};

