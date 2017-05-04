import axios from 'axios';
export const getCompanyList = (params) => {
  return axios.get('/api/rule/alert/company/page', {params});
};
