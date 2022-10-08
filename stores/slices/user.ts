import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type User = {
  id: string;
  username: string;
  password: string;
};

export enum AuthActionStatus {
  SUCCESS,
  FAILURE,
}

export interface UserState {
  currentUser?: User;
  users: User[];
  errorMessage?: string;
  registerStatus?: AuthActionStatus;
  loginStatus?: AuthActionStatus;
}

const initialState: UserState = {
  currentUser: undefined,
  users: [
    {
      id: uuidv4(),
      username: "username",
      password: "password",
    },
  ],
  errorMessage: undefined,
  registerStatus: undefined,
  loginStatus: undefined,
};

export type UserCredential = {
  username: string;
  password: string;
};

export const tokenSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register(state, action: PayloadAction<UserCredential>) {
      state.errorMessage = undefined;
      state.registerStatus = undefined;
      const { payload } = action;
      const user = state.users.find(
        (filter) => filter.username === payload.username
      );
      if (user) {
        state.errorMessage = "User already exist";
        state.registerStatus = AuthActionStatus.FAILURE;
      } else {
        state.users.push({
          id: uuidv4(),
          username: payload.username,
          password: payload.password,
        });
        state.registerStatus = AuthActionStatus.SUCCESS;
      }
    },
    login(state, action: PayloadAction<UserCredential>) {
      state.errorMessage = undefined;
      state.loginStatus = undefined;
      const { payload } = action;
      const user = state.users.find(
        (filter) => filter.username === payload.username
      );

      if (!user) {
        state.errorMessage = "Invalid username";
        state.loginStatus = AuthActionStatus.FAILURE;
      } else if (user && user.password !== payload.password) {
        state.errorMessage = "Invalid password";
        state.loginStatus = AuthActionStatus.FAILURE;
      } else if (user) {
        state.currentUser = user;
        state.loginStatus = AuthActionStatus.SUCCESS;
        document.cookie = `uid=${user.id}; SameSite=Lax; path=/`;
      }
    },
    logout(state) {
      state.errorMessage = undefined;
      state.currentUser = undefined;
      document.cookie =
        "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; path=/";
    },
    clearStatus(state) {
      state.registerStatus = undefined;
      state.loginStatus = undefined;
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { register, login, logout, clearStatus } = tokenSlice.actions;

export default tokenSlice.reducer;
