import { useForm } from "react-hook-form";
import { IApiRegestry } from "../../services/types";
import { Button, Input, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { thunkSignUp } from "../../services/API/thunk";
import style from "./SignUp.module.scss";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAuthError } from "../../services/store/User/UserSelectors";

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(isAuthError);

  const dataSchema = object({
    userName: string().required("Введите как к вам обращаться"),
    email: string().required("Введите почту").email("Требуется валидный email"),
    password: string().required("Введите пароль"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IApiRegestry>({ resolver: yupResolver(dataSchema) });

  const sendData = async (data: IApiRegestry) => {
    await dispatch(thunkSignUp(data));
  };

  return (
    <section className={style.signUp}>
      <form onSubmit={handleSubmit(sendData)} className={style.form}>
        <label className={style.label}>
          Как к вам обращаться &nbsp;
          <Input {...register("userName")} />
          <Typography
            variant="caption"
            color="red"
            className={style.label__error}
          >
            {errors.userName?.message}
          </Typography>
        </label>
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
        {error && (
          <Typography
            variant="caption"
            color="red"
          >
            {error.message}
          </Typography>
        )}
      </form>
    </section>
  );
};
