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
  relationListStatus = observable.map({});
  switchLoading = observable.map({});
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound changeParams(params) {
    Object.assign(this.searchParams, params);
  }
  @action.bound getMainCount() {
    const {monitorStatus, companyName} = this.searchParams;
    this.monitorCount = {};
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
    this.mainList = {};
    monitorListApi.getMainList(mainParams, source)
      .then(action('getMainList_success', resp => {
        this.axiosCancel.pop();
        const data = resp.data.content && resp.data.content.length > 0 ? resp.data : {error: {message: '未查询到相关监控信息'}, content: []};
        this.mainList = data;
      }))
      .catch(action('getMainList_error', err => {
        if (!axios.isCancel(err)) {
          this.axiosCancel.pop();
          this.mainList = {error: err.response.data, content: []};
        }
      }));
  }
  @action.bound getRelationList(monitorId) {
    this.relationListStatus.set(monitorId, 'loading');
    monitorListApi.getRelList(monitorId)
      .then(action('getRelList_success', resp => {
        this.relationListStatus.set(monitorId, 'show');
        this.relationList.set(monitorId, resp.data);
      }))
      .catch(action('getRelList_success', err => {
        this.relationListStatus.set(monitorId, 'hide');
        this.relationList.set(monitorId, err.response.data);
      }));
  }
  @action.bound delRelationList(monitorId) {
    this.relationListStatus.set(monitorId, 'hide');
    this.relationList.set(monitorId, null);
  }
  @action.bound changeStatus(params) {
    const {monitorId, status, index, relation, mMonitorId} = params;
    this.switchLoading.set(monitorId, true);
    monitorListApi.changeMonitorStatus({monitorId, status})
      .then(action('changeStatus_success', resp => {
        if (relation === 'main') {
          this.mainList.content[index] = resp.data.slice(-1)[0];
          this.relationList.set(monitorId, resp.data.slice(0, -1));
        } else {
          this.relationList.get(mMonitorId)[index] = resp.data[0];
        }
        this.switchLoading.set(monitorId, false);
      }))
      .catch(action('changeStatus_error', err => {
        this.switchLoading.set(monitorId, false);
        console.log(err);
      }));
  }
}

export default new MonitorListStore();
