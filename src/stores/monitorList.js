import { observable, action } from 'mobx';
import axios from 'axios';
import pathval from 'pathval';
import messageStore from './message';
import uiStore from './ui';
import { monitorListApi } from 'api';
const CancelToken = axios.CancelToken;
class MonitorListStore {
  @observable activeList = 'deepMonitorList'; // monitorList, deepMonitorList
  @observable monitorList = {
    mainListCancel: null,
    mainCountCancel: null,
    monitorCount: {},
    mainList: {},
    pauseInfo: {
      visible: false,
      loading: false,
      monitorId: '',
      status: '',
      idx: '',
      relation: '',
      mMonitorId: '',
    },
    relationList: observable.map(),
    relationListStatus: observable.map({}),
    switchLoading: observable.map({}),
  }
  @observable deepMonitorList = {
    mainListCancel: null,
    mainCountCancel: null,
    monitorCount: {},
    mainList: {},
    pauseInfo: {
      visible: false,
      loading: false,
      monitorId: '',
      status: '',
      idx: '',
      relation: '',
      mMonitorId: '',
    },
    relationList: observable.map({}),
    relationListStatus: observable.map({}),
    switchLoading: observable.map({}),
  }
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound changeStatusInfo(params) {
    const activeList = this.activeList;
    Object.assign(this[activeList].pauseInfo, params);
  }
  @action.bound addRelatedCount(index) {
    const activeList = this.activeList;
    const relatedCount = this[activeList].mainList.content[index].relatedCount;
    this[activeList].mainList.content[index].relatedCount = relatedCount + 1;
  }
  @action.bound getMainCount() {
    const activeList = this.activeList;
    const {monitorStatus, companyName} = uiStore.uiState[activeList].params;
    this[activeList].monitorCount = {};
    if (this[activeList].mainCountCancel) {
      this[activeList].mainCountCancel();
      this[activeList].mainCountCancel = null;
    }
    const source = CancelToken.source();
    this[activeList].mainCountCancel = source.cancel;
    monitorListApi.getMonitorCount(activeList, {monitorStatus, companyName}, source)
      .then(action('getCount_success', resp => {
        this[activeList].mainCountCancel = null;
        this[activeList].monitorCount = resp.data || {error: true};
      }))
      .catch(action('getCount_error', err => {
        if (!axios.isCancel(err)) {
          this[activeList].mainCountCancel = null;
          this[activeList].monitorCount = {error: err.response.data};
        }
      }));
  }
  @action.bound getMainList() {
    const activeList = this.activeList;
    if (this[activeList].mainListCancel) {
      this[activeList].mainListCancel();
      this[activeList].mainListCancel = null;
    }
    const source = CancelToken.source();
    const mainParams = Object.assign({}, uiStore.uiState[activeList + 'Pager'], uiStore.uiState[activeList].params);
    delete mainParams.totalElements;
    this[activeList].mainListCancel = source.cancel;
    this[activeList].mainList = {};
    this[activeList].relationListStatus = observable.map({});
    monitorListApi.getMainList(activeList, mainParams, source)
      .then(action('getMainList_success', resp => {
        this[activeList].mainListCancel = null;
        uiStore.uiState[activeList + 'Pager'].totalElements = resp.data.totalElements;
        const data = resp.data.content && resp.data.content.length > 0 ? resp.data : {error: {message: '未查询到相关监控信息'}, content: []};
        this[activeList].mainList = data;
      }))
      .catch(action('getMainList_error', err => {
        if (!axios.isCancel(err)) {
          this[activeList].mainListCancel = null;
          this[activeList].mainList = {error: err.response.data, content: []};
        }
      }));
  }
  @action.bound getRelationList(monitorId) {
    const activeList = this.activeList;
    this[activeList].relationListStatus.set(monitorId, 'loading');
    monitorListApi.getRelList(activeList, monitorId)
      .then(action('getRelList_success', resp => {
        this[activeList].relationListStatus.set(monitorId, 'show');
        this[activeList].relationList.set(monitorId, resp.data);
      }))
      .catch(action('getRelList_success', err => {
        this[activeList].relationListStatus.set(monitorId, 'hide');
        messageStore.openMessage({
          type: 'error',
          content: err.response && err.response.data && err.response.data.message || '获取失败',
        });
      }));
  }
  @action.bound delRelationList(monitorId) {
    const activeList = this.activeList;
    this[activeList].relationListStatus.set(monitorId, 'hide');
    this[activeList].relationList.set(monitorId, null);
  }
  @action.bound changeStatus(params) {
    const activeList = this.activeList;
    const {monitorId, status, idx, relation, mMonitorId} = params || this[activeList].pauseInfo;
    this[activeList].switchLoading.set(monitorId, true);
    monitorListApi.changeMonitorStatus(activeList, {monitorId, status})
      .then(action('changeStatus_success', resp => {
        if (relation === 'main') {
          const {index, size, totalElements} = uiStore.uiState[activeList + 'Pager'];
          let newIndex = index;
          if (index === Math.ceil(totalElements / size) && totalElements % size === 1 && index !== 1) {
            newIndex = index - 1;
          }
          uiStore.uiState[activeList + 'Pager'].index = newIndex;
          this.getMainCount();
          this.getMainList();
          this[activeList].pauseInfo.visible = false;
          this[activeList].pauseInfo.loading = false;
        } else {
          this[activeList].relationList.get(mMonitorId)[idx] = Object.assign({}, this[activeList].relationList.get(mMonitorId)[idx], resp.data[0]);
        }
        this[activeList].switchLoading.set(monitorId, false);
        messageStore.openMessage({
          type: 'info',
          content: '修改成功',
        });
      }))
      .catch(action('changeStatus_error', err => {
        this[activeList].switchLoading.set(monitorId, false);
        this[activeList].pauseInfo.visible = false;
        this[activeList].pauseInfo.loading = false;
        messageStore.openMessage({
          type: 'error',
          content: err.response && err.response.data && err.response.data.message || '修改失败',
        });
      }));
  }
  @action.bound renewalAction(params) {
    const activeList = this.activeList;
    const {monitorId, time, successCb, errorCb} = params;
    monitorListApi.renewal(activeList, {monitorId, time})
      .then(action('renewal_success', resp => {
        const {index, size, totalElements} = uiStore.uiState[activeList + 'Pager'];
        let newIndex = index;
        if (index === Math.ceil(totalElements / size) && totalElements % size === 1 && index !== 1) {
          newIndex = index - 1;
        }
        uiStore.uiState[activeList + 'Pager'].index = newIndex;
        this.getMainCount();
        this.getMainList();
        successCb(resp);
      }))
      .catch(action('renewal_error', err => {
        errorCb(err);
      }));
  }
}

export default new MonitorListStore();
