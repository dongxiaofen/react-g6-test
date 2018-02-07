import axios from 'axios';
export const postLogin = (params) => {
  return axios.post('/api/v2/client/login', params);
};
