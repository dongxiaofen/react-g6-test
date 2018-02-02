import axios from 'axios';

export const getConsumptionList = (params) => {
  return axios.get('/api/v2/external/client/record/consume/list', {params});
};
