import axios from 'axios';
// 获取规则列表
export const getRuleList = (params) => {
  return axios.get('/api/rule/xx/page', {params: params});
};
// 关闭或开启规则
export const getRuleStatus = (params) => {
  return axios.put('/api/rule/' + params + '/status');
};
// 获取行业
export const getIndustryList = () => {
  return axios.get('/api/monitor/industry');
};
// 获取事件类型
export const getTypeList = (type) => {
  return axios.get('/api/rule/dimension?type=' + type);
};
// 监控公司列表
export const getMonitorCompany = (params) => {
  return axios.get('/api/rule/xx/monitors', {params: params});
};
// 提交创建监控
export const createRule = (params) => {
  return axios.post('/api/rule/xx', params);
};
