import { createContext } from "react";

export type UserInfoTypeContext = {
  isLogged: boolean;
  setisLogged: Function;
  user: { name: string; email?: string; password: string };
  setUser: Function;
  currentUser: string;
  setCurrentUser: Function;
  userArray: { name: string; email?: string; password: string }[];
  setUserArray: Function;
};

export const UserInfoContext = createContext({} as UserInfoTypeContext);
