import axios from 'axios';

export const getMouduleInfo = () => {
  return axios.get('/api/common/moduleInfo');
};
