import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { assetTransactionApi } from 'api';

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
    // index: 1,
    // size: 10,
    assignorType: '',
    region: '',
    assetGt: '',
    assetLt: '',
    assetType: '',
  }
  @observable assetLocalLoading = false;
  @observable assetLocalData = [];

  @observable tradeTrendParams = {
    region: '',
    startDate: '',
    endDate: '',
  };
  @observable tradeTrendData = [];
  @observable auctionData = [];
  @observable transactionData = [];
  @observable tradeTrendLoading = false;

  @action.bound setAssetLocalParams(params) {
    this.assetLocalParams = params;
  }

  @action.bound getAssetLocal(params) {
    const source = axios.CancelToken.source();
    this.assetLocalLoading = true;
    assetTransactionApi.getAssetLocal({ params: params, cancelToken: source.token })
      .then(action('get asset local', (resp) => {
        console.log(resp.data);
        this.assetLocalLoading = false;
      }))
      .catch(action('get asset local catch', (err) => {
        if (!axios.isCancel(err)) {
          console.log(err);
          this.assetLocalLoading = false;
        }
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
