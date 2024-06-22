import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL;


console.log('API_URL', API_URL);
const apiEndpointHandler = (endpoint) => {
  return {
    getItems: (params) => axios.get(`${API_URL}/${endpoint}`, { params }),
    getItemById: (id) => axios.get(`${API_URL}/${endpoint}/${id}`),
    createItem: (item) => axios.post(`${API_URL}/${endpoint}`, item),
    updateItem: (item, id) => axios.put(`${API_URL}/${endpoint}/${id}`, item),
    deleteItem: (itemId) => axios.delete(`${API_URL}/${endpoint}/${itemId}`),
    deleteSelectedItems: (itemIds) => {
      const requests = itemIds.map((id) => axios.delete(`${API_URL}/${endpoint}/${id}`));
      return axios.all(requests);
    },
  };
};

export default apiEndpointHandler;