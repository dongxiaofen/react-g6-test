import axios from 'axios';

// introduce
export const getInterfaceList = (params) => {
  return axios.get('/api/external/client/permission/list', {params});
};

export const getInterfaceType = () => {
  return axios.get('/api/external/client/permission/classification/list');
};
export const getMyInterface = () => {
  return axios.get('/api/external/client/permission/classification');
};

//detail
export const getInfoDetail = (id) => {
  return axios.get(`/api/external/client/permission/${id}`);
};
export const getInterfaceDoc = (urlName) => {
  return axios.get(`/api/external/client/open/${urlName}`);
};
export const getErrorDoc = () => {
  return axios.get('/api/external/client/error/doc');
};

// test
export const getApiKey = () => {
  return axios.get('/api/external/client/permission/apikey');
};

export const interfaceTest = (url, method, params, headerConfig, cancelToken) => {
  let handleAxios;
  switch (method) {
    case 'get':
      handleAxios = axios({
        method: method,
        url: url,
        params: params,
        headers: headerConfig,
        cancelToken: cancelToken
      });
      break;
    default:
      handleAxios = axios({
        method: method,
        url: url,
        data: params,
        headers: headerConfig,
        cancelToken: cancelToken
      });
  }
  return handleAxios;
};
