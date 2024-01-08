import api from "@/utils/api";

export const createUser = async (user) => {
  const response = await api.post("/user", user).then((response) => {
    return response.data;
  });
  return response;
};

export const findAllPages = async () => {
  const users = await api.get("/users?user=1").then((response) => {
    return response.data;
  });
  return users;
};

export const findUserById = async (id) => {
  const user = await api.get(`/user/${id}`).then((response) => {
    return response.data;
  });
  return user;
};

export const deleteUserById = async (id) => {
  const user = await api.delete(`/user/${id}`).then((response) => {
    return response.data;
  });
  return user;
};
