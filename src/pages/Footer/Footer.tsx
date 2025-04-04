import { Link } from "react-router";
import { router } from "../../utils/routes";
import "./Footer.scss";
import facebook from './facebook.png'
import instagram from './instagram.png'
import youtube from './youtube.png'

const Footer = () => {
  return (
    <footer className="footer container">
      <div className="footer__top-side">
        <div className="footer__top-side__social">
          <h3 className="footer__top-side__social__title">Star Wars</h3>
          <p className="footer__top-side__social__p">Where Imagination Meets the Universe</p>
          <div className="footer__top-side__social__icons">
            <a href="https://www.facebook.com/StarWars">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/starwars/">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://www.youtube.com/user/StarWars">
              <img src={youtube} alt="YouTube" />
            </a>

          </div>
        </div>
        <div className="footer__top-side__links">
          <Link className="footer__top-side__links" to={router.people}>People</Link>
          <Link className="footer__top-side__links" to={router.films}>Films</Link>
          <Link className="footer__top-side__links" to={router.starships}>Starships</Link>
          <Link className="footer__top-side__links" to={router.vehicles}>Vehicles</Link>
          <Link className="footer__top-side__links" to={router.species}>Species</Link>
          <Link className="footer__top-side__links" to={router.planets}>Planets</Link>
        </div>
        <div className="footer__top-side__describe">
            <h3 className="footer__top-side__describe__title">Newletters subscription</h3>
            <div className="footer__top-side__describe__input-container">
                <input className="footer__top-side__describe__input" placeholder="Enter your e-mail..."></input>
                <button className="footer__top-side__describe__button">Subscribe</button>
            </div>
        </div>
      </div>
      <div className="footer__bottom-side">
        <div className="footer__bottom-side__copyright">
          Copyright &copy; 2025 Star Wars | All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
