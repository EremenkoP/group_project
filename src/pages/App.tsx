import style from './App.module.scss'
import { Route, Routes } from "react-router";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { router } from "../utils/routes";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import PersonDetails from '../components/PeopleComponent/PeopleComponent';
import FilmDetails from '../components/FilmsComponent/FilmsComponent';
import StarshipsDetails from '../components/StarshipsComponent/StarshipsComponent';
import VehiclesDetails from '../components/VehiclesComponent/VehiclesComponent';
import SpeciesDetails from '../components/SpeciesComponent/SpeciesComponent';
import PlanetDetails from '../components/PlanetsComponent/PlanetsComponent';
import Footer from "./Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path={router.people} element={<PersonDetails />} />
        <Route path={router.films} element={<FilmDetails />} />
        <Route path={router.starships} element={<StarshipsDetails />} />
        <Route path={router.vehicles} element={<VehiclesDetails />} />
        <Route path={router.species} element={<SpeciesDetails />} />
        <Route path={router.planets} element={<PlanetDetails />} />
        <Route path={router.signIn} element={<SignIn />} />
        <Route path={router.signUp} element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
