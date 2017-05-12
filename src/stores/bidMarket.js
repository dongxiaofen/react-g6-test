import { observable, action } from 'mobx';
import { bidMarketApi } from 'api';
import uiStore from './ui';
import messageStore from './message';

class BidMarketStore {
  @observable params = {};
  @observable mapLoading = true;
  @observable trendLoading = true;
  @observable rankLoading = true;
  @observable infoLoading = true;
  @observable detailLoading = false;

  @observable areaInfo = [];
  @observable detailTitleData = {};
  @observable detailContent = '';

  @action.bound setParams(params) {
    this.params = params;
  }

  // 全国分布
  @action.bound getAll(params) {
    bidMarketApi.getAll(params)
      .then(action('get all', (resp) => {
        console.log(resp.data, '--------getAll');
        this.mapLoading = false;
      }))
      .catch(action('get all catch', (err) => {
        console.log(err.response);
        this.mapLoading = false;
      }));
  }

  // 中标信息
  @action.bound getInfo(params) {
    this.infoLoading = true;
    bidMarketApi.getInfo(params)
      .then(action('get info', (resp) => {
        this.areaInfo = resp.data.content;
        uiStore.uiState.bidMarketInfo.totalElements = resp.data.totalElements;
        this.infoLoading = false;
      }))
      .catch(action('get info catch', (err) => {
        console.log(err);
        this.infoLoading = false;
      }));
  }

  // 招投标信息详情
  @action.bound getBidMarketDetail(announceId, key, openModal) {
    this.detailLoading = true;
    bidMarketApi.getBidMarketDetail(announceId)
      .then(action('get bidMarket detail', (resp) => {
        console.log(resp);
        this.detailTitleData = this.areaInfo[key];
        this.detailContent = resp.data.result;
        this.detailLoading = false;
        openModal();
      }))
      .catch(action('get bidMarket detail err', (err) => {
        console.log(err);
        messageStore.openMessage({ type: 'warning', content: '获取招投标详情失败' });
        this.detailLoading = false;
      }));
  }

  // 重置数据
  @action.bound resetStore() {
    uiStore.uiState.bidMarketInfo.index = 1;
    uiStore.uiState.bidMarketInfo.totalElements = 0;
    this.params = {};
    this.areaInfo = [];
  }
}
export default new BidMarketStore();
