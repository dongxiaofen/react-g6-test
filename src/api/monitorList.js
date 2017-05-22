import axios from 'axios';
const monitorTypeMap = {
  monitorList: 'monitor',
  deepMonitorList: 'deepMonitor'
};
export const getMonitorCount = (monitorType, params, source) => {
  return axios.get(`/api/${monitorTypeMap[monitorType]}/statistic`, {
    params: params,
    cancelToken: source.token
  });
};
export const getMainList = (monitorType, params, source) => {
  return axios.get(`/api/${monitorTypeMap[monitorType]}/companyList/xx`, {
    params: params,
    cancelToken: source.token
  });
};
export const getRelList = (monitorType, monitorId) => {
  return axios.get(`/api/${monitorTypeMap[monitorType]}/${monitorId}/companyList`);
};
export const changeMonitorStatus = (monitorType, params) => {
  const {monitorId, status} = params;
  return axios.put(`/api/${monitorTypeMap[monitorType]}/${monitorId}/status`, {status});
};
export const renewal = (monitorType, params) => {
  return axios.put(`/api/${monitorTypeMap[monitorType]}/${params.monitorId}/renewal`, {time: params.time});
};
