import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { assetTransactionApi } from 'api';
import uiStore from './ui';
import { setPathValue } from 'pathval';

class AssetTransactionStore {
  constructor() {
    this.cancels = [];
  }

  dealWithDate(type, startDate, endDate, result) {
    if (!result.length) {
      return result;
    }
    const compliteDate = [];
    const rangeMomentDate = moment.range(moment(startDate), moment(endDate)).toArray('days');
    // 默认封装所有数据为0
    if (type === 'transaction') {
      rangeMomentDate.forEach((item) => {
        compliteDate.push({
          transactionSum: 0,
          transactionSumAll: 0,
          transactionTotal: 0,
          transactionTotalAll: 0,
          _id: item.format('YYYY-MM-DD')
        });
      });
      compliteDate.forEach((item) => {
        result.forEach((detail) => {
          if (detail._id === item._id) {
            item.transactionSum = detail.transactionSum;
            item.transactionSumAll = detail.transactionSumAll;
            item.transactionTotal = detail.transactionTotal;
            item.transactionTotalAll = detail.transactionTotalAll;
          }
        });
      });
    } else {
      rangeMomentDate.forEach((item) => {
        compliteDate.push({
          auctionSum: 0,
          auctionSumAll: 0,
          auctionTotal: 0,
          auctionTotalAll: 0,
          _id: item.format('YYYY-MM-DD')
        });
      });
      compliteDate.forEach((item) => {
        result.forEach((detail) => {
          if (detail._id === item._id) {
            item.auctionSum = detail.auctionSum;
            item.auctionSumAll = detail.auctionSumAll;
            item.auctionTotal = detail.auctionTotal;
            item.auctionTotalAll = detail.auctionTotalAll;
          }
        });
      });
    }
    return compliteDate;
  }

  @observable assetLocalParams = {
    assignorType: '',
    region: '',
    assetGt: '',
    assetLt: '',
    assetType: '',
  }

  @observable assetLocalSwiperImg = {
    bgImgDistance: 0,
    distance: 0,
    activeImg: 0,
  }

  @observable assetLocalData = [];
  @observable assetLocalDetail = {};
  @observable assetLocalLoading = false;

  @observable tradeTrendParams = {
    region: '',
    startDate: '',
    endDate: '',
  };
  @observable tradeTrendData = [];
  @observable auctionData = [];
  @observable transactionData = [];
  @observable tradeTrendLoading = false;

  @action.bound setAssetLocalParams(path, value) {
    setPathValue(this.assetLocalParams, path, value);
  }

  @action.bound setAssetLocalSwiperImg(path, value) {
    setPathValue(this.assetLocalSwiperImg, path, value);
  }

  @action.bound getAssetLocal(params) {
    const source = axios.CancelToken.source();
    params.index = uiStore.uiState.assetLocal.index;
    params.size = uiStore.uiState.assetLocal.size;
    this.assetLocalLoading = true;
    assetTransactionApi.getAssetLocal({ params: params, cancelToken: source.token })
      .then(action('get asset local', (resp) => {
        this.assetLocalData = resp.data.data;
        uiStore.uiState.assetLocal.totalElements = resp.data.pageTotal;
        this.assetLocalLoading = false;
      }))
      .catch(action('get asset local catch', (err) => {
        if (!axios.isCancel(err)) {
          console.log(err);
          this.assetLocalLoading = false;
        }
      }));
  }

  @action.bound getAssetLocalDetail(params, openDetailModal) {
    assetTransactionApi.getAssetLocalDetail(params)
      .then(action('get assset local detail', (resp) => {
        this.assetLocalDetail = resp.data;
        openDetailModal();
      }))
      .catch(action('get asset local detail catch', (err) => {
        console.log(err);
      }));
  }

  @action.bound setTradeTrendParams(params) {
    this.tradeTrendParams = params;
  }

  @action.bound getAssetTrend(params) {
    const source = axios.CancelToken.source();
    this.tradeTrendLoading = true;
    assetTransactionApi.getAssetTrend({ params: params, cancelToken: source.token })
      .then(action('get asset trend', (resp) => {
        const result = resp.data;
        const startDate = this.tradeTrendParams.startDate;
        const endDate = this.tradeTrendParams.endDate;
        result.auctionData = this.dealWithDate('auction', startDate, endDate, result.auctionData);
        result.transactionData = this.dealWithDate('transaction', startDate, endDate, result.transactionData);
        this.transactionData = result.transactionData;
        this.auctionData = result.auctionData;
        this.tradeTrendData = result;
        this.tradeTrendLoading = false;
      }))
      .catch(action('get asset trend catch', (err) => {
        if (!axios.isCancel(err)) {
          console.log(err);
          this.tradeTrendLoading = false;
        }
      }));
  }

  @action.bound resetStore() {
    console.log('asset resetStore');
  }
}
export default new AssetTransactionStore();
