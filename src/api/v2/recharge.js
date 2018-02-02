import axios from 'axios';

export const getRechargeList = (params) => {
  return axios.get('/api/v2/external/client/record/recharge/list', {params});
};
