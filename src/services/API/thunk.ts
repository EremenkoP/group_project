import { AppDispatch } from "../store/store";
import { addUser, removeUser } from "../store/User/UserSlice";
import { IApiAuth, IApiRegestry } from "../types";
import Api from "./API";

export const thunkSignIn = (body: IApiAuth) => {
  return async function (dispatch: AppDispatch) {
    await Api.login(body)
      .then((res) => {
        dispatch(addUser(res));
      })
      .catch((err) => {
        dispatch(removeUser());
        console.log(err);
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
        return err
      });
  };
};
