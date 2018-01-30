import axios from 'axios';
export const postLogin = (params) => {
  return axios.post('/api/v2/external/client/login', params);
};
