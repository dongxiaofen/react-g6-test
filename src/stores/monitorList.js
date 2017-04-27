import { observable, action } from 'mobx';
import axios from 'axios';
import pathval from 'pathval';
import messageStore from './message';
import uiStore from './ui';
import { monitorListApi } from 'api';
const CancelToken = axios.CancelToken;
class MonitorListStore {
  mainListCancel = null;
  mainCountCancel = null;
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
    const {monitorStatus, companyName} = uiStore.uiState.monitorList.params;
    this.monitorCount = {};
    if (this.mainCountCancel) {
      this.mainCountCancel();
      this.mainCountCancel = null;
    }
    const source = CancelToken.source();
    this.mainCountCancel = source.cancel;
    monitorListApi.getMonitorCount({monitorStatus, companyName}, source)
      .then(action('getCount_success', resp => {
        this.mainCountCancel = null;
        this.monitorCount = resp.data;
      }))
      .catch(action('getCount_error', err => {
        if (!axios.isCancel(err)) {
          this.mainCountCancel = null;
          this.monitorCount = err.response.data;
        }
      }));
  }
  @action.bound getMainList() {
    if (this.mainListCancel) {
      this.mainListCancel();
      this.mainListCancel = null;
    }
    const source = CancelToken.source();
    const mainParams = Object.assign({}, uiStore.uiState.monitorListPager, uiStore.uiState.monitorList.params);
    delete mainParams.totalElements;
    this.mainListCancel = source.cancel;
    this.mainList = {};
    monitorListApi.getMainList(mainParams, source)
      .then(action('getMainList_success', resp => {
        this.mainListCancel = null;
        uiStore.uiState.monitorListPager.totalElements = resp.data.totalElements;
        const data = resp.data.content && resp.data.content.length > 0 ? resp.data : {error: {message: '未查询到相关监控信息'}, content: []};
        this.mainList = data;
      }))
      .catch(action('getMainList_error', err => {
        if (!axios.isCancel(err)) {
          this.mainListCancel = null;
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
