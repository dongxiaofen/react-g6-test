import {observable, action} from 'mobx';
import axios from 'axios';
import pathval from 'pathval';


class PdfStore {
  // pdf数据
  @observable banner = {};
  @observable report = {};
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
  @observable shares = {
    'sharesFrostList': [
      {
        'freDocId': 'string',
        'freFromDate': 'string',
        'freMoney': 'string',
        'freOrgName': 'string',
        'freRatio': 'string',
        'freToDate': 'string',
        'unfreDate': 'string',
        'unfreDocId': 'string',
        'unfreInfo': 'string',
        'unfreOrgName': 'string'
      },
      {
        'freDocId': 'string',
        'freFromDate': 'string',
        'freMoney': 'string',
        'freOrgName': 'string',
        'freRatio': 'string',
        'freToDate': 'string',
        'unfreDate': 'string',
        'unfreDocId': 'string',
        'unfreInfo': 'string',
        'unfreOrgName': 'string'
      }
    ],
    'sharesImpawnList': [
      {
        'imporg': 'string',
        'imporgAmount': 'string',
        'imporgAthOrg': 'string',
        'imporgDate': 'string',
        'imporgRecordDate': 'string',
        'imporgTo': 'string',
        'imporgType': 'string'
      }
    ],
    'sharesTransferList': [
      {
        'assignee': 'string',
        'pledgeDate': 'string',
        'pledgedAmount': 'string',
        'transferType': 'string',
        'transfersRatio': 'string'
      }
    ]
  };
  @observable pdfTypesKey = '';
  // summary
  @observable summary = {};

  @action.bound setTypes(types) {
    this.pdfTypesKey = types;
  }

  @action.bound getOverviewData(id, type, idType) {
    const types = {
      basicReport: [
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
        'SCORE',
        'PROFIT',
        'OPERATION',
        'GROWING',
      ],
      report: [
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
    // 获取pdf
    axios.get(`/api/pdf/${type}?${idType}=${id}&types=${types[type].join(',')}`)
      .then(action((response) => {
        this.banner = pathval.getPathValue(response.data, 'banner');
        this.summary = pathval.getPathValue(response.data, 'summary');
        this.report = pathval.getPathValue(response.data, 'corpDetail');
        this.company = pathval.getPathValue(response.data, 'stock.info');
        this.announcement = pathval.getPathValue(response.data, 'stock.announcement');
        this.courtData = pathval.getPathValue(response.data, 'court');
        this.internet = pathval.getPathValue(response.data, 'internet');
        this.trademark = pathval.getPathValue(response.data, 'trademark'); // 没有数据
        this.patent = pathval.getPathValue(response.data, 'patent');
        this.bidding = pathval.getPathValue(response.data, 'biddingList');
        this.network = pathval.getPathValue(response.data, 'network');
        this.blacklist = pathval.getPathValue(response.data, 'blackList.result[0].paths');
        this.team = pathval.getPathValue(response.data, 'recruitTeamResponse');
        this.corpCheckData = pathval.getPathValue(response.data, 'corpCheck');
        this.entinvItemList = pathval.getPathValue(response.data, 'ent.entinvItemList');
        this.frData = pathval.getPathValue(response.data, 'fr');
        // this.shares = pathval.getPathValue(response.data, 'shares');
        // 分析能力
        this.star = pathval.getPathValue(response.data, 'star');
        this.growing = pathval.getPathValue(response.data, 'growing');
        this.operation = pathval.getPathValue(response.data, 'operation');
        this.profit = pathval.getPathValue(response.data, 'profit');
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
    this.internet = pathval.getPathValue(data, 'internet');
    this.trademark = pathval.getPathValue(data, 'trademark');
    this.patent = pathval.getPathValue(data, 'patent');
    this.courtData = pathval.getPathValue(data, 'court');
    this.bidding = pathval.getPathValue(data, 'biddingList');
    this.network = pathval.getPathValue(data, 'network');
    this.blacklist = pathval.getPathValue(data, 'blackList.result[0].paths');
    this.team = pathval.getPathValue(data, 'recruitTeamResponse');
    this.corpCheckData = pathval.getPathValue(data, 'corpCheck');
    this.shares = pathval.getPathValue(data, 'shares');
    this.star = pathval.getPathValue(data, 'star');
    this.entinvItemList = pathval.getPathValue(data, 'ent.entinvItemList');
    this.frData = pathval.getPathValue(data, 'fr');
    this.growing = pathval.getPathValue(data, 'growing');
    this.operation = pathval.getPathValue(data, 'operation');
    this.profit = pathval.getPathValue(data, 'profit');
  }
}
export default new PdfStore();
