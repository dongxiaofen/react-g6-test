import axios from 'axios';

export const getConsumptionList = (params) => {
  return axios.get('/api/external/client/consume/record/list', {params});
};
