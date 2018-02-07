import axios from 'axios';

export const getApiList = (classificationId) => {
  return axios.get(`/api/v2/client/permission/${classificationId}/list`);
};

export const getApiDoc = (docName) => {
  return axios.get(`/api/v2/client/open/${docName}`);
};

export const getErrorCode = () => {
  return axios.get('/api/v2/client/error/doc');
};
