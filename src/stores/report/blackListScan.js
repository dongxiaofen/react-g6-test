import { observable, action } from 'mobx';
import { blackListScanApi } from 'api';
import pathval from 'pathval';
import axios from 'axios';
const CancelToken = axios.CancelToken;

class BlackListScanStore {
  @observable isMounted = false;
  scanModuleArr = [
    {title: '行政处罚', explain: '包括但不限于工商行政管理局等相关机构对企业的行政违法行为作出的处罚'},
    {title: '经营异常', explain: '工商行政管理局等相关机构对企业进行抽查检查时发现异常行为'},
    {title: '被金融机构起诉', explain: '因发生纠纷被银行、担保公司、信托公司等金融机构向人民法院起诉'},
    {title: '股权冻结', explain: '人民法院在进行诉讼保全或强制执行时，所采取的不准个人提取或转移财产的一种强制措施'},
    {title: '失信记录', explain: '被执行人具有履行能力而不履行生效法律文书确定的义务，同时通过各种手段违反相应的规章制度妨碍、抗拒执行，被人民法院依法列入失信记录'},
    {title: '税务黑名单', explain: '在纳税过程中存在违法行为，因此被税务机构依法公开相关信息及违法记录的企业或个人名单'},
    {title: '银联黑名单', explain: '在银联系统内发现的风险企业'},
    {title: '支付黑名单', explain: '支付协会内部发现的发生风险事件的企业'},
    {title: '老赖清单', explain: '网络借贷存在逾期不还的个人名单'},
    {title: '运营商黑名单', explain: '逾期欠费停机被销户的用户；恶意欠费用户；公安机关确定的涉嫌短信欺诈、诈骗等犯罪行为的用户;无主黑名单用户：符合上述条件的无客户资料的用户等'},
    {title: '企业主黑名单', explain: '存在对银行等金融机构逾期不还情况的企业主'},
    {title: '经营不善', explain: '在同地区同行业中各项经营指标相对落后的企业名单'},
  ];
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
  @observable nodeIntroVis = false;
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
          this.extend.main.ext = resp.data.blacklistNum !== 0 ? true : false;
          this.extend.main.subExt = resp.data.blacklistNum === 0 ? true : false;
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
          this.data.ready[1] = true;
          this.extend.related.ext = resp.data.blacklistNum !== 0 ? true : false;
          this.extend.related.subExt = resp.data.blacklistNum === 0 ? true : false;
        } else {
          this.data.statusReady[1] = true;
          this.statusReady();
        }
        this.apiCancel.relatedApi = null;
      }))
      .catch(action('scanRelated', err => {
        this.data.related = err;
        if (this.scanStatus.status === 'FINISH') {
          this.data.ready[1] = true;
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
          this.data.ready[2] = true;
          this.extend.network.ext = resp.data.blacklistNum !== 0 ? true : false;
          this.extend.network.subExt = resp.data.blacklistNum === 0 ? true : false;
        } else {
          this.data.statusReady[2] = true;
          this.statusReady();
        }
        this.apiCancel.networkApi = null;
      }))
      .catch(action('scanNetwork', err => {
        this.data.network = err;
        if (this.scanStatus.status === 'FINISH') {
          this.data.ready[2] = true;
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
