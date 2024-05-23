import axios from "axios";
import { Recipe } from "../types/RecipeType";

const API_URL = "http://192.168.137.1:8082/api/v1";

const createMenu = async (menu: Recipe[]) => {
  const response = await axios.post(`${API_URL}/menu/create/2`, menu);
  return response.data;
};

const MenuService = {
  createMenu,
};

export default MenuService;
