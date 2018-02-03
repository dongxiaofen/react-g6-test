import axios from 'axios';

export const loginOut = () => {
  return axios.delete('/api/v2/external/client/logout');
};

export const getUserInfo = () => {
  return axios.get('/api/v2/external/client/info');
};

export const resetPassword = (params) => {
  return axios.put('/api/v2/external/client/password', params);
};
