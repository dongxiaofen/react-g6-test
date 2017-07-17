import { observable, action } from 'mobx';
import { blackListScanApi } from 'api';

class BlackListScanStore {
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
    blackListScanApi.getStatus(reportId)
      .then(action('getStatus', (resp) => {
        // this.scanStatus = resp.data;
        console.log(resp);
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
    blackListScanApi.scanMain(reportId)
      .then(action('scanMain', resp => {
        this.main = resp.data;
      }))
      .catch(action('scanMain', err => {
        this.main = err;
      }));
  }
  @action.bound scanRelated(reportId) {
    blackListScanApi.scanRelated(reportId)
      .then(action('scanRelated', resp => {
        this.related = resp.data;
      }))
      .catch(action('scanRelated', err => {
        this.related = err;
      }));
  }
  @action.bound scanNetwork(reportId) {
    blackListScanApi.scanNetwork(reportId)
      .then(action('scanNetwork', resp => {
        this.network = resp.data;
      }))
      .catch(action('scanNetwork', err => {
        this.network = err;
      }));
  }
  @action.bound resetStore() {
    this.data = {
      main: {},
      relation: {},
      network: {},
      ready: false,
    };
    this.scanStatus = {};
  }
}

export default new BlackListScanStore();
