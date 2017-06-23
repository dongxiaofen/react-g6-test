import axios from 'axios';

// 创建报告pdf
export const createPDF = (url) => {
  return axios.get(`${url}`);
};

// check报告pdf
export const checkPDF = (params) => {
  return axios.get('/pdfCheck', {params});
};
