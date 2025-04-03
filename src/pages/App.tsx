import style from './App.module.scss'
import { Route, Routes } from "react-router";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { router } from "../utils/routes";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import Footer from "./Footer/Footer";
import { People } from "./People/People";
import { Films } from './Films/Films';
import { Starships } from './Starships/Starships';
import { Vehicles } from './Vehicles/Vehicles';
import { Species } from './Species/Species';
import { Planets } from './Planets/Planets';
import { Error } from './Error/Error';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path={router.signIn} element={<SignIn />} />
        <Route path={router.signUp} element={<SignUp />} />
        <Route path={router.people} element={<People />} />
        <Route path={router.films} element={<Films />} />
        <Route path={router.starships} element={<Starships />} />
        <Route path={router.vehicles} element={<Vehicles />} />
        <Route path={router.species} element={<Species />} />
        <Route path={router.planets} element={<Planets />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
