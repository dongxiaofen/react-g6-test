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

// test
export const getApiKey = () => {
  return axios.get('/api/external/client/permission/apikey');
};

export const interfaceTest = (url, method, params, headerConfig) => {
  return axios({
    method: method,
    url: url,
    params: params,
    headers: headerConfig
  });
};
