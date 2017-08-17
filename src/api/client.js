import axios from 'axios';

export const loginOut = () => {
  return axios.delete('/api/external/client/logout');
};

export const getUserInfo = () => {
  return axios.get('/api/external/client/info');
};
