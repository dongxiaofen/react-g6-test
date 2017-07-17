import axios from 'axios';

export function getStatus(reportId, source) {
  return axios.get(`/api/report/${reportId}/scan/risk/status`, {
    cancelToken: source.token
  });
}
export function scanMain(reportId, source) {
  return axios.get(`/api/report/${reportId}/scan/risk/main`, {
    cancelToken: source.token
  });
}
export function scanRelated(reportId, source) {
  return axios.get(`/api/report/${reportId}/scan/risk/related`, {
    cancelToken: source.token
  });
}
export function scanNetwork(reportId, source) {
  return axios.get(`/api/report/${reportId}/scan/risk/network`, {
    cancelToken: source.token
  });
}
