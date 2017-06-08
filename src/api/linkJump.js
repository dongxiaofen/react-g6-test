import axios from 'axios';
// 公司跳转接口
export const getNameType = (params) => {
  return axios.get('/api/common/status/xx', {params});
};
// 公司是否存在
export const getCompanyExist = (params) => {
  return axios.get('api/common/exist', {params});
};
