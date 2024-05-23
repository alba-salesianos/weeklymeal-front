const RECIPE_API = "http://localhost:8082/api/v1/";

const getAllRecipes = async () => {};

/* const getInitRequest = (httpVerb: string, user: UserInfo) => {
  const init: RequestInit = {
    method: httpVerb,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  return init;
}; */

const userService = {
  getAllRecipes,
};

export default userService;
