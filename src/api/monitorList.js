import axios from 'axios';
export const getMonitorCount = (params) => {
  return axios.get('/api/monitor/statistic', {params: params});
};
export const getMainList = (params) => {
  const queryStr = `sort=${params.properties},${params.direction}`;
  delete params.properties;
  delete params.direction;
  return axios.get('/api/monitor/companyList/xx?' + queryStr, {params: params});
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
