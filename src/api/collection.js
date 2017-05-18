import axios from 'axios';
// 获取收藏列表
export const getCollectionPage = (params) => {
  return axios.get(`/api/collection/page`, { params: params });
};

// 取消收藏
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
