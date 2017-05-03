import axios from 'axios';

export const getReportList = (params) => {
  return axios.get(`/api/report/page`, {params: params});
};

export const getAnalysisReportList = (params) => {
  return axios.get(`/api/analysisReport/page`, { params: params });
};

export const upGradeToMonitor = (reportId, selectValue) => {
  return axios.put(`/api/report/${reportId}/upgrade`, {time: selectValue});
};

