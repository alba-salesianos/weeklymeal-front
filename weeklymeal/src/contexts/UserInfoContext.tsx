import { createContext } from "react";

export type UserInfoTypeContext = {
  isLogged: boolean;
  setisLogged: Function;
  user: { id: number; username: string; email?: string; password: string };
  setUser: Function;
  currentUser: {
    id: number;
    username: string;
    email?: string;
    password: string;
  };
  setCurrentUser: Function;
  userArray: { name: string; email?: string; password: string }[];
  setUserArray: Function;
};

export const UserInfoContext = createContext({} as UserInfoTypeContext);
