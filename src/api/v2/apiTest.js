import axios from 'axios';

export const getAssortmentC1 = () => {
  return axios.get('/api/v2/client/permission/assortment/c1/all');
};

export const getAssortmentC2 = (params) => {
  return axios.get('/api/v2/client/permission/assortment/c2/all', {params});
};

export const getApiList = (classificationId) => {
  return axios.get(`/api/v2/client/permission/${classificationId}/list`);
};

export const getApiInfo = (apiId) => {
  return axios.get(`/api/v2/client/permission/${apiId}`);
};

export const getApiKey = () => {
  return axios.get('/api/v2/client/permission/apikey');
};

export const getScToken = (params) => {
  return axios.post('/api/v2/sc/token', params);
};

export const interfaceTest = (url, method, params, headerConfig) => {
  let handleAxios;
  switch (method) {
    case 'get':
      handleAxios = axios({
        method: method,
        url: url,
        params: params,
        headers: headerConfig,
        // cancelToken: cancelToken
      });
      break;
    default:
      handleAxios = axios({
        method: method,
        url: url,
        data: params,
        headers: headerConfig,
        // cancelToken: cancelToken
      });
  }
  return handleAxios;
};
