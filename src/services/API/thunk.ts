import { AppDispatch } from "../store/store";
import { addUser, errorAuth } from "../store/User/UserSlice";
import { IApiAuth, IApiRegestry } from "../types";
import Api from "./API";

export const thunkSignIn = (body: IApiAuth) => {
  return async function (dispatch: AppDispatch) {
    await Api.login(body)
      .then((res) => {
        console.log(321)
        dispatch(addUser(res));
      })
      .catch((err: { status: number }) => {
        console.log(123);
        let message = "";
        switch (err.status) {
          case 401: {
            message = "Не верный логин или пароль";
            break;
          }
          default: {
            message = "Не известная ошибка авторизации";
            break;
          }
        }
        dispatch(errorAuth({ code: err.status, message: message }));
      });
  };
};

export const thunkSignUp = (body: IApiRegestry) => {
  return async function (dispatch: AppDispatch) {
    await Api.registration(body)
      .then((res) => {
        dispatch(addUser({ userName: body.userName }));
      })
      .catch((err) => {
        let message = "";
        switch (err.status) {
          case 400: {
            message = "Не полностью присланны данные";
            break;
          }
          case 409: {
            message = "Данный email уже занят";
            break;
          }
          default: {
            message = "Неизвестная ошибка регистрации";
            break;
          }
        }
        dispatch(errorAuth({ code: err.status, message: message }));
      });
  };
};
