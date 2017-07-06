import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { setPathValue } from 'pathval';

import { assetTransactionApi } from 'api';
import geoCoordMap from 'helpers/geoCoordMap';
import uiStore from './ui';
import entireLoadingStore from './entireLoading';

class AssetTransactionStore {
  constructor() {
    this.assetLocalCancel = '';
    this.tradeTrendCancel = '';
    this.distributionCancel = '';
    this.distributionDetailCancel = '';
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

  // 处理选择的资产统计类别
  distributionMap(data, key) {
    const mapData = [];
    const barData = [];
    let keyAllTotal = 0;
    data.forEach((item) => {
      if (geoCoordMap[item._id]) {
        keyAllTotal += item[key];
      }
    });
    // 设置单位
    let unit;
    let itemName;
    // 遍历数据
    data.forEach(item => {
      let keyTotal;
      if (key === 'auctionTotal' || key === 'transactionTotal') {
        keyTotal = (item[key] / 10000).toFixed(2);
      } else {
        keyTotal = item[key];
      }
      const auctionTotal = (item.auctionTotal / 10000).toFixed(2);
      const auctionSum = item.auctionSum;
      const transactionTotal = (item.transactionTotal / 10000).toFixed(2);
      const transactionSum = item.transactionSum;
      let color;
      if (key === 'auctionTotal' || key === 'transactionTotal') {
        if (keyTotal <= 9999) {
          color = '#779F85';
        } else if (keyTotal <= 19999) {
          color = '#55979F';
        } else if (keyTotal <= 29999) {
          color = '#2F4554';
        } else if (keyTotal >= 30000) {
          color = '#C13430';
        } else {
          color = '#000';
        }
      } else {
        if (keyTotal <= 9) {
          color = '#779F85';
        } else if (keyTotal <= 199) {
          color = '#55979F';
        } else if (keyTotal <= 499) {
          color = '#2F4554';
        } else if (keyTotal >= 500) {
          color = '#C13430';
        } else {
          color = '#000';
        }
      }
      // 设置单位
      unit = key === 'auctionTotal' || key === 'transactionTotal' ? '万元' : '笔';
      switch (key) {
        case 'auctionTotal':
          itemName = '拍卖资产总额';
          break;
        case 'transactionTotal':
          itemName = '交易资产总额';
          break;
        case 'auctionSum':
          itemName = '拍卖笔数';
          break;
        case 'transactionSum':
          itemName = '交易笔数';
          break;
        default:
      }
      if (item._id !== '未知' && item._id !== '其他' && item._id !== '台湾' && item._id !== '香港' && item._id !== '澳门') {
        if (geoCoordMap[item._id]) {
          const percent = keyAllTotal ? item[key] / keyAllTotal : 0;
          mapData.push({
            name: item._id,
            value: [
              geoCoordMap[item._id][0],
              geoCoordMap[item._id][1],
              keyTotal,
              (percent * 100).toFixed(2),
              itemName,
              unit
            ],
            itemStyle: {
              normal: {
                color: color,
                borderColor: color,
                borderWidth: 1,
                opacity: 0.5,
              },
              emphasis: {
                color: color,
                borderColor: color,
                borderWidth: 1,
                opacity: 0.7,
              }
            }
          });
        }
        barData.push(
          {
            transactionTotal,
            transactionSum,
            auctionTotal,
            auctionSum,
            area: item._id
          });
      }
    });
    const _barData = this.distributionBarData(barData, key, unit);
    return {
      bar: _barData,
      barData: _barData.data,
      barAxis: _barData.axis,
      mapData,
    };
  }

  distributionBarData(data, key, unit) {
    const axis = [];
    const _data = [];
    const whetherHasData = [];
    let assetsBarData = data;
    assetsBarData = assetsBarData.sort((prev, next) => {
      return prev[key] - next[key];
    });
    assetsBarData = assetsBarData.slice(assetsBarData.length - 10);
    assetsBarData.forEach((item) => {
      if (Number(item[key]) > 0) {
        whetherHasData.push(item);
      }
    });
    if (whetherHasData.length > 0) {
      whetherHasData.forEach((item, idx) => {
        axis.push(`${whetherHasData.length - idx}.${item.area}`);
        _data.push({
          value: item[key],
          unit: unit
        });
      });
    }
    return { data: _data, axis };
  }

  // 处理地图圆点的大小
  mapSymbol(key, data) {
    const value = data[2];
    if (key === 'transactionTotal' || key === 'auctionTotal') {
      if (value >= 0 && value <= 9999) {
        return 20;
      } else if (value >= 10000 && value <= 19999) {
        return 25;
      } else if (value >= 20000 && value <= 29999) {
        return 30;
      }
      return 40;
    }
    if (value >= 0 && value <= 9) {
      return 20;
    } else if (value >= 10 && value <= 199) {
      return 25;
    } else if (value >= 200 && value <= 499) {
      return 30;
    }
    return 40;
  }

  /* 本地资产 */
  @observable assetLocalParams = {
    assignorType: '',
    region: '',
    assetGt: '',
    assetLt: '',
    assetType: '',
  };

  @observable assetLocalSwiperImg = {
    bgImgDistance: 0,
    distance: 0,
    activeImg: 0,
  };

  @observable assetLocalData = [];
  @observable assetLocalDetail = {};
  @observable assetLocalLoading = false;
  // --------------------------------------------

  /* 交易趋势 */
  @observable tradeTrendParams = {
    region: '',
    startDate: '',
    endDate: '',
  };
  @observable tradeTrendData = [];
  @observable tradeTrendLoading = false;
  // --------------------------------------------

  /* 地区分布 */
  @observable distributionParams = {
    type: '',
    region: '',
    startDate: '',
    endDate: '',
  };
  @observable distributionStaticKey = 'transactionTotal';
  @observable areaDistributionLoading = false;
  @observable areaDistributionDetailLoading = true;
  @observable areaDistributionResult = {};
  @observable distributionMapData = [];
  @observable distributionBar = { axis: [], data: [] };
  @observable distributionDetail = { region: '', data: {}, asset80Focus: 0 };

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
    this.assetLocalCancel = source.cancel;
  }

