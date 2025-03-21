import { Link } from "react-router";
import { router } from "../../utils/routes";

export const Header = () => {
  return (
    <header>
      Шапка
      <Link to={router.signIn}>signIn</Link>
      <Link to={router.signUp}>signUp</Link>
    </header>
  );
};
