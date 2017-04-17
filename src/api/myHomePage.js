import axios from 'axios';

export const getMyHomePageStatistic = () => {
  return axios.get('/api/user/index/statistic');
};
export const getMyHomePageAlert = (params) => {
  return axios.get('/api/user/index/alert', {params: params});
};


