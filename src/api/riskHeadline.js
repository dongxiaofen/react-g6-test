import axios from 'axios';
export const getCompanyList = (dimGroupTypeStr, params) => {
  return axios.get(`/api/headline/xx/companyList?${dimGroupTypeStr}`, {params});
};
export const getCompanyEvents = (monitorId, params) => {
  return axios.get(`/api/headline/xx/${monitorId}/events`, {params});
};
export const getCompanyInfo = (monitorId, params)=> {
  return axios.get(`/api/headline/xx/${monitorId}/info`, {params});
};
export const getSubCompanyList = (dimGroupTypeStr, monitorId, params)=> {
  return axios.get(`/api/headline/xx/${monitorId}/companyList?${dimGroupTypeStr}`, {params});
};
export const getMonitorMap = (id) => {
  return axios.get(`/api/monitor/map?monitorId=${id}`);
};
