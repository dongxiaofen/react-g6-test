import axios from 'axios';

export const getApiList = (classificationId) => {
  return axios.get(`/api/v2/external/client/permission/${classificationId}/list`);
};

export const getApiDoc = (docName) => {
  return axios.get(`/api/v2/external/client/open/${docName}`);
};

export const getErrorCode = () => {
  return axios.get('/api/v2/external/client/error/doc');
};
