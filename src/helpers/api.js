import axios from 'axios';
export const postLogin = (params) => {
  return axios.post('/api/user/login', params);
};
export const getCompanyList = (params) => {
  return axios.get('/api/company/search', params);
};
export const getRelation = (monitorId) => {
  return axios.get(`/api/monitor/${monitorId}/network`);
};
// riskHeadlines

export const getRiskCompanyList = (dimGroupTypeStr, params) => {
  return axios.get(`/api/headline/xx/companyList?${dimGroupTypeStr}`, {params});
};
