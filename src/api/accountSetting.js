import axios from 'axios';
export const getTreeList = () => {
  return axios.get('/api/user/sub/tree');
};
export const getUserInfo = (uId) => {
  return axios.get(`/api/user/sub/${uId}`);
};
export const getReportAndMonitor = (uId) => {
  return axios.get(`/api/user/sub/${uId}/statistic/reportAndMonitor`);
};
export const getProvince = (uId) => {
  return axios.get(`/api/user/sub/${uId}/statistic/province`);
};
export const getIndustry = (uId) => {
  return axios.get(`/api/user/sub/${uId}/statistic/industry`);
};
export const getScale = (uId) => {
  return axios.get(`/api/user/sub/${uId}/statistic/scale`);
};
export const getConsume = (uId, params) => {
  return axios.get(`/api/user/sub/${uId}/consume`, {params});
};
export const getRecharge = (uId, params) => {
  return axios.get(`/api/user/sub/${uId}/recharge`, {params});
};
export const getSummary = (uId, params) => {
  return axios.get(`/api/user/sub/${uId}/consume/summary`, {params});
};
export const getLoginRecord = (uId, params) => {
  return axios.get(`/api/user/sub/${uId}/login`, {params});
};
