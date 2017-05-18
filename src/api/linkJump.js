import axios from 'axios';
// 公司跳转接口
export const getNameType = (params) => {
  return axios.get('/api/common/status', {params});
};
