import { observable, action } from 'mobx';
// import axios from 'axios';
import pathval from 'pathval';
import { monitorListApi } from 'api';

class MonitorListStore {
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
  @action.bound getMainList() {
    const mainParams = this.searchParams;
    const {monitorStatus, companyName} = mainParams;
    monitorListApi.getMonitorCount({monitorStatus, companyName})
    .then(action('getCount_success', resp => {
      this.monitorCount = resp.data;
    }))
    .catch(action('getCount_error', err => {
      this.monitorCount = err.response.data;
    }));
    monitorListApi.getMainList(mainParams)
    .then(action('getMainList_success', resp => {
      this.mainList = resp.data;
    }))
    .catch(action('getMainList_error', err => {
      this.mainList = err.response.data;
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
