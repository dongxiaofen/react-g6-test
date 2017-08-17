import axios from 'axios';

export const resetPassword = (params) => {
  return axios.put('/api/external/client/password', params);
};
