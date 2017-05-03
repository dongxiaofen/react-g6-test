import axios from 'axios';

export const getReportList = (params) => {
  return axios.get(`/api/report/page`, {params: params});
};

export const getAnalysisReportList = (params) => {
  return axios.get(`/api/analysisReport/page`, { params: params });
};

export const updateToAnalysisReport = (reportId) => {
  return axios.put(`/api/report/${reportId}/upgrade/analysisReport`);
};

export const upGradeToMonitor = (reportId, status, selectValue) => {
  let url;
  if (status === 'report') {
    url = `/api/report/${reportId}/upgrade`;
  } else {
    url = `/api/analysisReport/${reportId}/upgrade`;
  }
  return axios.put(url, {time: selectValue});
};

