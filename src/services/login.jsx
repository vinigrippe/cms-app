import api from "@/utils/api";

export const login = async (user) => {
  const response = await api.post("/login", user).then((response) => {
    return response.data;
  });
  return response;
};

export const logout = async () => {
  const response = await api.post("/logout").then((response) => {
    return response.data;
  });
  return response;
};

export const checkToken = async () => {
  const response = await api
    .get("/token")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};
