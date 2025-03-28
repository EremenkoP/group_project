import { RootState } from "../store";

export const isUserAuthSelector = (state: RootState) => state.User.isAuth
export const isAuthError= (state: RootState) => state.User.isError;
export const UserSelector = (state: RootState) => state.User.userName;
