import axios from 'axios';

export const getReportList = (params) => {
  return axios.get(`/api/report/page`, {params: params})
};
