import React from "react";
import {
  UserInfoTypeContext,
  UserInfoContext,
} from "../contexts/UserInfoContext";
import { UserInfo } from "../types/UserInfo";

type UserInfoProviderProps = {
  children: JSX.Element | JSX.Element[];
};

function UserInfoProvider(props: UserInfoProviderProps) {
  const { children } = props;

  const [isLogged, setisLogged] = React.useState(false);

  let userDefault: UserInfo = {
    name: "root",
    email: "a@gmail.com",
    password: "123",
  };

  const [user, setUser] = React.useState(userDefault);
  const [userArray, setUserArray] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState("");

  const defaultValue: UserInfoTypeContext = {
    isLogged,
    setisLogged,
    user,
    setUser,
    currentUser,
    setCurrentUser,
    userArray,
    setUserArray,
  };

  return (
    <UserInfoContext.Provider value={defaultValue}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoProvider;
