import axios from 'axios';

// 头条顶部的四个板块
export function getStatistic(params) {
  return axios.get('/api/riskBoard/statistic', params);
}

// 变化趋势
export function getChangeTrend(params) {
  return axios.get('/api/riskBoard/changeTrend', params);
}

// 获取所有地区分布
export function getProvinceAll(params) {
  return axios.get('/api/riskBoard/distribution/province/all', params);
}

// 获取选定区域的数据
export function getProvince(params) {
  return axios.get('/api/riskBoard/distribution/province', params);
}

// 行业统计
export function getIndustryStatistics(params) {
  return axios.get('/api/riskBoard/industry/statistic', params);
}

// 行业趋势
export function getIndustryTrend(params) {
  return axios.get('/api/riskBoard/industry/trend', params);
}

// 来源分析(最下面的图表)
export function getHeadlines(params) {
  return axios.get('/api/riskBoard/source', params);
}
