import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiAuthResponce, IAuthError } from "../../types";

interface IInitalState extends IApiAuthResponce {
  isAuth: boolean;
  isError: IAuthError;
}

const initalState: IInitalState = {
  userName: "",
  isAuth: false,
  isError: {
    code: 0,
    message: "",
  },
};

export const UserSlice = createSlice({
  name: "User",
  initialState: initalState,
  reducers: {
    addUser: (state, action: PayloadAction<IApiAuthResponce>) => {
      return state = {
        userName: action.payload.userName,
        isAuth: true,
        isError: {
          code: 0,
          message: "",
        },
      };
    },
    removeUser: (state) => {
      return state = {
        userName: "",
        isAuth: false,
        isError: {
          code: 0,
          message: "",
        },
      };
    },
    errorAuth: (state, action: PayloadAction<IAuthError>) => {
      return state = {
        userName: "123123",
        isAuth: false,
        isError: {...action.payload},
      };
    },
  },
});

export const { addUser, removeUser, errorAuth } = UserSlice.actions;

export const UserReducer = UserSlice.reducer;
