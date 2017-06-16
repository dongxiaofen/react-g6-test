import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import uiStore from '../ui';
import axios from 'axios';
const CancelToken = axios.CancelToken;

class AssetsStore {
  @observable trademarkData = [];
  @observable patentData = [];
  @observable biddingData = [];
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
        this.biddingLoading = false;
        this.biddingData = response.data;
      }))
      .catch( action( (err) => {
        this.biddingLoading = false;
        console.log(err.response.data);
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
    this.biddingData = [];
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
