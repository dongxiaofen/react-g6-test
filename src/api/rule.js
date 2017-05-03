import axios from 'axios';
// 获取规则列表
export const getRuleList = (params) => {
  return axios.get('/api/rule/page', {params: params});
};
// 关闭或开启规则
export const getRuleStatus = (params) => {
  return axios.put('/api/rule/' + params + '/status');
};
// 获取行业
export const getIndustryList = () => {
  return axios.get('/api/monitor/industry');
};
