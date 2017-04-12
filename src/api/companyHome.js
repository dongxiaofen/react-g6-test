import axios from 'axios';
export const getBannerInfo = (monitorId, reportId, companyName, companyType) => {
  axios.post('/api/user/login', {
    email: 'yadong.wu@sc.cn',
    password: '25f9e794323b453885f5181f1b624d0b'
  });
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
  return axios.put(`/api/monitor/${monitorId}/status`, {status: status});
};
