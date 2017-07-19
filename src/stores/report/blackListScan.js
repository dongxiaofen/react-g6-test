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
  reportId = '';
  @observable extend = {
    main: {
      ext: true,
      subExt: true,
    },
    related: {
      ext: true,
      subExt: true,
    },
    network: {
      ext: true,
      subExt: true,
    },
  };
  @observable data = {
    main: {},
    related: {},
    network: {},
    statusReady: [false, false, false],
    ready: [false, false, false], // 分别代表三个模块是否扫描完成
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
    this.reportId = reportId;
    this.isMounted = true;
    const source = CancelToken.source();
    this.apiCancel.statusApi = source.cancel;
    blackListScanApi.getStatus(reportId, source)
      .then(action('getStatus', (resp) => {
        this.scanStatus = resp.data;
        // this.scanStatus.status = 'FINISH'; // PROCESSING FIRST_TIME FINISH
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
        this.scanStatus = {error: err};
      }));
  }
  @action.bound statusReady() {
    if (this.data.statusReady.every(item => item === true)) {
      this.getStatus(this.reportId);
      this.data.statusReady = [false, false, false];
    }
  }
  @action.bound scanMain(reportId) {
    const source = CancelToken.source();
    this.apiCancel.mainApi = source.cancel;
    blackListScanApi.scanMain(reportId, source)
      .then(action('scanMain', resp => {
        this.data.main = resp.data;
        if (this.scanStatus.status === 'FINISH') {
          this.data.ready[0] = true;
        } else {
          this.data.statusReady[0] = true;
          this.statusReady();
        }
        this.apiCancel.mainApi = null;
      }))
      .catch(action('scanMain', err => {
        this.data.main = err;
        if (this.scanStatus.status === 'FINISH') {
          this.data.ready[0] = true;
        } else {
          this.data.statusReady[0] = true;
          this.statusReady();
        }
        this.apiCancel.mainApi = null;
      }));
  }
  @action.bound scanRelated(reportId) {
    const source = CancelToken.source();
    this.apiCancel.relatedApi = source.cancel;
    blackListScanApi.scanRelated(reportId, source)
      .then(action('scanRelated', resp => {
        this.data.related = resp.data;
        if (this.scanStatus.status === 'FINISH') {
          this.data.ready[0] = true;
        } else {
          this.data.statusReady[1] = true;
          this.statusReady();
        }
        this.apiCancel.relatedApi = null;
      }))
      .catch(action('scanRelated', err => {
        this.data.related = err;
        if (this.scanStatus.status === 'FINISH') {
          this.data.ready[0] = true;
        } else {
          this.data.statusReady[1] = true;
          this.statusReady();
        }
        this.apiCancel.relatedApi = null;
      }));
  }
  @action.bound scanNetwork(reportId) {
    const source = CancelToken.source();
    this.apiCancel.networkApi = source.cancel;
    blackListScanApi.scanNetwork(reportId, source)
      .then(action('scanNetwork', resp => {
        this.data.network = resp.data;
        if (this.scanStatus.status === 'FINISH') {
          this.data.ready[0] = true;
        } else {
          this.data.statusReady[2] = true;
          this.statusReady();
        }
        this.apiCancel.networkApi = null;
      }))
      .catch(action('scanNetwork', err => {
        this.data.network = err;
        if (this.scanStatus.status === 'FINISH') {
          this.data.ready[0] = true;
        } else {
          this.data.statusReady[2] = true;
          this.statusReady();
        }
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
    this.process = 0;
    this.extend = {
      main: {
        ext: true,
        subExt: true,
      },
      related: {
        ext: true,
        subExt: true,
      },
      network: {
        ext: true,
        subExt: true,
      },
    };
    this.data = {
      main: {},
      related: {},
      network: {},
      statusReady: [false, false, false],
      ready: [false, false, false],
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
