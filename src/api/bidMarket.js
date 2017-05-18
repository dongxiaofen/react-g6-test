import axios from 'axios';

export const getCountry = (params) => {
  return axios.get('/api/market/bidding/country', params);
};

export const getArea = (params) => {
  return axios.get('/api/market/bidding/area', params);
};

export const getTrend = (params) => {
  return axios.get('/api/market/bidding/trend', params);
};

export const getRank = (params) => {
  return axios.get('/api/market/bidding/area/rank', params);
};

export const getInfo = (params) => {
  return axios.get('/api/market/bidding/area/info', params);
};

export const getBidMarketDetail = (announceId) => {
  return axios.get(`/api/market/bidding/area/info/detail?announceId=${announceId}`);
};
