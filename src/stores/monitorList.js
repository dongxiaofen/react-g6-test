import { observable, action } from 'mobx';
import axios from 'axios';
import pathval from 'pathval';
import { monitorListApi } from 'api';
const CancelToken = axios.CancelToken;
class MonitorListStore {
  axiosCancel = [];
  @observable searchInput = '';
  @observable sortDirection = {
    start_tm: 'DESC',
    expire_dt: 'DESC',
    latestTs: 'DESC',
  };
  @observable searchParams = {
    companyName: '',
    sort: 'start_tm,DESC',
    monitorStatus: '',
    index: 1,
    size: 10,
  };
  @observable monitorCount = {};
  @observable mainList = {};
  relationList = observable.map({});
  @observable relationShow = {};
  @observable relationLoading = {};
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound changeParams(params) {
    Object.assign(this.searchParams, params);
  }
  @action.bound getMainCount() {
    const {monitorStatus, companyName} = this.searchParams;
    monitorListApi.getMonitorCount({monitorStatus, companyName})
      .then(action('getCount_success', resp => {
        this.monitorCount = resp.data;
      }))
      .catch(action('getCount_error', err => {
        this.monitorCount = err.response.data;
      }));
  }
  @action.bound getMainList() {
    if (this.axiosCancel[0]) {
      const cancel = this.axiosCancel.pop();
      cancel();
    }
    const source = CancelToken.source();
    const mainParams = this.searchParams;
    this.axiosCancel.push(source.cancel);
    monitorListApi.getMainList(mainParams, source)
      .then(action('getMainList_success', resp => {
        this.axiosCancel.pop();
        this.mainList = resp.data;
      }))
      .catch(action('getMainList_error', err => {
        if (!axios.isCancel(err)) {
          this.axiosCancel.pop();
          this.mainList = err.response.data;
        }
      }));
  }
  @action.bound getRelationList(monitorId) {
    monitorListApi.getRelList(monitorId)
      .then(action('getRelList_success', resp => {
        this.relationList.set(monitorId, resp.data);
      }))
      .catch(action('getRelList_success', err => {
        this.relationList.set(monitorId, err.response.data);
      }));
  }
  @action.bound delRelationList(monitorId) {
    this.relationList[monitorId] = null;
  }
}

export default new MonitorListStore();
