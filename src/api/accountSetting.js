import axios from 'axios';
export const getTreeList = () => {
  return axios.get('/api/user/sub/tree');
};
