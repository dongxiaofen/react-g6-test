import { observable, action, runInAction, computed, reaction } from 'mobx';
import { companyHomeApi } from 'api';
import uiStore from '../ui';
import axios from 'axios';
import { setPathValue } from 'pathval';
const CancelToken = axios.CancelToken;

class AssetsStore {
  constructor() {
    reaction(
      () => this.biddingAnalysisActive,
      () => {
        this.biddingAnalysisLoading = true;
        setTimeout(() => {
          runInAction(() => {
            this.biddingAnalysisLoading = false;
          });
        }, 1000);
        this.modifyBiddingAnalysis();
      }
    );
  }

  @observable trademarkData = [];
  @observable patentData = [];
  @observable biddingData = {
    statistic: {},
    analysis: {
      month: {},
      quarter: {},
      year: {},
    },
    biddingItemList: []
  };

  @observable biddingAnalysisLoading = true;

  @computed get isErrAnalysis() {
    const analysis = this.biddingData.analysis;
    if (analysis.year) {
      return Object.keys(analysis.year).length === 0;
    }
    return true;
  }

  @observable biddingAnalysisActive = '年度';
  @observable biddingAnalysis = { axis: [], data: [] };
  @observable isMount = false ;
  // 弹框标题数据||信息来源
  @observable titleData = {};
  // 弹出框详情
  @observable bidMarkertContent = '';
  // 取消请求
  @observable biddingDetailCancel = null;

  @observable trLoading = true;
  @observable patentLoading = true;
  @observable biddingLoading = true;

  @action.bound updateValue(path, value) {
    setPathValue(this, path, value);
  }

  dealWithAnalysisDate(analysisData, active) {
    const keys = Object.keys(analysisData);
    const years = keys.map(key => key.substring(0, 4));
    const common = (_years, _months) => {
      const output = {};
      years.forEach(year => {
        _months.forEach(month => {
          output[`${year}${month}`] = {
            winMoneyAmount: 0,
            winCount: 0,
            bidMoneyAmount: 0,
            bidCount: 0,
          };
        });
      });
      Object.keys(output).forEach(key => {
        keys.forEach(_key => {
          if (key === _key) {
            output[key] = analysisData[key];
          }
        });
      });
      return output;
    };
    switch (active) {
      case '月度':
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        return common(years, months);
      case '季度':
        const quarterMonths = ['01', '04', '07', '10'];
        return common(years, quarterMonths);
      default:
        break;
    }
  }

  modifyAnalysis(value, active) {
    let keys = Object.keys(value);
    const data = {
      winMoneyAmount: keys.map(key => value[key].winMoneyAmount),
      winCount: keys.map(key => value[key].winCount),
      bidMoneyAmount: keys.map(key => value[key].bidMoneyAmount),
      bidCount: keys.map(key => value[key].bidCount),
    };
    switch (active) {
      case '季度':
        keys = keys.map(key => `${key}-${Number(key) + 2}`);
        break;
      case '年度':
        keys = keys.map(key => key.substring(0, 4));
        break;
      default:
        break;
    }
    return {
      axis: keys,
      data: data
    };
  }

  // 处理招投标分析
  @action.bound modifyBiddingAnalysis() {
    const { month, quarter, year } = this.biddingData.analysis;
    const active = this.biddingAnalysisActive;
    switch (active) {
      case '月度':
        this.biddingAnalysis = month ? this.modifyAnalysis(this.dealWithAnalysisDate(month, active), active) : { axis: [], data: [] };
        break;
      case '季度':
        this.biddingAnalysis = quarter ? this.modifyAnalysis(this.dealWithAnalysisDate(quarter, active), active) : { axis: [], data: [] };
        break;
      case '年度':
        this.biddingAnalysis = year ? this.modifyAnalysis(year, active) : { axis: [], data: [] };
        break;
      default:
        break;
    }
  }

  @action.bound getTrademarkData(idInfo) {
    const {index, size} = uiStore.uiState.trademarkLists;
    companyHomeApi.getReportModule('operation/trademark', idInfo, {index, size})
    .then(action( (response) => {
      this.trLoading = false;
      this.trademarkData = response.data.content;
      uiStore.uiState.trademarkLists.totalElements = response.data.totalElements;
    }))
    .catch(action( () => {
      this.trLoading = false;
    }));
  }

  @action.bound getPatentData(idInfo) {
    const {index, size} = uiStore.uiState.patentInfo;
    companyHomeApi.getReportModule('operation/patent', idInfo, {index, size})
      .then(action( (response) => {
        this.patentLoading = false;
        this.patentData = response.data.content;
        uiStore.uiState.patentInfo.totalElements = response.data.totalElements;
      }))
      .catch(action( () => {
        this.patentLoading = false;
      }));
  }

  @action.bound getBiddingData(params) {
    companyHomeApi.getReportModule('operation/bidding', params)
      .then(action( (response) => {
        this.biddingData.statistic = response.data.statistic;
        this.biddingData.analysis.month = response.data.month;
        this.biddingData.analysis.quarter = response.data.quarter;
        this.biddingData.analysis.year = response.data.year;
        this.modifyBiddingAnalysis();
        const result = response.data.result;
        if (result && result.length) {
          this.biddingData.biddingItemList = result.map(item => {
            item.publishedDateTime = item.publishedDateTime.slice(0, 10);
            return item;
          });
        } else {
          this.biddingData.biddingItemList = [];
        }
        this.biddingLoading = false;
        this.biddingAnalysisLoading = false;
      }))
      .catch( action( (err) => {
        console.log(err.response.data);
        this.biddingLoading = false;
        this.biddingAnalysisLoading = false;
      }));
  }

  @action.bound getReportModule(params) {
    this.isMount = true;
    this.getBiddingData(params);
    this.getPatentData(params);
    this.getTrademarkData(params);
  }

  @action.bound getDetail(url, link, showDetail) {
    if (this.biddingDetailCancel) {
      this.biddingDetailCancel();
      this.biddingDetailCancel = null;
    }
    const source = CancelToken.source();
    this.biddingDetailCancel = source.cancel;
    companyHomeApi.getBiddingDetail(url, source)
      .then(action( (response) => {
        this.biddingDetailCancel = null;
        this.bidMarkertContent = response.data.result;
        showDetail.call(this);
      }))
      .catch((error) => {
        if (!axios.isCancel(error)) {
          this.biddingDetailCancel = null;
          window.open(link);
        }
      });
  }

  @action.bound resetStore() {
    this.trademarkData = [];
    this.patentData = [];
    this.biddingData = {
      statistic: {},
      analysis: {
        month: {},
        quarter: {},
        year: {},
      },
      biddingItemList: []
    };

    this.biddingAnalysisActive = '年度';
    this.isMount = false;
    // 弹框标题数据||信息来源
    this.titleData = {};
    // 弹出框详情
    this.bidMarkertContent = '';
    // 取消请求
    this.biddingDetailCancel = null;

    this.trLoading = true;
    this.patentLoading = true;
    this.biddingLoading = true;
  }
}
export default new AssetsStore();
