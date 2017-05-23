import { observable, action } from 'mobx';
import axios from 'axios';
import pathval from 'pathval';
import messageStore from './message';
import uiStore from './ui';
import { monitorListApi } from 'api';
const CancelToken = axios.CancelToken;
class MonitorListStore {
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
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound changeStatusInfo(params) {
    Object.assign(this.monitorList.pauseInfo, params);
  }
  @action.bound addRelatedCount(index) {
    const relatedCount = this.monitorList.mainList.content[index].relatedCount;
    this.monitorList.mainList.content[index].relatedCount = relatedCount + 1;
  }
  @action.bound getMainCount() {
    const {monitorStatus, companyName} = uiStore.uiState.monitorList.params;
    this.monitorList.monitorCount = {};
    if (this.monitorList.mainCountCancel) {
      this.monitorList.mainCountCancel();
      this.monitorList.mainCountCancel = null;
    }
    const source = CancelToken.source();
    this.monitorList.mainCountCancel = source.cancel;
    monitorListApi.getMonitorCount({monitorStatus, companyName}, source)
      .then(action('getCount_success', resp => {
        this.monitorList.mainCountCancel = null;
        this.monitorList.monitorCount = resp.data || {error: true};
      }))
      .catch(action('getCount_error', err => {
        if (!axios.isCancel(err)) {
          this.monitorList.mainCountCancel = null;
          this.monitorList.monitorCount = {error: err.response.data};
        }
      }));
  }
  @action.bound getMainList() {
    if (this.monitorList.mainListCancel) {
      this.monitorList.mainListCancel();
      this.monitorList.mainListCancel = null;
    }
    const source = CancelToken.source();
    const mainParams = Object.assign({}, uiStore.uiState.monitorListPager, uiStore.uiState.monitorList.params);
    delete mainParams.totalElements;
    this.monitorList.mainListCancel = source.cancel;
    this.monitorList.mainList = {};
    this.monitorList.relationListStatus = observable.map({});
    monitorListApi.getMainList(mainParams, source)
      .then(action('getMainList_success', resp => {
        this.monitorList.mainListCancel = null;
        uiStore.uiState.monitorListPager.totalElements = resp.data.totalElements;
        const data = resp.data.content && resp.data.content.length > 0 ? resp.data : {error: {message: '未查询到相关监控信息'}, content: []};
        this.monitorList.mainList = data;
      }))
      .catch(action('getMainList_error', err => {
        if (!axios.isCancel(err)) {
          this.monitorList.mainListCancel = null;
          this.monitorList.mainList = {error: err.response.data, content: []};
        }
      }));
  }
  @action.bound getRelationList(monitorId, count) {
    if (count === 0) {
      this.monitorList.relationListStatus.set(monitorId, 'show');
      this.monitorList.relationList.set(monitorId, []);
      return false;
    }
    this.monitorList.relationListStatus.set(monitorId, 'loading');
    monitorListApi.getRelList(monitorId)
      .then(action('getRelList_success', resp => {
        this.monitorList.relationListStatus.set(monitorId, 'show');
        this.monitorList.relationList.set(monitorId, resp.data);
      }))
      .catch(action('getRelList_success', err => {
        this.monitorList.relationListStatus.set(monitorId, 'hide');
        messageStore.openMessage({
          type: 'error',
          content: err.response && err.response.data && err.response.data.message || '获取失败',
        });
      }));
  }
  @action.bound delRelationList(monitorId) {
    this.monitorList.relationListStatus.set(monitorId, 'hide');
    this.monitorList.relationList.set(monitorId, null);
  }
  @action.bound changeStatus(params) {
    const {monitorId, status, idx, relation, mMonitorId} = params || this.monitorList.pauseInfo;
    this.monitorList.switchLoading.set(monitorId, true);
    monitorListApi.changeMonitorStatus({monitorId, status})
      .then(action('changeStatus_success', resp => {
        if (relation === 'main') {
          const {index, size, totalElements} = uiStore.uiState.monitorListPager;
          let newIndex = index;
          if (index === Math.ceil(totalElements / size) && totalElements % size === 1 && index !== 1) {
            newIndex = index - 1;
          }
          uiStore.uiState.monitorListPager.index = newIndex;
          this.getMainCount();
          this.getMainList();
          this.monitorList.pauseInfo.visible = false;
          this.monitorList.pauseInfo.loading = false;
        } else {
          this.monitorList.relationList.get(mMonitorId)[idx] = Object.assign({}, this.monitorList.relationList.get(mMonitorId)[idx], resp.data[0]);
        }
        this.monitorList.switchLoading.set(monitorId, false);
        messageStore.openMessage({
          type: 'info',
          content: '修改成功',
        });
      }))
      .catch(action('changeStatus_error', err => {
        this.monitorList.switchLoading.set(monitorId, false);
        this.monitorList.pauseInfo.visible = false;
        this.monitorList.pauseInfo.loading = false;
        messageStore.openMessage({
          type: 'error',
          content: err.response && err.response.data && err.response.data.message || '修改失败',
        });
      }));
  }
  @action.bound renewalAction(params) {
    const {monitorId, time, successCb, errorCb} = params;
    monitorListApi.renewal({monitorId, time})
      .then(action('renewal_success', resp => {
        const {index, size, totalElements} = uiStore.uiState.monitorListPager;
        let newIndex = index;
        if (index === Math.ceil(totalElements / size) && totalElements % size === 1 && index !== 1) {
          newIndex = index - 1;
        }
        uiStore.uiState.monitorListPager.index = newIndex;
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
