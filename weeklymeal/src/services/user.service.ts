import axios from "axios";
import { LoginPetition } from "../types/UserInfo";

const API_URL = "http://192.168.137.1:8082/api/v1";

const login = async (loginRequest: LoginPetition) => {
  const response = await axios.post(`${API_URL}/auth/login`, loginRequest);
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`, {});
  return response.data;
};

const register = async (formData: {
  userName: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/user`, formData);
  return response.data;
};

const UserService = {
  login,
  logout,
  register,
};
export default UserService;
