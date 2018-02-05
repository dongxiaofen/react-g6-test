import axios from 'axios';

export const resetPassword = (params) => {
  return axios.put('/api/external/client/password', params);
};

export const resetApikey = (params) => {
  return axios.put('/api/external/client/permission/apikey', params);
};

export const getResetApiList = (params) => {
  return axios.get('/api/external/client/permission/apikey/record', {params});
};

export const getWhiteList = (params) => {
  return axios.get('/api/external/client/whitelist/list', {params});
};

export const createWhiteList = (params) => {
  return axios.post('/api/external/client/whitelist/add', params);
};

export const deleteWhiteList = (id) => {
  return axios.delete(`/api/external/client/whitelist/${id}`);
};
