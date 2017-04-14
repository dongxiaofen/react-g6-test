import axios from 'axios';
export const getMonitorCount = (params) => {
  return axios.get('/api/monitor/statistic', {
    params: params,
  });
};
export const getMainList = (params, source) => {
  return axios.get('/api/monitor/companyList/xx', {
    params: params,
    cancelToken: source.token
  });
};
export const getRelList = (monitorId) => {
  return axios.get(`/api/monitor/${monitorId}/companyList`);
};
export const changeMonitorStatus = (params) => {
  const {monitorId, status} = params;
  return axios.put(`/api/monitor/${monitorId}/status`, {status});
};
export const recharge = (params) => {
  return axios.put(`/api/monitor/${params.rechargeId}/renewal`, {time: params.monitorTime});
};
