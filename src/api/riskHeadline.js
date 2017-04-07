import axios from 'axios';
export const getCompanyList = (dimGroupTypeStr, params) => {
  return axios.get(`/api/headline/xx/companyList?${dimGroupTypeStr}`, {params});
};
