import axios from 'axios';

// 我的预警统计
export const ownWarningStatistics = () => {
  return axios.get('/api/user/index/xx/own/statistic');
};

// 子子账号预警统计
export const subWarningStatistics = () => {
  return axios.get('/api/user/index/xx/sub/statistic');
};

// 我的最新预警企业
export const ownNewest = () => {
  return axios.get('/api/user/index/xx/own/newest10');
};

// 下属预警企业
export const subNewest = () => {
  return axios.get('/api/user/index/xx/sub/newest10');
};

// 我的风险企业
export const ownHightRisk = () => {
  return axios.get('/api/user/index/xx/own/hightRisk10');
};

// 下属风险企业
export const subHightRisk = () => {
  return axios.get('/api/user/index/xx/sub/hightRisk10');
};

// 我的综合评分
export const ownLowestScore = () => {
  return axios.get('/api/user/index/xx/own/lowestScore10');
};

// 下属综合评分
export const subLowestScore = () => {
  return axios.get('/api/user/index/xx/sub/lowestScore10');
};

// 下属最新预警账号
export const subWorningAccount10 = () => {
  return axios.get('/api/user/index/xx/sub/account10');
};

// 下属最新命中规则
export const subNewestRule = () => {
  return axios.get('/api/user/index/xx/sub/newestRule');
};
