import { Link } from "react-router";
import { router } from "../../utils/routes";
import logo from "./logo.png";
import "./Header.scss";
import { Search } from "../../components";

export const Header = () => {
  return (
    <header className="header container">
      <div className="header__left-side">
        <div className="header__logo">
          <Link to={router.main}>
            <img
              src={logo}
              alt="Logo"
              className="header__logo__img"
              width="150px"
            />
          </Link>
        </div>
        <div className="header__menu">
          <ul className="header__menu__list">
            <li>
              {
                <Link to={router.people} className="header__menu__list__link">
                  People
                </Link>
              }
            </li>
            <li>
              {
                <Link to={router.films} className="header__menu__list__link">
                  Films
                </Link>
              }
            </li>
            <li>
              {
                <Link to={router.starships} className="header__menu__list__link">
                  Starships
                </Link>
              }
            </li>
            <li>
              {
                <Link to={router.vehicles} className="header__menu__list__link">
                  Vehicles
                </Link>
              }
            </li>
            <li>
              {
                <Link to={router.species} className="header__menu__list__link">
                  Species
                </Link>
              }
            </li>
            <li>
              {
                <Link to={router.planets} className="header__menu__list__link">
                  Planets
                </Link>
              }
            </li>
          </ul>
        </div>
      </div>
      <div className="header__right-side">
        <div className="header__right-side__search">
          <Search />
        </div>
        <div className="header__right-side__links">
          <Link className="header__right-side__link" to={router.signIn}>
            signIn
          </Link>
          <div>|</div>
          <Link className="header__right-side__link" to={router.signUp}>
            signUp
          </Link>
        </div>
      </div>
    </header>
  );
};
