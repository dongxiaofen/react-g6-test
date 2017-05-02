import axios from 'axios';
export const getCompanyList = (params) => {
  return axios.get('/api/company/search', params);
};
export const getHistory = () => {
  return axios.get(`/api/company/search/history`);
};
export const getFilterSearch = (params) => {
  return axios.post(`/api/company/search/filter`, params);
};
export const getRelation = (monitorId) => {
  return axios.get(`/api/monitor/${monitorId}/network`);
};
export const createReport = (params) => {
  return axios.post(`/api/report`, {companyName: params});
};
export const createAnalysisReport = (params) => {
  return axios.post(`/api/analysisReport`, {companyName: params});
};
export const createMonitor = (params) => {
  return axios.post(`/api/monitor`, params);
};
export const getFeedBack = (params) => {
  return axios.post(`/api/company/search/feedback`, params);
};
