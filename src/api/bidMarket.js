import axios from 'axios';

export const getAll = (params) => {
  return axios.get('/api/market/bidding/country', { params: params });
};

export const getTrend = (params) => {
  return axios.get('/api/market/bidding/trend', { params: params });
};

export const getRank = (params) => {
  return axios.get('/api/market/bidding/area/rank', { params: params });
};

export const getInfo = (params) => {
  return axios.get('/api/market/bidding/area/info', { params: params });
};

export const getBidMarketDetail = (announceId) => {
  return axios.get(`/api/market/bidding/area/info/detail?announceId=${announceId}`);
};
