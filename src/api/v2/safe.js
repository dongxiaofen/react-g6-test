import axios from 'axios';

export const getResetApiList = (params) => {
  return axios.get('/api/v2/client/record/apikey/list', {params});
};

export const getApiKey = () => {
  return axios.get('/api/v2/client/permission/apikey');
};

export const resetApikey = (params) => {
  return axios.put('/api/v2/client/permission/apikey', params);
};

export const getWhiteList = (params) => {
  return axios.get('/api/v2/client/whitelist/list', {params});
};

export const createWhiteList = (params) => {
  return axios.post('/api/v2/client/whitelist/add', params);
};

export const deleteWhiteList = (id) => {
  return axios.delete(`/api/v2/client/whitelist/${id}`);
};
