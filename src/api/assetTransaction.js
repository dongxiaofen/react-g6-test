import axios from 'axios';

// 获取本地资产
export const getAssetLocal = (params) => {
  return axios.get('/api/market/asset/local', params);
};

// 获取本地资产详情
export const getAssetLocalDetail = (params) => {
  return axios.get('/api/market/asset/detail', {params: params});
};

// 获取交易趋势
export const getAssetTrend = (params) => {
  return axios.get('/api/market/asset/trend', params);
};

// 获取地域分布
export const getAreaDistribution = (params) => {
  return axios.get('/api/market/asset/areaDistribution', params);
};

// 获取地域分布详情
export const getAreaDistributionDetail = (params) => {
  return axios.get('/api/market/asset/areaDistribution/detail', params);
};
