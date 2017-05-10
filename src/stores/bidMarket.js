import { observable, action } from 'mobx';
import { bidMarketApi } from 'api';

class BidMarketStore {
  @observable params = {};
  @observable mapLoading = true;
  @observable trendLoading = true;
  @observable rankLoading = true;
  @observable infoLoading = true;

  @action.bound setParams(params) {
    this.params = params;
  }

  // 全国分布
  @action.bound getAll(params) {
    bidMarketApi.getAll(params)
      .then(action('get all', (resp) => {
        console.log(resp.data);
        this.mapLoading = false;
      }))
      .catch(action('get all catch', (err) => {
        console.log(err.response);
        this.mapLoading = false;
      }));
  }

  // 中标信息
  @action.bound getInfo(params) {
    bidMarketApi.getInfo(params)
      .then(action('get info', (resp) => {
        console.log(resp.data);
        this.infoLoading = false;
      }))
      .catch(action('get info catch', (err) => {
        console.log(err.response);
        this.infoLoading = false;
      }));
  }
}
export default new BidMarketStore();
