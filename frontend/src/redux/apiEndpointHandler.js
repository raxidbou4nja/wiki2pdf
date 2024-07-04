import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiEndpointHandler = (endpoint) => {
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    getItems: (params) => axiosInstance.get(`/${endpoint}`, { params }),
    getItemById: (id) => axiosInstance.get(`/${endpoint}/${id}`),
    createItem: (item) => axiosInstance.post(`/${endpoint}`, item, { headers: { 'Content-Type': 'multipart/form-data' } }),
    updateItem: (item, id) => axiosInstance.put(`/${endpoint}/${id}`, item),
    deleteItem: (itemId) => axiosInstance.delete(`/${endpoint}/${itemId}`),
    deleteSelectedItems: (itemIds) => {
      const requests = itemIds.map((id) => axiosInstance.delete(`/${endpoint}/${id}`));
      return axios.all(requests);
    },
  };
};

export default apiEndpointHandler;