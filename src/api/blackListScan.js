import axios from 'axios';

export function getStatus(reportId) {
  return axios.get(`/api/report/${reportId}/scan/risk/status`);
}
export function scanMain(reportId) {
  return axios.get(`/api/report/${reportId}/scan/risk/main`);
}
export function scanRelated(reportId) {
  return axios.get(`/api/report/${reportId}/scan/risk/related`);
}
export function scanNetwork(reportId) {
  return axios.get(`/api/report/${reportId}/scan/risk/network`);
}
