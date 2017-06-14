import axios from 'axios';
export const getCompanyList = (dimGroupTypeStr, params, source) => {
  return axios.get(`/api/headline/companyList?${dimGroupTypeStr}`, {params, cancelToken: source.token});
};
export const getCompanyEvents = (monitorId, params, source) => {
  return axios.get(`/api/headline/${monitorId}/events`, {params, cancelToken: source.token});
};
export const getCompanyInfo = (monitorId, params, source)=> {
  return axios.get(`/api/headline/${monitorId}/info`, {params, cancelToken: source.token});
};
export const getSubCompanyList = (dimGroupTypeStr, monitorId, params, source)=> {
  return axios.get(`/api/headline/${monitorId}/companyList?${dimGroupTypeStr}`, {params, cancelToken: source.token});
};
export const getMonitorMap = (id) => {
  return axios.get(`/api/monitor/map?monitorId=${id}`);
};
export const getNewsDetail = (strWithId, params)=> {
  return axios.get(`/api/${strWithId}/internet/detail`, {params});
};
export const getBiddingDetail = (strWithId, params)=>{
  return axios.get(`/api/${strWithId}/operation/bidding/detail`, {params});
};
export const getJudgeDocDetail = (strWithId, params) => {
  return axios.get(`/api/${strWithId}/risk/judgeDoc`, {params});
};
