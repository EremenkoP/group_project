import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiAuthResponce } from "../../types";

interface IInitalState extends IApiAuthResponce {}

const initalState: IInitalState = {
  userName: "",
};

export const UserSlice = createSlice({
  name: "User",
  initialState: initalState,
  reducers: {
    addUser: (state, action: PayloadAction<IApiAuthResponce>) => {
      state = action.payload;
    },
    removeUser: (state) => {
      state = {
        userName: "",
      };
    },
  },
});

export const { addUser, removeUser } = UserSlice.actions;


export const UserReducer = UserSlice.reducer;