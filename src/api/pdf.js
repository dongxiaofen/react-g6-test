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
export const pdfDownload = (backendApi, urlPanth, paramString, types) => {
  // let count = 0;
  const responseData = {
    summary: '',
    report: '',
    company: '',
    announcement: '',
    courtData: '',
    internet: '',
    trademark: '',
    patent: '',
    bidding: '',
    network: '',
    blacklist: '',
    team: '',
    corpCheckData: '',
    entinvItemList: '',
    frData: '',
    shares: '',
    managements: '',
    taxList: '',
    star: '',
    growing: '',
    operation: '',
    profit: ''
  };
  const getData = (url, params) => {
    console.log(url, params, '---------');
    return new Promise((resolve) => {
      axios.get(url, {params})
        .then((res) => {
          resolve(res.data);
        }).catch((err) => {
          console.log(err.response.data);
        });
    });
  };

  const saveData = (type, data) => {
    console.log(data, '------------------获取数据成功');
    switch (type) {
      case 'BANNER_INFO':
        responseData.report = data.corpDetail;
        console.log(type);
        break;
      case 'CORP_BASIC':
        responseData.report = data.corpDetail;
        console.log(type);
        break;
      case 'CORP_ALTER':
        responseData.report = data.corpDetail;
        break;
      case 'CORP_YEAR_REPORT':
        responseData.report = data.corpDetail;
        break;
      case 'INV_POS_FR':
        responseData.frData = data.fr;
        break;
      case 'INV_POS_ENT':
        responseData.entinvItemList = data.entinvItemList;
        break;
      case 'INV_POS_MANAGEMENT':
        responseData.report = data.corpDetail;
        console.log(type);
        break;
      case 'STOCK_INFO':
        responseData.report = data.corpDetail;
        break;
      case 'STOCK_ANNOUNCEMENT':
        responseData.report = data.corpDetail;
        break;
      case 'NEWS':
        responseData.report = data.corpDetail;
        break;
      case 'OPERATION_BIDDING':
        responseData.report = data.corpDetail;
        break;
      case 'OPERATION_PATENT':
        responseData.report = data.corpDetail;
        break;
      case 'OPERATION_TRADEMARK':
        responseData.report = data.corpDetail;
        break;
      case 'TEAM_RECRUITMENT_RESUME':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_TAXATION':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_JUDGEMENT':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_ANNOUNCEMENT':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_NOTICE':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_EXECUTE':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_DISHONESTY':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_LITIGATION':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_ABNORMAL':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_CHECK':
        responseData.report = data.corpDetail;
        break;
      case 'RISK_ILLEGAL':
        responseData.report = data.corpDetail;
        break;
      case 'PLEDGE_EQUITY_SHARE':
        responseData.report = data.corpDetail;
        break;
      case 'NETWORK_RELEVANCE':
        responseData.report = data.corpDetail;
        break;
      case 'NETWORK_BLACKLIST':
        responseData.report = data.corpDetail;
        break;
      case 'SCORE':
        responseData.report = data.corpDetail;
        break;
      case 'PROFIT':
        responseData.report = data.corpDetail;
        break;
      case 'OPERATION':
        responseData.report = data.corpDetail;
        break;
      case 'GROWING':
        responseData.report = data.corpDetail;
        break;
      default:
        break;
    }
  };


  return new Promise((resolve) => {
    (async () => {
      for (const type of ['BANNER_INFO', ...types.split(',')]) {
        paramString.types = type;
        saveData(type, await getData(backendApi + urlPanth, paramString));
      }
      resolve(responseData);
    })();
  });
};
