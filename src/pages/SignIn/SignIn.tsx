import { useAppDispatch } from "../../hooks/store";
import style from "./SignIn.module.scss";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IApiAuth } from "../../services/types";
import { Button, Input, Typography } from "@mui/material";
import { useState } from "react";
import { thunkSignIn } from "../../services/API/thunk";

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const dataSchema = object({
    email: string().required("Введите почту").email("Требуется валидный email"),
    password: string().required("Введите пароль"),
  });

  const [error, setError] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IApiAuth>({ resolver: yupResolver(dataSchema) });

  const sendData = (data: IApiAuth) => {
    dispatch(thunkSignIn(data))
  };

  return (
    <section className={style.SignIn}>
      <form onSubmit={handleSubmit(sendData)} className={style.form}>
        <label className={style.label}>
          Ввведите вашу почту &nbsp;
          <Input {...register("email")} />
          <Typography
            variant="caption"
            color="red"
            className={style.label__error}
          >
            {errors.email?.message}
          </Typography>
        </label>{" "}
        <label className={style.label}>
          Введите пароль &nbsp;
          <Input {...register("password")} />
          <Typography
            variant="caption"
            color="red"
            className={style.label__error}
          >
            {errors.password?.message}
          </Typography>
        </label>{" "}
        <Button type="submit"> Регистрация </Button>
        {error && <p>{error}</p>}
      </form>
    </section>
  );
};
