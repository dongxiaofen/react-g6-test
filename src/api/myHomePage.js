import axios from 'axios';

export const setMyHomePageStatistic = () => {
  return axios.get('/api/user/index/statistic');
};
export const setMyHomePageAlert = (params) => {
  return axios.get('/api/user/index/alert', {params: params});
};


