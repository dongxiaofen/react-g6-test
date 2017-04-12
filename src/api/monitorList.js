import axios from 'axios';
export const getMonitorCount = (params) => {
  return axios.get('/api/monitor/statistic', {params: params});
};
export const getMainList = (params) => {
  return axios.get('/api/monitor/companyList/xx', {params: params});
};
export const getRelList = (monitorId) => {
  return axios.get(`/api/monitor/${monitorId}/companyList`);
};
export const changeMonitorStatus = (params) => {
  return axios.put(`/api/monitor/${params.monitorId}/status`, {status: params.newStatus});
};
export const recharge = (params) => {
  return axios.put(`/api/monitor/${params.rechargeId}/renewal`, {time: params.monitorTime});
};
