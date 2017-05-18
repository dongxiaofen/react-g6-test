import axios from 'axios';

export const getAssetLocal = (params) => {
  return axios.get('/api/market/asset/local', params);
};

export const getAssetTrend = (params) => {
  return axios.get('/api/market/asset/trend', params);
};
