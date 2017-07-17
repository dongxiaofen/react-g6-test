import { observable, action } from 'mobx';
import { blackListScanApi } from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;

class BlackListScanStore {
  @observable isMounted = false;
  apiCancel = {
    statusApi: null,
    mainApi: null,
    relatedApi: null,
    networkApi: null,
  };
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
  @action.bound getStatus(reportId) {
    this.isMounted = true;
    const source = CancelToken.source();
    this.apiCancel.statusApi = source.cancel;
    blackListScanApi.getStatus(reportId, source)
      .then(action('getStatus', (resp) => {
        this.scanStatus = resp.data;
        this.scanStatus = {
          canScan: true,
          status: 'FIRST_TIME',
        };
      }))
      .catch(action('getStatus', err => {
        this.scanStatus = err;
      }));
  }
  @action.bound scanMain(reportId) {
    const source = CancelToken.source();
    this.apiCancel.mainApi = source.cancel;
    blackListScanApi.scanMain(reportId, source)
      .then(action('scanMain', resp => {
        this.main = resp.data;
      }))
      .catch(action('scanMain', err => {
        this.main = err;
      }));
  }
  @action.bound scanRelated(reportId) {
    const source = CancelToken.source();
    this.apiCancel.relatedApi = source.cancel;
    blackListScanApi.scanRelated(reportId, source)
      .then(action('scanRelated', resp => {
        this.related = resp.data;
      }))
      .catch(action('scanRelated', err => {
        this.related = err;
      }));
  }
  @action.bound scanNetwork(reportId) {
    const source = CancelToken.source();
    this.apiCancel.networkApi = source.cancel;
    blackListScanApi.scanNetwork(reportId, source)
      .then(action('scanNetwork', resp => {
        this.network = resp.data;
      }))
      .catch(action('scanNetwork', err => {
        this.network = err;
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
  }
}

export default new BlackListScanStore();
