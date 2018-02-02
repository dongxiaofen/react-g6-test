import axios from 'axios';

export const getAssortment = () => {
  return axios.get('/api/v2/external/client/permission/assortment');
};

export const getAssortmentC2 = (params) => {
  return axios.get('/api/v2/external/client/permission/assortment/c2', params);
};
