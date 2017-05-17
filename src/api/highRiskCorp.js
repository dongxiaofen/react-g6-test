import axios from 'axios';

export const getStatistic = () => {
  return axios.get('/api/market/blacklist/statistic');
};
export const getIndustry = (params) => {
  return axios.get(`/api/market/blacklist/industry`, {params: params});
};
export const getRecent = (params) => {
  return axios.get(`/api/market/blacklist/recent`, {params: params});
};
export const getIncrement = (params) => {
  return axios.get(`/api/market/blacklist/monthlyIncrement`, {params: params});
};
export const getArea = (params) => {
  return axios.get(`/api/market/blacklist/areaDistribution`, {params: params});
};
