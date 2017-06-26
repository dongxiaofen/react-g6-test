import axios from 'axios';
export const getBannerInfo = (params) => {
  return axios.get(`/api/common/bannerInfo`, { params });
};

// 获取上市代码，检查该公司是否是上市公司
export const getStockCode = ({ reportId, monitorId }) => {
  let url;
  if (reportId) {
    url = `/api/report/${reportId}/stockCode`;
  }
  if (monitorId) {
    url = `/api/monitor/${monitorId}/stockCode`;
  }
  return axios.get(url);
};

export const toggleMonitorStatus = (monitorId, status) => {
  return axios.put(`/api/monitor/${monitorId}/status`, { status: status });
};
export const getReportModule = (urlStr, idParams, params) => {
  const basicUrl = `/api/basicReport/${idParams.basicReportId}/`;
  const advancedUrl = `/api/report/${idParams.reportId}/`;
  const analysisUrl = `/api/analysisReport/${idParams.analysisReportId}/`;
  const monitorUrl = `/api/monitor/${idParams.monitorId}/`;
  const reportUrl = idParams.reportId ? advancedUrl : basicUrl;
  let url;
  switch (urlStr) {
    case 'corpDetail':
    case 'stock/company':
    case 'stock/announcement':
    case 'stock/announcement/type':
    case 'internet':
    case 'operation/trademark':
    case 'operation/patent':
    case 'operation/bidding':
    case 'team':
    case 'investment':
    case 'taxation':
    case 'risk':
    case 'risk/check':
    case 'risk/pledge':
    case 'network':
    case 'network/blacklist':
    case 'timeline':
    case 'alert/page':
      url = reportUrl + urlStr;
      break;
    case 'score':
    case 'profit':
    case 'operate':
    case 'growing':
      url = analysisUrl + urlStr;
      break;
    case 'monitorTimeAxis':
      url = monitorUrl + 'timeline';
      break;
    case 'monitorAlert':
      url = monitorUrl + 'alert/page';
      break;
    default:
      return false;
  }
  // 设置axios取消事件
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  if (window.reportSourceCancel === undefined) {
    window.reportSourceCancel = [];
  }
  window.reportSourceCancel.push(source.cancel);
  return axios.get(url, { cancelToken: source.token, params});
};

export const getRiskCourt = ({ basicReportId, reportId, tabAct, config }) => {
  let url = '';
  if (basicReportId) {
    url = `/api/basicReport/${basicReportId}/risk/${tabAct}/page`;
  }
  if (reportId) {
    url = `/api/report/${reportId}/risk/${tabAct}/page`;
  }
  return axios.get(url, config);
};

export const getJudgeDetailMonitor = (monitorCompanyId, params) => {
  return axios.get(`/api/monitor/${monitorCompanyId}/risk/judgeDoc`, { params });
};
export const getJudgeDetailReport = (idParams, params) => {
  const {reportId, basicReportId} = idParams;
  if (reportId !== '') {
    return axios.get(`/api/report/${reportId}/risk/judgeDoc`, { params });
  }
  return axios.get(`/api/basicReport/${basicReportId}/risk/judgeDoc`, { params });
};
export const getNewsDetail = (url, source) => {
  return axios.get(url, { cancelToken: source.token });
};
export const getBiddingDetail = (url, source) => {
  return axios.get(url, { cancelToken: source.token });
};

// 刷新基础报告
export const updateBasicRep = (basicReportId) => {
  return axios.put(`/api/basicReport/${basicReportId}`);
};
// 获取基础报告的刷新时间
export const getBasicRepInfo = (basicReportId) => {
  return axios.get(`/api/basicReport/${basicReportId}/info`);
};
// 刷新高级报告
export const updateReport = (reportId) => {
  return axios.put(`/api/report/${reportId}`);
};
// 获取高级报告的刷新时间
export const getReportInfo = (reportId) => {
  return axios.get(`/api/report/${reportId}/info`);
};
export const getMonitorInfo = (monitorId) => {
  return axios.get(`/api/monitor/${monitorId}/info`);
};
// 创建高级报告或者深度报告
export const createReport = (active, companyName) => {
  let url;
  // 1为高级报告
  if (active === 1) {
    url = '/api/report';
  } else {
    url = '/api/analysisReport';
  }
  return axios.post(url, { companyName: companyName });
};

// 创建监控
export const createMonitor = (params) => {
  return axios.post(`/api/monitor`, params);
};

// 升级监控
export const updateToMonitor = ({ reportId, time }) => {
  let url;
  const params = { time: time };
  if (reportId) {
    url = `/api/report/${reportId}/upgrade`;
    params.reportId = reportId;
  }
  return axios.put(url, params);
};

// 监控续期
export const renewalMonitor = (monitorId, time) => {
  return axios.put(`/api/monitor/${monitorId}/renewal`, { time: time });
};

// 暂停或恢复监控
export const pauseOrRestoreMonitor = (monitorId, status) => {
  return axios.put(`/api/monitor/${monitorId}/status`, { status: status });
};

// 添加/删除收藏
export const addOrCancelCollection = (params) => {
  return axios.put('/api/collection', params);
};


