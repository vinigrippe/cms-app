import api from "@/utils/api";

export const createDesign = async (design) => {
  const response = await api.post("/design", design).then((response) => {
    return response.data;
  });
  return response;
};

export const findAllDesign = async (pageId) => {
  const design = await api.get(`/design/${pageId}`).then((response) => {
    return response.data;
  });
  return design;
};

export const deleteDesignById = async (id) => {
  const design = await api.delete(`/design/${id}`).then((response) => {
    return response.data;
  });
  return design;
};

export const createStyle = async (style) => {
  const response = await api.post("/design/style", style).then((response) => {
    return response.data;
  });
  return response;
};

export const deleteStyleById = async (id) => {
  const design = await api.delete(`/design/style/${id}`).then((response) => {
    return response.data;
  });
  return design;
};
