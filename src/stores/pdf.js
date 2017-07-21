import {observable, action} from 'mobx';
// import axios from 'axios';
import pathval from 'pathval';
import { pdfApi } from '../api/index';
import messageStore from './message';
import companyHomeStore from './companyHome';
import {pdfDownload} from '../api/pdf';


class PdfStore {
  // pdf数据
  @observable banner = {};
  @observable crorpBasicData = {};
  @observable crorpAlterData = {};
  @observable crorpYearReportData = [];
  @observable network = {};
  @observable company = {};
  @observable announcement = {};
  @observable internet = {};
  @observable corpCheckData = {};
  @observable trademark = [];
  @observable patent = [];
  @observable bidding = [];
  @observable network = {};
  @observable blacklist = [];
  @observable team = {};
  @observable growing = {};
  @observable operation = {};
  @observable profit = {};
  @observable courtData = {};
  @observable star = {};
  @observable entinvItemList = [];
  @observable frData = {};
  @observable shares = {};
  @observable pdfTypesKey = '';
  @observable managements = [];
  @observable reportType = '';
  @observable taxList = [];
  @observable shareHolders = [];
  // summary
  @observable summary = {};
  @observable companyName = '';

  @action.bound setTypes(types, reportType) {
    this.pdfTypesKey = types;
    this.reportType = reportType;
  }

  @action.bound sendEmail(params) {
    params.email = companyHomeStore.emailAddress;
    params.companyName = companyHomeStore.reportInfo.companyName;
    pdfApi.sendEmail(params).then((res) => {
      messageStore.openMessage({
        content: res.data.message
      });
    }).catch((err) => {
      console.log(err.response.data);
    });
  }

  @action.bound getOverviewData() {
    const types = {
      basicReport: [
        'BANNER_INFO',
        'SUMMERY',
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
      ],
      analysis: [
        'BANNER_INFO',
        'SCORE',
        'PROFIT',
        'OPERATION',
        'GROWING',
      ],
      report: [
        'BANNER_INFO',
        'INV_POS_SHAREHOLDER',
        'SUMMERY',
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
      ]
    };
    // types[type].forEach((typev) => {
    //   axios.get(`/api/pdf/${type}?${idType}=${id}&types=${typev}`);
    // });
    pdfDownload('', '/api/pdf/report', {reportId: 1594}, types.report.join(',')).then(action((responseData) => {
      this.getPdfDownData(responseData);
      this.pdfTypesKey = types.report.join(',');
    })).catch((err) => {
      console.log(err);
    });
  }

  @action.bound getPdfDownData(data) {
    console.log('data-------------------------+++++++++++', data);
    this.banner = pathval.getPathValue(data, 'banner');
    this.companyName = pathval.getPathValue(data, 'companyName');
    this.summary = pathval.getPathValue(data, 'summary');
    this.crorpBasicData = pathval.getPathValue(data, 'crorpBasicData');
    this.crorpAlterData = pathval.getPathValue(data, 'crorpAlterData');
    this.crorpYearReportData = pathval.getPathValue(data, 'crorpYearReportData');
    this.crorpFiliationData = pathval.getPathValue(data, 'crorpFiliationData');
    this.company = pathval.getPathValue(data, 'stockInfo');
    this.announcement = pathval.getPathValue(data, 'announcement');
    this.courtData = pathval.getPathValue(data, 'courtData');
    this.internet = pathval.getPathValue(data, 'news');
    this.trademark = pathval.getPathValue(data, 'trademark'); // 没有数据
    this.patent = pathval.getPathValue(data, 'patent');
    this.bidding = pathval.getPathValue(data, 'bidding');
    this.network = pathval.getPathValue(data, 'network');
    this.blacklist = pathval.getPathValue(data, 'blackList');
    this.team = pathval.getPathValue(data, 'team');
    this.corpCheckData = pathval.getPathValue(data, 'corpCheckData');
    this.entinvItemList = pathval.getPathValue(data, 'entinvItemList');
    this.frData = pathval.getPathValue(data, 'frData');
    this.shares = pathval.getPathValue(data, 'shares');
    this.managements = pathval.getPathValue(data, 'managements');
    this.taxList = pathval.getPathValue(data, 'taxList');
    this.shareHolders = pathval.getPathValue(data, 'shareHolders');
    // 分析能力
    this.star = pathval.getPathValue(data, 'star');
    this.growing = pathval.getPathValue(data, 'growing');
    this.operation = pathval.getPathValue(data, 'operation');
    this.profit = pathval.getPathValue(data, 'profit');
  }
}
export default new PdfStore();
