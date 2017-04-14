import axios from 'axios';
export const getCompanyList = (params) => {
  return axios.get('/api/company/search', params);
};
export const getHistory = () => {
  return axios.get(`/api/company/search/history`);
};
export const getRelation = (monitorId) => {
  return axios.get(`/api/monitor/${monitorId}/network`);
};
