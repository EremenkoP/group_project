import { Route, Routes } from "react-router";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { router } from "../utils/routes";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path={router.signIn} element={<SignIn />} />
        <Route path={router.signUp} element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
