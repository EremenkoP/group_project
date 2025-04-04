import style from './App.module.scss'
import { Route, Routes } from "react-router";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { router } from "../utils/routes";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import PersonDetails from '../components/PersonComponent/PersonComponent';
import Footer from "./Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path={router.people} element={<PersonDetails />} />
        <Route path={router.signIn} element={<SignIn />} />
        <Route path={router.signUp} element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
