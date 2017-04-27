import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import uiStore from '../ui';
import axios from 'axios';
const CancelToken = axios.CancelToken;
import messageStore from '../message';
import pathval from 'pathval';

class AssetsStore {
  @observable trademarkData = [];
  @observable patentData = [];
  @observable biddingData = [];
  @observable isMount = false ;
  // 弹框标题数据||信息来源
  @observable titleData = {};
  // 弹出框详情
  @observable bidMarkertContent = '';

  @observable trLoading = true;
  @observable patentLoading = true;
  @observable biddingLoading = true;

  @action.bound getPatentData(monitorId, reportId, companyName, companyType) {
    companyHomeApi.getReportModule('patent', monitorId, reportId, companyName, companyType, uiStore.uiState.patentInfo)
      .then(action( (response) => {
        this.patentLoading = false;
        this.patentData = response.data.content;
        uiStore.uiState.patentInfo.totalElements = response.data.totalElements;
      }))
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  @action.bound getTrademarkData(monitorId, reportId, companyName, companyType) {
    companyHomeApi.getReportModule('trademark', monitorId, reportId, companyName, companyType, uiStore.uiState.trademarkLists)
      .then(action( (response) => {
        this.trLoading = false;
        this.trademarkData = response.data.content;
        uiStore.uiState.trademarkLists.totalElements = response.data.totalElements;
      }))
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  @action.bound getBiddingData(monitorId, reportId, companyName, companyType) {
    companyHomeApi.getReportModule('bidding', monitorId, reportId, companyName, companyType)
      .then(action( (response) => {
        this.biddingLoading = false;
        this.biddingData = response.data;
      }))
      .catch( action( (err) => {
        this.biddingLoading = false;
        console.log(err.response.data);
      }));
  }

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    this.getBiddingData(monitorId, reportId, companyName, companyType);
    this.getPatentData(monitorId, reportId, companyName, companyType);
    this.getTrademarkData(monitorId, reportId, companyName, companyType);
  }

  @action.bound getDetail(url, showDetail) {
    const source = CancelToken.source();
    companyHomeApi.getBiddingDetail(url, source)
      .then(action( (response) => {
        this.bidMarkertContent = response.data.result;
        showDetail.call(this);
      }))
      .catch((error) => {
        messageStore.openMessage({
          type: 'error',
          content: pathval.getPathValue(error, 'response.data.message') || '获取招投标详情失败'
        });
      });
  }
}
export default new AssetsStore();
