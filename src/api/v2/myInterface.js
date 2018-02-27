import axios from 'axios';

export const getMyInterface = (params) => {
  return axios.get('/api/v2/client/api/list', {params});
};