// 获取评估分析列表
export const getAlertAnalysisList = (monitorId, analysisReportId, params, source) => {
  let url;
  if (monitorId) {
    url = `/api/monitor/${monitorId}/alert/page`;
  } else if (analysisReportId) {
    url = `/api/analysisReport/${analysisReportId}/alert/page`;
  }
  return axios.get(url, { params: params, cancelToken: source.token });
};
// 获取评估分析列表详情
export const getAlertDetail = (url, source, params) => {
  return axios.get(url, { cancelToken: source.token, params });
};
export const getAlertNewsMonitor = (companyId, ruleType, ruleId, params) => {
  return axios.get(`/api/monitor/${companyId}/alert/${ruleType}/${ruleId}/news/detail`, { params });
};
export const getAlertJudgeDocMonitor = (companyId, params) => {
  return axios.get(`/api/monitor/${companyId}/risk/judgeDoc`, { params });
};
export const getAlertNewsReport = (companyId, ruleId, params) => {
  return axios.get(`/api/report/${companyId}/alert/sysRule/${ruleId}/news/detail`, { params });
};
export const getAlertJudgeDocReport = (companyId, params) => {
  return axios.get(`/api/report/${companyId}/risk/judgeDoc`, { params });
};
// 判断企业报告类型
export const judgeReportType = (companyName) => {
  return axios.get(`/api/common/status?companyName=${companyName}`);
};

// 关联图上创建关联监控
export const monitorExistNode = (monitorCompanyId, params) => {
  return axios.post(`/api/monitor/${monitorCompanyId}/network/link`, params);
};

// 现勘记录
export const getNowRecordList = (companyId, params, source) => {
  return axios.get('/api/survey/' + companyId + '/page', { params: params, cancelToken: source.token });
};
export const getNowRecordPictures = (id, source) => {
  return axios.get('/api/survey/' + id + '/pictures', { cancelToken: source.token });
};
// 报告时间轴详情
export const getReportAxisDetail = (reportId, key, time, relation, source) => {
  const module = key === 'legal' ? 'risk' : key;
  return axios.get(`/api/report/${reportId}/timeline/${relation === 'related' ? `related/${module}` : module}?date=${time}`, { cancelToken: source.token });
};
// 监控时间轴详情
export const getMonitorAxisDetail = (monitorId, key, time, relation, source) => {
  const module = key === 'legal' ? 'risk' : key;
  return axios.get(`/api/monitor/${monitorId}/timeline/${relation === 'related' ? `related/${module}` : module}?date=${time}`, { cancelToken: source.token });
};
// 税务核查列表
export const getTaxCheckList = (params, source) => {
  return axios.get('/api/check/tax/page', {params: params, cancelToken: source.token});
};

// 全网关系图拓展节点
export const expandNetwork = (monitorCompanyId, params) => {
  return axios.post(`/api/monitor/${monitorCompanyId}/expendNetwork/expend`, params);
};
// 税务核查添加
export const addTaxCheck = (params) => {
  return axios.post(`api/check/tax`, params);
};
// 获取核查详情
export const getTaxInfo = (companyId) => {
  return axios.get(`/api/check/tax/${companyId}/page`);
};
// 税务列表
export const getTaxList = (id, source) => {
  return axios.get('/api/monitor/' + id + '/tax', { cancelToken: source.token });
};
// 关联图,获取最短路径
export const getShortPath = (monitorId, params) => {
  return axios.post(`/api/monitor/${monitorId}/expendNetwork/shortestRoute`, params);
};
// 关联图,获取公司信息
export const getCompNodeInfo = (monitorId, params) => {
  return axios.get(`/api/monitor/${monitorId}/expendNetwork/nodeInfo`, { params });
};
// 六芒星
export const getSixStar = (id, source) => {
  return axios.get('/api/monitor/' + id + '/alert/score', { cancelToken: source.token });
};
// 关联图,获取个人信息
export const getPersonNodeInfo = (monitorId, params) => {
  return axios.get(`/api/monitor/${monitorId}/expendNetwork/personInfo`, { params });
};
// 获取营运能力信息
export const getOperationDataList = (analysisReportId) => {
  return axios.get(`/api/analysisReport/${analysisReportId}/operation`);
};
// 获取营收能力信息
export const getProfitEvalList = (analysisReportId) => {
  return axios.get(`/api/analysisReport/${analysisReportId}/profit`);
};
// 获取成长能力能力信息
export const getUpDataList = (analysisReportId) => {
  return axios.get(`/api/analysisReport/${analysisReportId}/growing`);
};
// 获取综合能力分析(企业分数)
export const getCompanyScore = (analysisReportId) => {
  return axios.get(`/api/analysisReport/${analysisReportId}/score`);
};
// 贷中分析,创建报告
export const createAnalyRep = (params) => {
  return axios.post('/api/analysisReport', params);
};
// 贷前基础报告,升级
export const upgradeReport = (basicReportId) => {
  return axios.put(`/api/basicReport/${basicReportId}/upgradeReport`);
};
// 获取报告的id
export const getReportStatus = (params) => {
  return axios.get(`/api/common/status`, { params });
};
// 创建基础报告
export const createBasicReport = (params) => {
  return axios.post(`/api/basicReport`, params);
};

// 后台是否已完成
export const isCompleted = ({basicReportId, reportId}) => {
  let url;
  if (basicReportId) {
    url = `/api/basicReport/${basicReportId}/completed`;
  } else if (reportId) {
    url = `/api/report/${reportId}/completed`;
  }
  return axios.get(url);
};
