import { observable, action } from 'mobx';
import axios from 'axios';
import pathval from 'pathval';
import messageStore from './message';
import { monitorListApi } from 'api';
const CancelToken = axios.CancelToken;
class MonitorListStore {
  axiosCancel = [];
  @observable searchInput = '';
  @observable sortDirection = {
    startTm: 'DESC',
    expireDt: 'DESC',
    latestTs: 'DESC',
  };
  @observable searchParams = {
    companyName: '',
    sort: 'startTm,DESC',
    monitorStatus: '',
    index: 1,
    size: 10,
  };
  @observable monitorCount = {};
  @observable mainList = {};
  @observable pauseInfo = {
    visible: false,
    loading: false,
    monitorId: '',
    status: '',
    index: '',
    relation: '',
    mMonitorId: '',
  };
  relationList = observable.map({});
  relationListStatus = observable.map({});
  switchLoading = observable.map({});
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound changeParams(params) {
    Object.assign(this.searchParams, params);
  }
  @action.bound changeStatusInfo(params) {
    Object.assign(this.pauseInfo, params);
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
        messageStore.openMessage({
          type: 'error',
          content: err.response && err.response.data && err.response.data.message || '获取失败',
        });
      }));
  }
  @action.bound delRelationList(monitorId) {
    this.relationListStatus.set(monitorId, 'hide');
    this.relationList.set(monitorId, null);
  }
  @action.bound changeStatus(params) {
    const {monitorId, status, index, relation, mMonitorId} = params || this.pauseInfo;
    this.switchLoading.set(monitorId, true);
    monitorListApi.changeMonitorStatus({monitorId, status})
      .then(action('changeStatus_success', resp => {
        if (relation === 'main') {
          this.mainList.content[index] = resp.data.slice(-1)[0];
          this.relationList.set(monitorId, resp.data.slice(0, -1));
          this.pauseInfo.visible = false;
          this.pauseInfo.loading = false;
        } else {
          this.relationList.get(mMonitorId)[index] = resp.data[0];
        }
        this.switchLoading.set(monitorId, false);
        messageStore.openMessage({
          type: 'info',
          content: '修改成功',
        });
      }))
      .catch(action('changeStatus_error', err => {
        this.switchLoading.set(monitorId, false);
        this.pauseInfo.visible = false;
        this.pauseInfo.loading = false;
        messageStore.openMessage({
          type: 'error',
          content: err.response && err.response.data && err.response.data.message || '修改失败',
        });
      }));
  }
  @action.bound renewalAction(params) {
    const {monitorId, time, index, successCb, errorCb} = params;
    monitorListApi.renewal({monitorId, time})
      .then(action('renewal_success', resp => {
        this.mainList.content[index] = resp.data;
        successCb(resp);
      }))
      .catch(action('renewal_error', err => {
        errorCb(err);
      }));
  }
}

export default new MonitorListStore();
