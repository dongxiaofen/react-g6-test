import axios from 'axios';

// 我的预警统计
export const ownWarningStatistics = () => {
  return axios.get('/api/user/index/own/statistic');
};

// 子子账号预警统计
export const subWarningStatistics = () => {
  return axios.get('/api/user/index/sub/statistic');
};

// 我的最新预警企业
export const ownNewest = () => {
  return axios.get('/api/user/index/own/newest10');
};

// 下属预警企业
export const subNewest = () => {
  return axios.get('/api/user/index/sub/newest10');
};

// 我的风险企业
export const ownHightRisk = () => {
  return axios.get('/api/user/index/own/highRisk10');
};

// 下属风险企业
export const subHightRisk = () => {
  return axios.get('/api/user/index/sub/highRisk10');
};

// 我的综合评分
export const ownLowestScore = () => {
  return axios.get('/api/user/index/own/lowestScore10');
};

// 下属综合评分
export const subLowestScore = () => {
  return axios.get('/api/user/index/sub/lowestScore10');
};

// 下属最新预警账号
export const subWorningAccount10 = () => {
  return axios.get('/api/user/index/sub/account10');
};

// 下属最新命中规则
export const subNewestRule = () => {
  return axios.get('/api/user/index/sub/newestRule');
};


// 下属子账号最活跃规则
export const frequentRule = () => {
  return axios.get('/api/user/index/sub/frequentRule');
};
// 我的新增业务统计
export const getMyNewBusinessData = () => {
  return axios.get('/api/user/index/own/increase');
};

// 我的地域分布
export const getMyProvinceRank = () => {
  return axios.get('/api/user/index/own/province');
};

// 我的地域分布
export const getMyIndustryDist = () => {
  return axios.get('/api/user/index/own/industry');
};

// 下属新增业务统计
export const getSubNewBusinessData = () => {
  return axios.get('/api/user/index/sub/increase');
};

// 下属地域分布
export const getSubProvinceRank = () => {
  return axios.get('/api/user/index/sub/province');
};

// 下属行业分布
export const getSubIndustryDist = () => {
  return axios.get('/api/user/index/sub/industry');
};

