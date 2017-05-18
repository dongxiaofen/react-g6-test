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
  @observable risk = {};
  @observable internet = {};
  @observable trademark = [];
  @observable patent = [];
  @observable bidding = [];
  @observable network = {};
  @observable blacklist = [];
  @observable team = {};
  @observable taxList = {};
  @observable testTaxList = {
    operating_progress: {
      2015: {
        XSZZL: 3.45,
        JLRZZL: 12.34,
        YYLRZZL: 23.45,
        ZCZZL: 12.34,
        ZYYWSRBDL: 12.34
      },
      2016: {
        XSZZL: 3.45,
        JLRZZL: 12.34,
        YYLRZZL: 23.45,
        ZCZZL: 12.34,
        ZYYWSRBDL: 12.34
      }
    },
    operating_capability: {
      2015: {
        'ZZCYSRB': 12.34,
        'CWFYZB': 3.45,
        'GLFYZB': 12.34,
        'GSGM': 1234,
        'XSFYZB': 23.45
      },
      2016: {
        ZZCYSRB: 12.34,
        CWFYZB: 3.45,
        GLFYZB: 12.34,
        GSGM: 1234,
        XSFYZB: 23.45
      }
    },
    operating_profit: {
      2015: {
        'XSMLL': 12.34,
        'YYJLL': 23.45,
        'ZCJLL': 12.34,
        'CBFYJLL': 12.34,
        'ZYYWLRL': 2.0,
        'XSJLL': 3.45
      },
      2016: {
        XSMLL: 12.34,
        YYJLL: 23.45,
        ZCJLL: 12.34,
        CBFYJLL: 12.34,
        ZYYWLRL: 2,
        XSJLL: 3.45
      }
    }
  };

  // summary
  @observable summary = {};

  @action.bound getOverviewData(id) {
    // 获取pdf
    axios.get(`/api/pdf?monitorId=${id}
    &types=SUMMARY,CORP,CORP_BASIC,CORP_INV_POS,STOCK,CORP_ALTER,CORP_YEAR_REPORT,CORP_TAX,RISK,RISK_ANNOUNCEMENT,RISK_NOTICE,RISK_JUDGEMENT,RISK_EXECUTE,RISK_DISHONESTY,RISK_LITIGATION,RISK_TAXATION,RISK_ABNORMAL,RISK_CHECK,NEWS,NETWORK,NETWORK_RELEVANCE,NETWORK_BLACKLIST,STOCK_INFO,STOCK_ANNOUNCEMENT,OPERATION,OPERATION_TRADEMARK,OPERATION_BIDDING,OPERATION_PATENT,OPERATION_TEL,NETWORK,NETWORK_RELEVANCE,NETWORK_BLACKLIST,TEAM,TEAM_RECRUITMENT_RESUME,TEAM_ANALYSIS`)
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
      }))
      .catch((error) => {
        console.log(error.response);
      });
  }
}
export default new PdfStore();
