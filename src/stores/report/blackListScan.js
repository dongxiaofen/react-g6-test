import { observable, action } from 'mobx';
import { blackListScanApi } from 'api';
import pathval from 'pathval';
import axios from 'axios';
const CancelToken = axios.CancelToken;

class BlackListScanStore {
  @observable isMounted = false;
  @observable process = 0;
  apiCancel = {
    statusApi: null,
    mainApi: null,
    relatedApi: null,
    networkApi: null,
  };
  apiInterval = null;
  @observable data = {
    main: {},
    related: {},
    network: {},
    ready: false,
  };
  @observable scanStatus = {
    canScan: false,
    status: undefined,
  };
  @action.bound setValue(path, value) {
    pathval.setPathValue(this, path, value);
  }
  @action.bound processIncrease() {
    this.process = this.process + 1;
  }
  @action.bound getStatus(reportId) {
    this.isMounted = true;
    const source = CancelToken.source();
    this.apiCancel.statusApi = source.cancel;
    blackListScanApi.getStatus(reportId, source)
      .then(action('getStatus', (resp) => {
        this.scanStatus = resp.data;
        this.scanStatus = {
          canScan: true,
          status: 'FIRST_TIME', // PROCESSING FIRST_TIME FINISH
        };
        if (resp.data.status === 'PROCESSING') {
          this.apiInterval = setTimeout(() => {
            this.getStatus(reportId);
          }, 10 * 1000);
        } else if (resp.data.status === 'FINISH') {
          this.scanMain(reportId);
          this.scanRelated(reportId);
          this.scanNetwork(reportId);
        }
      }))
      .catch(action('getStatus', err => {
        console.log(err);
        this.scanStatus = {status: 'FIRST_TIME'};
      }));
  }
  @action.bound scanMain(reportId) {
    const source = CancelToken.source();
    this.apiCancel.mainApi = source.cancel;
    blackListScanApi.scanMain(reportId, source)
      .then(action('scanMain', resp => {
        this.main = resp.data;
        this.apiCancel.mainApi = null;
      }))
      .catch(action('scanMain', err => {
        this.main = err;
        this.apiCancel.mainApi = null;
      }));
  }
  @action.bound scanRelated(reportId) {
    const source = CancelToken.source();
    this.apiCancel.relatedApi = source.cancel;
    blackListScanApi.scanRelated(reportId, source)
      .then(action('scanRelated', resp => {
        this.related = resp.data;
        this.apiCancel.relatedApi = null;
      }))
      .catch(action('scanRelated', err => {
        this.related = err;
        this.apiCancel.relatedApi = null;
      }));
  }
  @action.bound scanNetwork(reportId) {
    const source = CancelToken.source();
    this.apiCancel.networkApi = source.cancel;
    blackListScanApi.scanNetwork(reportId, source)
      .then(action('scanNetwork', resp => {
        this.network = resp.data;
        this.apiCancel.networkApi = null;
      }))
      .catch(action('scanNetwork', err => {
        this.network = err;
        this.apiCancel.networkApi = null;
      }));
  }
  @action.bound cancelAllApi() {
    Object.keys(this.apiCancel).forEach(cancelKey => {
      if (this.apiCancel[cancelKey]) {
        this.apiCancel[cancelKey]();
        this.apiCancel[cancelKey] = null;
      }
    });
  }
  @action.bound resetStore() {
    this.isMounted = false;
    this.data = {
      main: {},
      relation: {},
      network: {},
      ready: false,
    };
    this.scanStatus = {
      canScan: false,
      status: undefined,
    };
    this.cancelAllApi();
    clearInterval(this.apiInterval);
  }
}

export default new BlackListScanStore();