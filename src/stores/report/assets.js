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
  // 取消请求
  @observable biddingDetailCancel = null;

  @observable trLoading = true;
  @observable patentLoading = true;
  @observable biddingLoading = true;

  @action.bound getPatentData(params) {
    params.module = 'patent';
    params.pagesInfo = uiStore.uiState.patentInfo;
    companyHomeApi.getReportModule(params)
      .then(action( (response) => {
        this.patentLoading = false;
        this.patentData = response.data.content;
        uiStore.uiState.patentInfo.totalElements = response.data.totalElements;
      }))
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  @action.bound getTrademarkData(params) {
    params.module = 'trademark';
    params.pagesInfo = uiStore.uiState.trademarkLists;
    companyHomeApi.getReportModule(params)
      .then(action( (response) => {
        this.trLoading = false;
        this.trademarkData = response.data.content;
        uiStore.uiState.trademarkLists.totalElements = response.data.totalElements;
      }))
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  @action.bound getBiddingData(params) {
    params.module = 'bidding';
    companyHomeApi.getReportModule(params)
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

  @action.bound getDetail(url, showDetail) {
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
          messageStore.openMessage({
            type: 'error',
            content: pathval.getPathValue(error, 'response.data.message') || '获取招投标详情失败'
          });
        }
      });
  }
}
export default new AssetsStore();
