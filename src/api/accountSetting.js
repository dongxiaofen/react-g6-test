import axios from 'axios';
export const getTreeList = () => {
  return axios.get('/api/user/sub/tree');
};
export const getUserInfo = (uId) => {
  return axios.get(`/api/user/sub/${uId}`);
};
export const getReportAndMonitor = (uId) => {
  return axios.get(`/api/user/sub/${uId}/statistic/reportAndMonitor/xx`);
};
export const getProvince = (uId) => {
  return axios.get(`/api/user/sub/${uId}/statistic/province/xx`);
};
export const getIndustry = (uId) => {
  return axios.get(`/api/user/sub/${uId}/statistic/industry/xx`);
};
export const getScale = (uId) => {
  return axios.get(`/api/user/sub/${uId}/statistic/scale/xx`);
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
export const addNewUser = (params) => {
  return axios.post(`/api/user/sub`, params);
};
export const changePwd = (url, params) => {
  return axios.put(url, params);
};
export const editInfo = (url, params) => {
  return axios.put(url, params);
};
