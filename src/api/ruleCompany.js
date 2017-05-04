import axios from 'axios';
export const getCompanyList = (params) => {
  return axios.get('/api/rule/page', {params: params});
};
