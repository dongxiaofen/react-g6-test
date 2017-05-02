import axios from 'axios';
export const getBannerInfo = (monitorId, reportId, companyName, companyType) => {
  let url;
  if (monitorId) {
    url = `/api/monitor/${monitorId}/infobanner`;
  } else if (reportId) {
    url = `/api/report/infobanner?reportId=${reportId}`;
  } else if (companyType) {
    url = `/api/free/infobanner?companyName=${encodeURI(companyName)}`;
  } else {
    url = `/api/report/infobanner?companyName=${encodeURI(companyName)}`;
  }
  return axios.get(url);
};
export const toggleMonitorStatus = (monitorId, status) => {
  return axios.put(`/api/monitor/${monitorId}/status`, { status: status });
};
export const getReportModule = (module, monitorId, reportId, companyName, companyType, pagesInfo) => {
  let url;
  if (companyType === 'MAIN') {
    if (monitorId) {
      if (module === 'trademark' || module === 'patent' || module === 'bidding') {
        url = `/api/monitor/${monitorId}/operation/${module}${module === 'trademark' || module === 'patent' ? '?index=' + pagesInfo.index + '&limit=' + pagesInfo.size : ''}`;
      } else if (module === 'person/page') {
        url = `/api/monitor/${monitorId}/person/page?index=1&size=10`;
      } else {
        url = `/api/monitor/${monitorId}/${module}`;
      }
    } else if (reportId) {
      if (module === 'trademark' || module === 'patent' || module === 'bidding') {
        url = `/api/report/operation/${module}?reportId=${reportId}${module === 'patent' || module === 'trademark' ? '?index=' + pagesInfo.index + '&limit=' + pagesInfo.size : ''}`;
      } else if (module === 'person/page') {
        url = `/api/report/${reportId}/person/page?index=1&size=10`;
      } else {
        url = `/api/report/${module}?reportId=${reportId}`;
      }
    }
  } else if (companyType === 'ASSOCIATE') {
    url = `/api/monitor/${monitorId}/${module}`;
  } else if (companyType === 'FREE') {
    url = `/api/free/${module}?companyName=${encodeURI(companyName)}`;
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
export const getJudgeDetailMonitor = (monitorCompanyId, params)=> {
  return axios.get(`/api/monitor/${monitorCompanyId}/risk/judgeDoc`, {params});
};
export const getJudgeDetailReport = (params)=> {
  return axios.get(`/api/report/risk/judgeDoc`, {params});
};
export const getInternet = ({monitorId, reportId, companyName, companyType, params}, source) => {
  let url;
  if (companyType === 'MAIN') {
    if (monitorId) {
      url = `/api/monitor/${monitorId}/internet`;
    } else {
      url = `/api/report/internet?reportId=${reportId}`;
    }
  } else if (companyType === 'ASSOCIATE') {
    url = `/api/monitor/${monitorId}/internet`;
  } else if (companyType === 'FREE') {
    url = `/api/free/internet?companyName=${encodeURI(companyName)}`;
  }
  return axios.get(url, { cancelToken: source.token, params: params });
};
export const getNewsDetail = (url, source) => {
  return axios.get(url, {cancelToken: source.token});
};
export const getBiddingDetail = (url, source) => {
  return axios.get(url, {cancelToken: source.token});
};
export const getPersonCheckInfo = ({monitorId, params}) => {
  return axios.get(`/api/monitor/${monitorId}/person/page`, {params: params});
};
export const checkPersonInfo = (url, params) => {
  return axios.post(url, params);
};

export const changeAnnouncement = ({ stockType, monitorId, reportId }) => {
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
  return axios.get(url);
};
