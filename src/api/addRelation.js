import axios from 'axios';
export const addRelation = (monitorId, params) => {
  return axios.post(`/api/monitor/${monitorId}/network/link`, params);
};
