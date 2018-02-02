import axios from 'axios';

export const getRechargeList = (params) => {
  return axios.get('/api/external/client/recharge/record/list', {params});
};
