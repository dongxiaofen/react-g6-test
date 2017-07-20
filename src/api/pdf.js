import axios from 'axios';
import pathval from 'pathval';

// 创建报告pdf
export const createPDF = (url) => {
  return axios.get(`${url}`);
};

// check报告pdf
export const checkPDF = (params) => {
  return axios.get('/pdfCheck', {params});
};

// PDF发送到邮箱
export const sendEmail = (params) => {
  return axios.get('/sendEmail', {params});
};

// pdf下载API
export const pdfDownload = (backendApi, urlPanth, paramString, types) => {
  // let count = 0;
  const responseData = {
    banner: '',
    summary: '',
    crorpBasicData: [],
    crorpAlterData: [],
    crorpYearReportData: [],
    company: '',
    announcement: '',
    courtData: {},
    news: {},
    trademark: '',
    patent: {},
    bidding: '',
    network: {},
    blacklist: '',
    team: {},
    corpCheckData: {},
    entinvItemList: '',
    frData: '',
    shares: {},
    managements: '',
    taxList: '',
    star: '',
    growing: '',
    operation: '',
    profit: '',
    companyName: '',
    email: '',
  };
  const getData = (url, params, callBack) => {
    console.log(url, params, '---------');
    return new Promise((resolve) => {
      axios.get(url, {params})
        .then((res) => {
          resolve(res.data);
        }).catch((err) => {
          callBack(err.response.data);
          console.log(err.response.data);
        });
    });
  };

  const saveData = (type, data) => {
    console.log(data, '------------------获取数据成功');
    responseData.companyName = data.companyName;
    responseData.email = data.email;
    switch (type) {
      case 'BANNER_INFO':
        responseData.banner = data.banner;
        break;
      case 'SUMMERY':
        responseData.summary = data.summary;
        break;
      case 'CORP_BASIC':
        responseData.crorpBasicData = pathval.getPathValue(data, 'corpDetail.corpDetail');
        break;
      case 'CORP_ALTER':
        responseData.crorpAlterData = pathval.getPathValue(data, 'corpDetail.tendency');
        break;
      case 'CORP_YEAR_REPORT':
        responseData.crorpYearReportData = pathval.getPathValue(data, 'corpDetail.corpDetail.yearReportList');
        break;
      case 'INV_POS_FR':
        responseData.frData = data.fr;
        break;
      case 'INV_POS_ENT':
        responseData.entinvItemList = pathval.getPathValue(data, 'ent.entinvItemList');
        break;
      case 'INV_POS_MANAGEMENT':
        responseData.managements = data.managements;
        break;
      case 'INV_POS_SHAREHOLDER':
        responseData.shareHolders = pathval.getPathValue(data, 'shareHolders');
        break;
      case 'STOCK_INFO':
        responseData.stockInfo = data.stock.info;
        break;
      case 'STOCK_ANNOUNCEMENT':
        responseData.announcement = data.stock.announcement;
        break;
      case 'NEWS':
        responseData.news = data.internet;
        break;
      case 'OPERATION_BIDDING':
        responseData.bidding = data.bidding;
        break;
      case 'OPERATION_PATENT':
        responseData.patent = data.patent;
        break;
      case 'OPERATION_TRADEMARK':
        responseData.trademark = data.trademark;
        break;
      case 'TEAM_RECRUITMENT_RESUME':
        responseData.team.recruitAndResumeResponse = pathval.getPathValue(data, 'recruitTeamResponse.recruitAndResumeResponse');
        break;
      case 'TEAM_ANALYSIS':
        responseData.team.teamResponse = pathval.getPathValue(data, 'recruitTeamResponse.teamResponse');
        break;
      case 'RISK_TAXATION':
        responseData.taxList = data.taxList;
        break;
      case 'RISK_JUDGEMENT':
        responseData.courtData.countCount = pathval.getPathValue(data, 'court.countCount');
        responseData.courtData.total = pathval.getPathValue(data, 'court.total');
        responseData.courtData.judgeDoc = pathval.getPathValue(data, 'court.judgeDoc');
        break;
      case 'RISK_ANNOUNCEMENT':
        responseData.courtData.countCount = pathval.getPathValue(data, 'court.countCount');
        responseData.courtData.total = pathval.getPathValue(data, 'court.total');
        responseData.courtAnnouncement = pathval.getPathValue(data, 'courtAnnouncement');
        break;
      case 'RISK_NOTICE':
        responseData.courtData.countCount = pathval.getPathValue(data, 'court.countCount');
        responseData.courtData.total = pathval.getPathValue(data, 'court.total');
        responseData.courtNotice = pathval.getPathValue(data, 'courtNotice');
        break;
      case 'RISK_EXECUTE':
        responseData.courtData.countCount = pathval.getPathValue(data, 'court.countCount');
        responseData.courtData.total = pathval.getPathValue(data, 'court.total');
        responseData.courtExecution = pathval.getPathValue(data, 'courtExecution');
        break;
      case 'RISK_DISHONESTY':
        responseData.courtData.countCount = pathval.getPathValue(data, 'court.countCount');
        responseData.courtData.total = pathval.getPathValue(data, 'court.total');
        responseData.dishonestyList = pathval.getPathValue(data, 'dishonestyList');
        break;
      case 'RISK_LITIGATION':
        responseData.courtData.countCount = pathval.getPathValue(data, 'court.countCount');
        responseData.courtData.total = pathval.getPathValue(data, 'court.total');
        responseData.litigationAssets = pathval.getPathValue(data, 'litigationAssets');
        break;
      case 'RISK_ABNORMAL':
        responseData.corpCheckData.abnormalOperation = pathval.getPathValue(data, 'corpCheck.abnormalOperation');
        break;
      case 'RISK_CHECK':
        responseData.corpCheckData.checkMessage = pathval.getPathValue(data, 'corpCheck.checkMessage');
        break;
      case 'RISK_ILLEGAL':
        responseData.corpCheckData.punishList = pathval.getPathValue(data, 'corpCheck.punishList');
        break;
      case 'PLEDGE_EQUITY_SHARE':
        responseData.shares = pathval.getPathValue(data, 'shares');
        break;
      case 'NETWORK_RELEVANCE':
        responseData.network = pathval.getPathValue(data, 'network');
        break;
      case 'NETWORK_BLACKLIST':
        responseData.blacklist = pathval.getPathValue(data, 'blackList.result[0].paths');
        break;
      case 'SCORE':
        responseData.star = data.star;
        break;
      case 'PROFIT':
        responseData.profit = data.profit;
        break;
      case 'OPERATION':
        responseData.operation = data.operation;
        break;
      case 'GROWING':
        responseData.growing = data.growing;
        break;
      default:
        break;
    }
  };


  return new Promise((resolve, reject) => {
    (async () => {
      const callBack = (err) => {
        reject(err);
      };
      if (paramString.analysisReportId) {
        for (const type of types.split(',')) {
          paramString.types = type;
          saveData(type, await getData(backendApi + urlPanth, paramString, callBack));
        }
      } else {
        for (const type of ['BANNER_INFO', ...types.split(',')]) {
          paramString.types = type;
          saveData(type, await getData(backendApi + urlPanth, paramString, callBack));
        }
      }
      resolve(responseData);
    })();
  });
};
