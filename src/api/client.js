import axios from 'axios';

export const loginOut = () => {
  return axios.delete('/api/user/logout');
};
