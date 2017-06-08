import axios from 'axios';

// 获取核查人列表
export const getPersonCheckInfo = (params) => {
  return axios.get('/api/check/person/page', params);
};

// 核查个人黑名单
export const checkPersonInfo = (url, params) => {
  return axios.post(url, params);
};

// 获取明文身份证
export const getIdCard = (url) => {
  return axios.get(url);
};

// 获取个人黑名单姓名的列表
export const getPersonName = (url) => {
  return axios.get(url);
};
