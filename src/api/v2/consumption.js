import axios from 'axios';

export const getConsumptionList = (params) => {
  return axios.get('/api/v2/client/record/consume/list', {params});
};
