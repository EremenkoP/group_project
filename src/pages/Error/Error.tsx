import { Link } from "react-router";
import style from "./Error.module.scss";
import { router } from "../../utils/routes";
import { Typography } from "@mui/material";

export const Error = () => {
  return (
    <section className={style.content}>
      <Typography variant='h1' color='warning'>404</Typography>
      <Link to={router.main}>На главную</Link>
    </section>
  );
};

