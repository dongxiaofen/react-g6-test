import axios from 'axios';

export const getMyInterface = () => {
  return axios.get('/api/v2/client/api/list');
};
