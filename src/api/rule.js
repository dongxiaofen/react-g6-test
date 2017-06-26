import axios from 'axios';
// 获取规则列表
export const getRuleList = (params) => {
  return axios.get('/api/rule/page', {params: params});
};
// 获取上级规则列表
export const getRuleShareList = (params) => {
  return axios.get('/api/rule/page/shared', {params: params});
};
// 关闭或开启规则
export const getRuleStatus = (params) => {
  return axios.put('/api/rule/' + params + '/status');
};
// 规则是否分享
export const getRuleShare = (params, share) => {
  return axios.put('/api/rule/' + params + '/share', share);
};
// 获取行业
export const getIndustryList = () => {
  return axios.get('/api/common/industry');
};
// 获取事件类型
export const getTypeList = (type) => {
  return axios.get('/api/rule/dimension?type=' + type);
};
// 监控公司列表
export const getMonitorCompany = (params) => {
  return axios.get('/api/rule/monitors', {params: params});
};
// 创建规则
export const createRule = (params) => {
  return axios.post('/api/rule', params);
};
