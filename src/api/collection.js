import axios from 'axios';
// 获取收藏列表
export const getCollectionPage = (params) => {
  return axios.get(`/api/collection/page`, { params: params });
};

// 收藏或者取消收藏
/**
 * @param {collection    是否收藏  true or false
 *                companyName 公司名字
 * }
 */
export const toggleCollection = (params) => {
  return axios.put('/api/collection', params);
};
