import axios from 'axios';

export const getAll = (params) => {
  return axios.get('/api/market/bidding/country', { params: params });
};

export const getInfo = (params) => {
  return axios.get('/api/market/bidding/area/info', { params: params });
};
