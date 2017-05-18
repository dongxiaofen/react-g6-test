import axios from 'axios';

export const getAssetTrend = (params) => {
  return axios.get('/api/market/asset/trend', params);
};
