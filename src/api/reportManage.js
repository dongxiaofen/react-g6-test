import axios from 'axios';

// 获取报告列表
export const getReportList = (params) => {
  return axios.get(`/api/report/page`, {params: params});
};

// 获取深度报告列表
export const getAnalysisReportList = (params) => {
  return axios.get(`/api/analysisReport/page`, { params: params });
};

// 升级到深度报告
export const updateToAnalysisReport = (reportId) => {
  return axios.put(`/api/report/${reportId}/upgrade/analysisReport`);
};

// 升级到监控
export const upGradeToMonitor = (reportId, status, selectValue) => {
  let url;
  if (status === 'report') {
    url = `/api/report/${reportId}/upgrade`;
  } else {
    url = `/api/analysisReport/${reportId}/upgrade`;
  }
  return axios.put(url, {time: selectValue});
};
