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
