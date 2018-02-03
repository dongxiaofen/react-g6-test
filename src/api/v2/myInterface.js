import axios from 'axios';

export const getMyInterface = () => {
  return axios.get('/api/v2/external/client/api/list');
};
