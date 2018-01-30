import axios from 'axios';
export const postLogin = (params) => {
  return axios.post('/api/external/client/login', params);
};
