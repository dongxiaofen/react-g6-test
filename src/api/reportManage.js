import axios from 'axios';

// 获取报告列表
export const getReportList = (params) => {
  return axios.get(`/api/report/page`, {params: params});
};

// 升级到监控
export const upGradeToMonitor = (reportId, selectValue) => {
  return axios.put(`/api/report/${reportId}/upgrade`, {time: selectValue});
};
