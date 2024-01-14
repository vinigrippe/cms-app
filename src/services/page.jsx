import api from "@/utils/api";

export const createPage = async (page) => {
  const response = await api.post("/page", page).then((response) => {
    return response.data;
  });
  return response;
};

export const savePage = async (page) => {
  const response = await api.post("/page", page).then((response) => {
    return response.data;
  });
  return response;
};

export const findAllPages = async (websiteId) => {
  const pages = await api.get(`/pages/${websiteId}`).then((response) => {
    return response.data;
  });
  return pages;
};

export const findPageById = async (id) => {
  const page = await api.get(`/page/${id}`).then((response) => {
    return response.data;
  });
  return page;
};

export const deletePageById = async (id) => {
  const page = await api.delete(`/page/${id}`).then((response) => {
    return response.data;
  });
  return page;
};
