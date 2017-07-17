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
export const pdfDownload = (backendApi, urlPanth, params, types) => {
  // let count = 0;
  // const responseData = {
  //   summary: '',
  //   report: '',
  //   company: '',
  //   announcement: '',
  //   courtData: '',
  //   internet: '',
  //   trademark: '',
  //   patent: '',
  //   bidding: '',
  //   network: '',
  //   blacklist: '',
  //   team: '',
  //   corpCheckData: '',
  //   entinvItemList: '',
  //   frData: '',
  //   shares: '',
  //   managements: '',
  //   taxList: '',
  //   star: '',
  //   growing: '',
  //   operation: '',
  //   profit: ''
  // };
  const getData = (url, paramsString) => {
    console.log(url, paramsString, '---------');
    // return new Promise((resolve, reject) => {
    //   axios.get(url, {paramsString})
    //     .then((res) => {
    //       resolve(res.data);
    //     }).catch((err) => {
    //       reject(err.response.data);
    //     });
    // });
  };

  (async () => {
    for (const type of types.split(',')) {
      params.type = type;
      saveData(type, await getData(backendApi + urlPanth, params));
    }
  })();

  const saveData = (type, data) => {
    switch (type){
      case 'CORP_BASIC':
        console.log(type);
        break;
      case 'CORP_ALTER':
        console.log(type);
        break;
    }
    console.log(type, data, '-----------------------------------------===///////////////////');
  };
};
