import axios from 'axios';

export const loginOut = () => {
  return axios.delete('/api/v2/external/client/logout');
};

export const getUserInfo = () => {
  return axios.get('/api/v2/external/client/info');
};
