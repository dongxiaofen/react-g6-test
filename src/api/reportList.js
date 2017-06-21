import axios from 'axios';

// 获取统计

export const getReportCount = () => {
  return axios.get(`/api/report/page/statistic`);
};

// 获取基础报告列表
export const getReportList = (activeKey, params) => {
  let url = '/api/basicReport/page';
  if (activeKey === 'advanced') {
    url = 'api/report/page';
  }
  return axios.get(url, {params: params});
};
