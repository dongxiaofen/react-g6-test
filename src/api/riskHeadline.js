import axios from 'axios';
export const getCompanyList = (dimGroupTypeStr, params, source) => {
  return axios.get(`/api/headline/xx/companyList?${dimGroupTypeStr}`, {params, cancelToken: source.token});
};
export const getCompanyEvents = (monitorId, params, source) => {
  return axios.get(`/api/headline/xx/${monitorId}/events`, {params, cancelToken: source.token});
};
export const getCompanyInfo = (monitorId, params, source)=> {
  return axios.get(`/api/headline/xx/${monitorId}/info`, {params, cancelToken: source.token});
};
export const getSubCompanyList = (dimGroupTypeStr, monitorId, params, source)=> {
  return axios.get(`/api/headline/xx/${monitorId}/companyList?${dimGroupTypeStr}`, {params, cancelToken: source.token});
};
export const getMonitorMap = (id) => {
  return axios.get(`/api/monitor/map?monitorId=${id}`);
};
export const getNewsDetail = (companyId, params)=> {
  return axios.get(`/api/monitor/${companyId}/internet/detail`, {params});
};
export const getBiddingDetail = (companyId, params)=>{
  return axios.get(`/api/monitor/${companyId}/operation/bidding/detail`, {params});
};
export const getJudgeDocDetail = (companyId, params) => {
  return axios.get(`/api/monitor/${companyId}/risk/judgeDoc`, {params});
};
