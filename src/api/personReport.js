import axios from 'axios';

export const getDetailInfo = (url, params) => {
  return axios.get(url, {params});
};
export const getCardId = (url, params) => {
  return axios.get(url, {params});
};