  @action.bound getAssetLocalDetail(params, openDetailModal) {
    entireLoadingStore.openEntireLoading();
    assetTransactionApi.getAssetLocalDetail(params)
      .then(action('get assset local detail', (resp) => {
        this.assetLocalDetail = resp.data;
        entireLoadingStore.closeEntireLoading();
        openDetailModal();
      }))
      .catch(action('get asset local detail catch', (err) => {
        console.log(err);
        entireLoadingStore.closeEntireLoading();
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
        this.tradeTrendData = result;
        this.tradeTrendLoading = false;
      }))
      .catch(action('get asset trend catch', (err) => {
        if (!axios.isCancel(err)) {
          console.log(err);
          this.tradeTrendLoading = false;
        }
      }));
    this.tradeTrendCancle = source.cancel;
  }

  @action.bound setDistributionParams(params) {
    this.distributionParams = params;
  }

  @action.bound setDistributionStaticKey(val) {
    const { mapData, barAxis, barData } = this.distributionMap(this.areaDistributionResult.basicData, val);
    const { type, startDate, endDate } = this.distributionParams;

    this.distributionStaticKey = val;
    this.distributionMapData = mapData;
    this.distributionBar.axis = barAxis;
    this.distributionBar.data = barData;

    let region = barAxis[barAxis.length - 1];
    region = region ? region.split('.')[1] : '';
    if (region) {
      this.getAreaDistributionDetail({ type, region, startDate, endDate });
    } else {
      this.setDetailData();
    }
  }

  @action.bound setDetailData() {
    this.distributionDetail.region = '';
    this.distributionDetail.data = {};
    this.distributionDetail.asset80Focus = 0;
    this.areaDistributionDetailLoading = false;
  }

  @action.bound getAreaDistribution(params) {
    const source = axios.CancelToken.source();
    const { type, startDate, endDate } = params;
    this.areaDistributionLoading = true;
    this.areaDistributionDetailLoading = true;
    assetTransactionApi.getAreaDistribution({ params: { type, startDate, endDate }, cancelToken: source.token })
      .then(action('get area distribution', (resp) => {
        const result = resp.data;
        const { mapData, barAxis, barData } = this.distributionMap(result.basicData, this.distributionStaticKey);
        this.distributionMapData = mapData;
        this.distributionBar.axis = barAxis;
        this.distributionBar.data = barData;
        this.areaDistributionResult = resp.data;
        this.areaDistributionLoading = false;
        let region = barAxis[barAxis.length - 1];
        region = region ? region.split('.')[1] : '';
        if (region) {
          this.getAreaDistributionDetail({ type, region, startDate, endDate });
        } else {
          this.setDetailData();
        }
      }))
      .catch(action('get area distribution catch', (err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.areaDistributionLoading = false;
          this.areaDistributionDetailLoading = false;
        }
      }));
    this.distributionCancel = source.cancel;
  }

  @action.bound getAreaDistributionDetail(params) {
    const source = axios.CancelToken.source();
    this.areaDistributionDetailLoading = true;
    assetTransactionApi.getAreaDistributionDetail({ params: params, cancelToken: source.token })
      .then(action('get area distribution detail', (resp) => {
        const basicData = this.areaDistributionResult.basicData;
        const region = params.region;
        if (basicData.length) {
          let newRegionData = {};
          for (let idx = 0; idx < basicData.length; idx++) {
            if (basicData[idx]._id === region) {
              newRegionData = basicData[idx];
              break;
            }
          }
          this.distributionDetail.region = region;
          this.distributionDetail.data = newRegionData;
          this.distributionDetail.asset80Focus = resp.data.asset80Focus;
        }
        this.areaDistributionDetailLoading = false;
      }))
      .catch(action('get area distribution detail catch', (err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.areaDistributionDetailLoading = false;
        }
      }));
    this.distributionDetailCancel = source.cancel;
  }

  @action.bound resetStore() {
    /* 本地资产 */
    this.assetLocalParams = {
      assignorType: '',
      region: '',
      assetGt: '',
      assetLt: '',
      assetType: '',
    };

    this.assetLocalSwiperImg = {
      bgImgDistance: 0,
      distance: 0,
      activeImg: 0,
    };

    this.assetLocalData = [];
    this.assetLocalDetail = {};
    this.assetLocalLoading = false;
    // --------------------------------------------

    /* 交易趋势 */
    this.tradeTrendParams = {
      region: '',
      startDate: '',
      endDate: '',
    };
    this.tradeTrendData = [];
    this.tradeTrendLoading = false;
    // --------------------------------------------

    /* 地区分布 */
    this.distributionParams = {
      type: '',
      region: '',
      startDate: '',
      endDate: '',
    };
    this.distributionStaticKey = 'transactionTotal';
    this.areaDistributionLoading = false;
    this.areaDistributionDetailLoading = true;
    this.areaDistributionResult = {};
    this.distributionMapData = [];
    this.distributionBar = { axis: [], data: [] };
    this.distributionDetail = { region: '', data: {}, asset80Focus: 0 };
  }
}
export default new AssetTransactionStore();