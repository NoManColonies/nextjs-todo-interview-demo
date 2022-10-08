import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../stores";
import {
  clearStatus,
  login,
  logout,
  register,
  AuthActionStatus,
  User,
  UserCredential,
} from "../stores/slices/user";

export type LoginCb = (cred: UserCredential) => void;
export type RegisterCb = (cred: UserCredential) => void;
export type LogoutCb = () => void;
export type ClearStatusCb = () => void;

export type AuthStates = {
  user?: User;
  errorMessage?: string;
  registerStatus?: AuthActionStatus;
  loginStatus?: AuthActionStatus;
};

export type AuthHandlers = {
  useLogin: LoginCb;
  useLogout: LogoutCb;
  useRegister: RegisterCb;
  useClearStatus: ClearStatusCb;
};

export function useAuth(): [AuthStates, AuthHandlers] {
  const {
    currentUser: user,
    errorMessage,
    registerStatus,
    loginStatus,
  } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const useLogin = useCallback(
    (cred: UserCredential) => dispatch(login(cred)),
    [dispatch]
  );
  const useRegister = useCallback(
    (cred: UserCredential) => dispatch(register(cred)),
    [dispatch]
  );
  const useLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const useClearStatus = useCallback(() => dispatch(clearStatus()), [dispatch]);

  const memorizedState = useMemo(
    () => ({ user, errorMessage, registerStatus, loginStatus }),
    [user, errorMessage, registerStatus, loginStatus]
  );

  const memorizedCallback = useMemo(
    () => ({
      useLogin,
      useLogout,
      useRegister,
      useClearStatus,
    }),
    [useLogout, useLogin, useRegister, useClearStatus]
  );

  return [memorizedState, memorizedCallback];
}
