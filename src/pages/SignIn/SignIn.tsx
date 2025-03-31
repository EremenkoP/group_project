import { useAppDispatch, useAppSelector } from "../../hooks/store";
import style from "./SignIn.module.scss";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IApiAuth } from "../../services/types";
import { Button, Input, Typography } from "@mui/material";
import { thunkSignIn } from "../../services/API/thunk";
import { isAuthError } from "../../services/store/User/UserSelectors";

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const dataSchema = object({
    email: string().required("Введите почту").email("Требуется валидный email"),
    password: string().required("Введите пароль"),
  });

  const error = useAppSelector(isAuthError);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IApiAuth>({ resolver: yupResolver(dataSchema) });

  const sendData = async (data: IApiAuth) => {
    await dispatch(thunkSignIn(data));
  };

  return (
    <section className={style.SignIn}>
      <form onSubmit={handleSubmit(sendData)} className={style.form}>
        <label className={style.label}>
          Email &nbsp;
          <Input
            {...register("email")}
            className={style.input}
            style={{ color: "white" }}
          />
          <Typography
            variant="caption"
            color="red"
            className={style.label__error}
          >
            {errors.email?.message}
          </Typography>
        </label>{" "}
        <label className={style.label}>
          Password &nbsp;
          <Input
            {...register("password")}
            className={style.input}
            style={{ color: "white" }}
          />
          <Typography
            variant="caption"
            color="red"
            className={style.label__error}
          >
            {errors.password?.message}
          </Typography>
        </label>{" "}
        <Button type="submit"> Enter </Button>
        {error && (
          <Typography variant="caption" color="red">
            {error.message}
          </Typography>
        )}
      </form>
    </section>
  );
};
