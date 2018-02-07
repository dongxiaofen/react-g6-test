import axios from 'axios';

export const getAssortment = () => {
  return axios.get('/api/v2/client/permission/assortment');
};

export const getAssortmentC2 = (params) => {
  return axios.get('/api/v2/client/permission/assortment/c2', params);
};
