import axios from 'axios';

// 创建报告pdf
export const createPDF = (url) => {
  return axios.get(`${url}`);
};

// check报告pdf
export const checkPDF = (params) => {
  return axios.get('/pdfCheck', {params});
};

// pdf下载API
// export const pdfDownload = (backendApi, urlPanth, params) => {
//   let count = 0;
//   const responseData = {
//     summary: '',
//     report: '',
//     company: '',
//     announcement: '',
//     courtData: '',
//     internet: '',
//     trademark: '',
//     patent: '',
//     bidding: '',
//     network: '',
//     blacklist: '',
//     team: '',
//     corpCheckData: '',
//     entinvItemList: '',
//     frData: '',
//     shares: '',
//     managements: '',
//     taxList: '',
//     star: '',
//     growing: '',
//     operation: '',
//     profit: ''
//   };
//   const response = [
//     {'type': 'SUMMERY', 'fn': (param) => {
//       axios.get(backendApi + urlPanth, {param})
//         .then(({data}) => {
//           responseData.banner = data.banner;
//           responseData.companyName = data.companyName;
//           responseData.summary = data.summary;
//           ++count;
//         })
//         .catch((err) => {
//           console.log(err.response.data);
//         })
//     }},
//     {'type': 'CORP_BASIC', 'fn': (backendApi, urlPanth, param) => {
//       axios.get(backendApi + urlPanth, {param})
//         .then(({data}) => {
//           responseData.banner = data.banner;
//           responseData.companyName = data.companyName;
//           responseData.report = data.corpDetail;
//           ++count;
//         })
//         .catch((err) => {
//           console.log(err.response.data);
//         })
//     }}
//   ];
//
//   return new Promise(function(resolve, reject) {
//     if (params){
//       resolve(value);
//     } else {
//       reject(error);
//     }
//   });
//
// }
