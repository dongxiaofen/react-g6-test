import axios from 'axios';
const activeKeyMap = {
  multi: 'SCORE',
  profit: 'PROFIT',
  operate: 'OPRATION',
  develop: 'GROWING',
};
// 获取统计
export const getAnalysisCount = () => {
  return axios.get(`/api/analysisReport/page/statistic`);
};

// 获取基础报告列表
export const getAnalysisList = (activeKey, params) => {
  const url = `/api/analysisReport/page?dimension=${activeKeyMap[activeKey]}`;
  return axios.get(url, {params: params});
};
