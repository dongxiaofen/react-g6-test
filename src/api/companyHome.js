import axios from 'axios';
export const getBannerInfo = ({
  monitorId,
  reportId,
  analysisReportId,
  companyName,
  companyType
}) => {
  let url;
  if (monitorId) {
    url = `/api/monitor/${monitorId}/infobanner/xx`;
  } else if (reportId) {
    url = `/api/report/infobanner?reportId=${reportId}`;
  } else if (analysisReportId) {
    url = `/api/analysisReport/infobanner?analysisReportId=${analysisReportId}`;
  } else if (companyType === 'FREE') {
    url = `/api/free/xx/infobanner?companyName=${encodeURI(companyName)}`;
  }
  return axios.get(url);
};

// 获取上市代码，检查该公司是否是上市公司
export const getStockCode = ({ reportId, monitorId, analysisReportId }) => {
  let url;
  if (reportId) {
    url = `/api/report/${reportId}/stockCode`;
  }
  if (monitorId) {
    url = `/api/monitor/${monitorId}/stockCode`;
  }
  if (analysisReportId) {
    url = `/api/analysisReport/${analysisReportId}/stockCode`;
  }
  return axios.get(url);
};

export const toggleMonitorStatus = (monitorId, status) => {
  return axios.put(`/api/monitor/${monitorId}/status`, { status: status });
};
export const getReportModule = (params) => {
  const { module, monitorId, reportId, analysisReportId, companyName, companyType, pagesInfo } = params;
  let url;
  if (companyType === 'MAIN') {
    if (monitorId) {
      if (module === 'trademark' || module === 'patent' || module === 'bidding') {
        url = `/api/monitor/${monitorId}/operation/${module}${module === 'trademark' || module === 'patent' ? '?index=' + pagesInfo.index + '&limit=' + pagesInfo.size : ''}`;
      } else if (module === 'person/page') {
        url = `/api/monitor/${monitorId}/person/page?index=1&size=10`;
      } else if (module === 'blackNetwork') {
        url = `/api/monitor/${monitorId}/network/blacklist`;
      } else if (module === 'forceNetwork') {
        url = `/api/monitor/${monitorId}/expendNetwork`;
      } else {
        url = `/api/monitor/${monitorId}/${module}`;
      }
    } else if (reportId) {
      if (module === 'trademark' || module === 'patent' || module === 'bidding') {
        url = `/api/report/operation/${module}?reportId=${reportId}${module === 'patent' || module === 'trademark' ? '&index=' + pagesInfo.index + '&limit=' + pagesInfo.size : ''}`;
      } else if (module === 'person/page') {
        url = `/api/report/${reportId}/person/page?index=1&size=10`;
      } else if (module === 'blackNetwork') {
        url = `/api/report/network/blacklist?reportId=${reportId}`;
      } else if (module === 'forceNetwork') {
        url = `/api/report/expendNetwork?reportId=${reportId}`;
      } else {
        url = `/api/report/${module}?reportId=${reportId}`;
      }
    } else if (analysisReportId) {
      if (module === 'trademark' || module === 'patent' || module === 'bidding') {
        url = `/api/analysisReport/operation/${module}?analysisReportId=${analysisReportId}${module === 'patent' || module === 'trademark' ? '&index=' + pagesInfo.index + '&limit=' + pagesInfo.size : ''}`;
      } else if (module === 'person/page') {
        url = `/api/analysisReport/${analysisReportId}/person/page?index=1&size=10`;
      } else if (module === 'blackNetwork') {
        url = `/api/analysisReport/network/blacklist?analysisReportId=${analysisReportId}`;
      } else if (module === 'forceNetwork') {
        url = `/api/analysisReport/expendNetwork?analysisReportId=${analysisReportId}`;
      } else {
        url = `/api/analysisReport/${module}?analysisReportId=${analysisReportId}`;
      }
    }
  } else if (companyType === 'ASSOCIATE') {
    url = `/api/monitor/${monitorId}/${module}`;
  } else if (companyType === 'FREE') {
    url = `/api/free/xx/${module}?companyName=${encodeURI(companyName)}`;
  }
  // 设置axios取消事件
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  if (window.reportSourceCancel === undefined) {
    window.reportSourceCancel = [];
  }
  window.reportSourceCancel.push(source.cancel);
  return axios.get(url, { cancelToken: source.token });
};
export const getJudgeDetailMonitor = (monitorCompanyId, params) => {
  return axios.get(`/api/monitor/${monitorCompanyId}/risk/judgeDoc`, { params });
};
export const getJudgeDetailReport = (params) => {
  return axios.get(`/api/report/risk/judgeDoc`, { params });
};
export const getInternet = ({ monitorId, analysisReportId, reportId, companyName, companyType, params }, source) => {
  let url;
  if (companyType === 'MAIN') {
    if (monitorId) {
      url = `/api/monitor/${monitorId}/internet`;
    } else if (analysisReportId) {
      url = `/api/analysisReport/internet?analysisReportId=${analysisReportId}`;
    } else {
      url = `/api/report/internet?reportId=${reportId}`;
    }
  } else if (companyType === 'ASSOCIATE') {
    url = `/api/monitor/${monitorId}/internet`;
  } else if (companyType === 'FREE') {
    url = `/api/free/xx/internet?companyName=${encodeURI(companyName)}`;
  }
  return axios.get(url, { cancelToken: source.token, params: params });
};
export const getNewsDetail = (url, source) => {
  return axios.get(url, { cancelToken: source.token });
};
export const getBiddingDetail = (url, source) => {
  return axios.get(url, { cancelToken: source.token });
};
export const getPersonCheckInfo = ({ monitorId, reportId, analysisReportId, params, source }) => {
  if (monitorId) {
    return axios.get(`/api/monitor/${monitorId}/person/page`, { params: params, cancelToken: source.token });
  } else if (reportId) {
    return axios.get(`/api/report/${reportId}/person/page`, { params: params, cancelToken: source.token });
  } else if (analysisReportId) {
    return axios.get(`/api/analysisReport/${analysisReportId}/person/page`, { params: params, cancelToken: source.token });
  }
};
export const checkPersonInfo = (url, params) => {
  return axios.post(url, params);
};
export const getIdCard = (url) => {
  return axios.get(url);
};
export const changeAnnouncement = ({ stockType, monitorId, reportId, analysisReportId }) => {
  let url;
  if (monitorId) {
    if (stockType) {
      url = `/api/monitor/${monitorId}/stock/announcement?stockType=${stockType}`;
    } else {
      url = `/api/monitor/${monitorId}/stock/announcement`;
    }
  }
  if (reportId) {
    if (stockType) {
      url = `/api/report/stock/announcement?reportId=${reportId}&stockType=${stockType}`;
    } else {
      url = `/api/report/stock/announcement?reportId=${reportId}`;
    }
  }
  if (analysisReportId) {
    if (stockType) {
      url = `/api/analysisReport/stock/announcement?analysisReportId=${analysisReportId}&stockType=${stockType}`;
    } else {
      url = `/api/analysisReport/stock/announcement?analysisReportId=${analysisReportId}`;
    }
  }
  return axios.get(url);
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

// 高级查询报告升级为深度分析报告
export const updateToAnalysisReport = (reportId) => {
  return axios.put(`/api/report/${reportId}/upgrade/analysisReport`, { reportId: reportId });
};

// 刷新高级报告或者深度报告
export const refreshHighOrDeep = (reportId, analysisReportId) => {
  const url = analysisReportId
    ? `/api/analysisReport/${analysisReportId}`
    : `/api/report/${reportId}`;
  return axios.put(url);
};

// 创建监控
export const createMonitor = (params) => {
  return axios.post(`/api/monitor`, params);
};

// 升级监控
export const updateToMonitor = ({ reportId, analysisReportId, time }) => {
  let url;
  const params = { time: time };
  if (reportId) {
    url = `/api/report/${reportId}/upgrade`;
    params.reportId = reportId;
  }
  if (analysisReportId) {
    url = `/api/analysisReport/${analysisReportId}/upgrade`;
    params.analysisReportId = analysisReportId;
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
export const addOrCancelCollection = ({ reportId, analysisReportId, monitorId, params }) => {
  let url;
  if (reportId) {
    url = `/api/report/${reportId}/collection`;
  }
  if (analysisReportId) {
    url = `/api/analysisReport/${analysisReportId}/collection`;
  }
  if (monitorId) {
    url = `/api/monitor/${monitorId}/collection`;
  }
  return axios.put(url, params);
};

// 获取核查人的列表
export const getPersonName = (url) => {
  return axios.get(url);
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
export const getAlertDetail = (url, source) => {
  return axios.get(url, { cancelToken: source.token });
};
export const getAlertNewsMonitor = (companyId, params) => {
  return axios.get(`/api/monitor/${companyId}/internet/detail`, { params });
};
export const getAlertJudgeDocMonitor = (companyId, params) => {
  return axios.get(`/api/monitor/${companyId}/risk/judgeDoc`, { params });
};
export const getAlertNewsReport = (params) => {
  return axios.get('/api/analysisReport/internet/detail', { params });
};
export const getAlertJudgeDocReport = (params) => {
  return axios.get('/api/analysisReport/risk/judgeDoc', { params });
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
export const getNowRecordList = (id, params, source) => {
  return axios.get('/api/survey/' + id + '/page', {params: params, cancelToken: source.token});
};
export const getNowRecordPictures = (id, source) => {
  return axios.get('/api/survey/' + id + '/pictures', { cancelToken: source.token });
};

// 税务核查列表
export const getTaxCheckList = (id, params, source) => {
  return axios.get('/api/monitor/' + id + '/taxCheck/page', {params: params, cancelToken: source.token});
};

// 税务列表
export const getTaxList = (id, source) => {
  return axios.get('/api/monitor/' + id + '/tax', {cancelToken: source.token});
};
