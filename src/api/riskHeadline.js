import axios from 'axios';
// axios.post('/api/user/login', {
//   email: 'yadong.wu@sc.cn',
//   password: '25f9e794323b453885f5181f1b624d0b'
// });
export const getCompanyList = (dimGroupTypeStr, params) => {
  return axios.get(`/api/headline/xx/companyList?${dimGroupTypeStr}`, {params});
};
