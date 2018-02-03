import axios from 'axios';

export const getResetApiList = (params) => {
  return axios.get('/api/v2/external/client/record/apikey/list', {params});
};

export const getApiKey = () => {
  return axios.get('/api/v2/external/client/permission/apikey');
};

export const resetApikey = (params) => {
  return axios.put('/api/v2/external/client/permission/apikey', params);
};
