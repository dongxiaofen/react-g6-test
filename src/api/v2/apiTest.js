import axios from 'axios';

export const getAssortmentC1 = () => {
  return axios.get('/api/v2/external/client/permission/assortment/c1/all');
};

export const getAssortmentC2 = (params) => {
  return axios.get('/api/v2/external/client/permission/assortment/c2/all', {params});
};

export const getApiList = (classificationId) => {
  return axios.get(`/api/v2/external/client/permission/${classificationId}/list`);
};

export const getApiInfo = (apiId) => {
  return axios.get(`/api/v2/external/client/permission/${apiId}`);
};

export const getApiKey = () => {
  return axios.get('/api/v2/external/client/permission/apikey');
};

export const getScToken = (params) => {
  return axios.post('/api/v2/sc/token', params);
};
