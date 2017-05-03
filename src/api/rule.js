import axios from 'axios';
export const getRuleList = (params) => {
  return axios.get('/api/rule/page', {params: params});
};
export const getRuleStatus = (params) => {
  return axios.put('/api/rule/' + params + '/status');
};
