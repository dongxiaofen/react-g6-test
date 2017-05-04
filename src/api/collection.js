import axios from 'axios';

export const getCollectionPage = () => {
  return axios.get(`/api/collection/page`, {params: {index: 1, size: 10}});
};

export const cancelCollection = (id, productType) => {
  let url;
  switch (productType) {
    case 'REPORT':
      url = `/api/report/${id}/collection`;
      break;
    case 'ANALYSIS_REPORT':
      url = `/api/analysisReport/${id}/collection`;
      break;
    case 'MONITOR':
      url = `/api/monitor/${id}/collection`;
      break;
    default:
      break;
  }
  return axios.put(url, { collection: false });
};
