import api from "@/utils/api";

export const createWebsite = async (website) => {
  const response = await api.post("/website", website).then((response) => {
    return response.data;
  });
  return response;
};

export const findAllWebsites = async () => {
  const websites = await api.get("/websites?page=1").then((response) => {
    return response.data;
  });
  return websites;
};

export const findWebsiteById = async (id) => {
  const website = await api.get(`/website/${id}`).then((response) => {
    return response.data;
  });
  return website;
};

export const deleteWebsiteById = async (id) => {
  const website = await api.delete(`/website/${id}`).then((response) => {
    return response.data;
  });
  return website;
};
