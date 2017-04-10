import axios from 'axios';
export const getUserInfo = () => {
  return axios.get('/api/user/info');
};

export const loginOut = () => {
  axios.delete('/api/user/logout');
};
