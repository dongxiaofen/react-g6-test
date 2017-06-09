import { observable, action } from 'mobx';
import axios from 'axios';
import pathval from 'pathval';


class PdfStore {
  // pdf数据
  @observable banner = {};
  @observable report = {};
  @observable network = {};
  @observable company = {};
  @observable announcement = {};
  @observable risk = {};
  @observable internet = {};
  @observable trademark = [];
  @observable patent = [];
  @observable bidding = [];
  @observable network = {};
  @observable blacklist = [];
  @observable team = {};
  @observable taxList = {};
  @observable pdfTypesKey = 'SUMMARY,CORP,CORP_BASIC,CORP_INV_POS,STOCK,CORP_ALTER,CORP_YEAR_REPORT,TAX,RISK,RISK_ANNOUNCEMENT,RISK_NOTICE,RISK_JUDGEMENT,RISK_EXECUTE,RISK_DISHONESTY,RISK_LITIGATION,RISK_TAXATION,RISK_ABNORMAL,RISK_CHECK,NEWS,NETWORK,NETWORK_RELEVANCE,NETWORK_BLACKLIST,STOCK_INFO,STOCK_ANNOUNCEMENT,OPERATION,OPERATION_BIDDING,OPERATION_PATENT,OPERATION_TEL,OPERATION_TRADEMARK,NETWORK,NETWORK_RELEVANCE,NETWORK_BLACKLIST,TEAM,TEAM_RECRUITMENT_RESUME,TEAM_ANALYSIS';
  // summary
  @observable summary = {};

  @action.bound setTypes(types) {
    this.pdfTypesKey = types;
  }

  @action.bound getOverviewData(id) {
    const baseReport = [
      'CORP_BASIC',
      'CORP_ALTER',
      'CORP_YEAR_REPORT',
      'INV_POS_FR',
      'INV_POS_ENT',
      'INV_POS_MANAGEMENT',
      'STOCK_INFO',
      'STOCK_ANNOUNCEMENT',
      'NEWS',
      'OPERATION_BIDDING',
      'OPERATION_PATENT',
      // 'OPERATION_TRADEMARK',
      'TEAM_RECRUITMENT_RESUME',
      'RISK_TAXATION',
      'RISK_JUDGEMENT',
      'RISK_ANNOUNCEMENT',
      'RISK_NOTICE',
      'RISK_EXECUTE',
      'RISK_DISHONESTY',
      'RISK_LITIGATION',
      'RISK_ABNORMAL',
      'RISK_CHECK',
      'RISK_ILLEGAL',
      'PLEDGE_EQUITY_SHARE',
      'NETWORK_RELEVANCE',
      'NETWORK_BLACKLIST',
    ];
    const analysiReport = [
      'SCORE',
      'PROFIT',
      'OPERATION',
      'GROWING',
    ];
    const report = [
      'CORP_BASIC',
      'CORP_ALTER',
      'CORP_YEAR_REPORT',
      'INV_POS_FR',
      'INV_POS_ENT',
      'INV_POS_MANAGEMENT',
      'STOCK_INFO',
      'STOCK_ANNOUNCEMENT',
      'NEWS',
      'OPERATION_BIDDING',
      'OPERATION_PATENT',
      'OPERATION_TRADEMARK',
      'TEAM_RECRUITMENT_RESUME',
      'RISK_TAXATION',
      'RISK_JUDGEMENT',
      'RISK_ANNOUNCEMENT',
      'RISK_NOTICE',
      'RISK_EXECUTE',
      'RISK_DISHONESTY',
      'RISK_LITIGATION',
      'RISK_ABNORMAL',
      'RISK_CHECK',
      'RISK_ILLEGAL',
      'PLEDGE_EQUITY_SHARE',
      'NETWORK_RELEVANCE',
      'NETWORK_BLACKLIST',
    ];
    console.log(baseReport.join(','), report, analysiReport);
    // 获取pdf
    axios.get(`/api/pdf/basicReport?basicReportId=${id}&types=${baseReport.join(',')}`)
      .then(action((response) => {
        this.banner = pathval.getPathValue(response.data, 'banner');
        this.summary = pathval.getPathValue(response.data, 'summary');
        this.report = pathval.getPathValue(response.data, 'corpDetail');
        this.company = pathval.getPathValue(response.data, 'stock.info');
        this.announcement = pathval.getPathValue(response.data, 'stock.announcement');
        this.risk = pathval.getPathValue(response.data, 'risk');
        this.internet = pathval.getPathValue(response.data, 'internet');
        this.trademark = pathval.getPathValue(response.data, 'trademark'); // 没有数据
        this.patent = pathval.getPathValue(response.data, 'patent');
        this.bidding = pathval.getPathValue(response.data, 'biddingList');
        this.network = pathval.getPathValue(response.data, 'network');
        this.blacklist = pathval.getPathValue(response.data, 'blackList.result[0].paths');
        this.team = pathval.getPathValue(response.data, 'recruitTeamResponse');
        this.taxList = pathval.getPathValue(response.data, 'taxInfo.result');
      }))
      .catch((error) => {
        console.log(error.response);
      });
  }
  @action.bound getPdfDownData(data) {
    console.log('data', data);
    this.banner = pathval.getPathValue(data, 'banner');
    this.summary = pathval.getPathValue(data, 'summary');
    this.report = pathval.getPathValue(data, 'corpDetail');
    this.company = pathval.getPathValue(data, 'stock.info');
    this.announcement = pathval.getPathValue(data, 'stock.announcement');
    this.risk = pathval.getPathValue(data, 'risk');
    this.internet = pathval.getPathValue(data, 'internet');
    this.trademark = pathval.getPathValue(data, 'trademark');
    this.patent = pathval.getPathValue(data, 'patent');
    this.bidding = pathval.getPathValue(data, 'biddingList');
    this.network = pathval.getPathValue(data, 'network');
    this.blacklist = pathval.getPathValue(data, 'blackList.result[0].paths');
    this.team = pathval.getPathValue(data, 'recruitTeamResponse');
    this.taxList = pathval.getPathValue(data, 'taxInfo.result');
  }
}
export default new PdfStore();
