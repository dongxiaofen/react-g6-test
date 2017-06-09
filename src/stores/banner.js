import { observable, action, runInAction } from 'mobx';
import { browserHistory } from 'react-router';
import { companyHomeApi } from 'api';
import modalStore from './modal';
import messageStore from './message';
import payModalStore from './payModal';
import companyHomeStore from './companyHome';
const bannerDataTest = {
  'bannerInfo': {
    'bannerInfo': {
      'index': [
        {
          'url': 'http://mi.com',
          'status': null
        },
        {
          'url': 'http://xiaomi.com',
          'status': null
        }
      ],
      'scale': '1000人以上',
      'email': [
        'wulihua@xiaomi.com'
      ],
      'phone': [
        '010-64051516',
        '010-52255991'
      ],
      'address': [
        {
          'time': '2017-02-03 00:00:00',
          'source': 'jobui',
          'address': '北京市海淀区清河中街68号 华润五彩城写字楼',
          'location': {
            'lat': 40.03616174650678,
            'lon': 116.33936332310091
          }
        },
        {
          'time': '2016-12-29 00:00:00',
          'source': 'lagou',
          'address': '北京北京市海淀区五彩城',
          'location': {
            'lat': 40.03620110641631,
            'lon': 116.34291522308736
          }
        },
        {
          'time': '2010-04-10 00:00:00',
          'source': 'yepage',
          'address': '北京市 朝阳区 望京西路甲50号-1卷 石天地大厦A座13层',
          'location': {
            'lat': 39.98941935697803,
            'lon': 116.4643470049087
          }
        }
      ],
      'companyStatus': '',
      'riskInfo': [
        {
          historyFlag: 'false',
          lastestPublishTime: '2016-05-09',
          name: '中国工商银行股份有限公司',
          riskType: '被银行起诉',
        }
      ],
      'historyName': [
        {
          name: '重庆誉存大数据科技有限公司',
          time: '2016-11-02'
        },
        {
          name: '杭州誉存科技有限公司',
          time: '2016-11-02'
        },
      ]
    },
    'industryList': [
      8
    ],
    'featureIndustry': {
      'result': {
        'industryType': [
          '软件和信息技术服务业'
        ]
      }
    }
  },
  'name': '北京小米科技有限责任公司',
  collection: false,
};
class BannerStore {
  windowReload() {
    window.location.reload();
  }

  // banner
  @observable monitorId = '';
  @observable reportId = '';
  // @observable score = '';

  @observable isLoading = true;
  @observable hisNameVis = false;
  @observable contactVis = false;
  @observable bannerInfoData = {};
  @observable contactExtended = '';
  // @observable historyName = [];
  // @observable riskInfo = [];
  // @observable industryNames = [];
  // @observable bannerData = {};
  // @observable monitorStatus = '';
  // @observable lastModifiedTs = '获取中...';
  // @observable refreshStatus = 'complete';
  // @observable searchedCount = '';
  // @observable lastModifiedTs = '';
  // @observable collection = false;
  // @observable mainStatus = '';
  // 时间
  @observable reportDate = '';
  @observable monitorDate = '';
  // 上市代码
  @observable stockCode = '';

  // 下载pdf配置
  @observable pdfDownloadConfig = {
    levelOne: [
      { label: '信息概览', value: 'SUMMARY', checked: false },
      { label: '企业基本信息', value: 'CORP', checked: false },
      { label: '税务信息', value: 'TAX', checked: false },
      { label: '上市披露', value: 'STOCK', checked: false },
      { label: '关联网络', value: 'NETWORK', checked: false },
      { label: '风险信息', value: 'RISK', checked: false },
      { label: '新闻信息', value: 'NEWS', checked: false },
      { label: '经营信息', value: 'OPERATION', checked: false },
      { label: '团队信息', value: 'TEAM', checked: false },
    ],
    levelTwo: {
      'SUMMARY': [],
      'CORP': [
        { label: '工商基本信息', value: 'CORP_BASIC', checked: false },
        { label: '工商变更', value: 'CORP_ALTER', checked: false },
        { label: '对外投资任职', value: 'CORP_INV_POS', checked: false },
        { label: '企业年报', value: 'CORP_YEAR_REPORT', checked: false },
      ],
      'TAX': [],
      'STOCK': [
        { label: '公司概况', value: 'STOCK_INFO', checked: false },
        { label: '公司公告', value: 'STOCK_ANNOUNCEMENT', checked: false },
      ],
      'NETWORK': [
        { label: '关联关系', value: 'NETWORK_RELEVANCE', checked: false },
        { label: '风险关系', value: 'NETWORK_BLACKLIST', checked: false },
      ],
      'RISK': [
        { label: '判决文书', value: 'RISK_JUDGEMENT', checked: false },
        { label: '法院公告', value: 'RISK_ANNOUNCEMENT', checked: false },
        { label: '开庭公告', value: 'RISK_NOTICE', checked: false },
        { label: '被执行人信息', value: 'RISK_EXECUTE', checked: false },
        { label: '失信被执行人', value: 'RISK_DISHONESTY', checked: false },
        { label: '涉诉资产', value: 'RISK_LITIGATION', checked: false },
        { label: '纳税信用', value: 'RISK_TAXATION', checked: false },
        { label: '经营异常', value: 'RISK_ABNORMAL', checked: false },
        { label: '抽查检查', value: 'RISK_CHECK', checked: false },
      ],
      'NEWS': [],
      'OPERATION': [
        { label: '招投标', value: 'OPERATION_BIDDING', checked: false },
        { label: '专利', value: 'OPERATION_PATENT', checked: false },
        { label: '商标', value: 'OPERATION_TRADEMARK', checked: false },
      ],
      'TEAM': [
        { label: '招聘/员工背景', value: 'TEAM_RECRUITMENT_RESUME', checked: false },
        { label: '团队监控分析', value: 'TEAM_ANALYSIS', checked: false },
      ]
    },
  };

  // 需要下载的keys
  @observable pdfDownloadKeys = [];

  @observable isAllChecked = false;

  // 添加/取消收藏loading
  @observable collectionLoading = false;

  // 恢复监控loading
  @observable reStoreLoading = false;

  closeHisNamePopoverAlias = this.closeHisNamePopover;
  openHisNamePopoverAlias = this.openHisNamePopover;
  closeContactPopoverAlias = this.closeContactPopover;
  openContactPopoverAlias = this.openContactPopover;
  extendContactAlias = this.extendContact;

  @action.bound setPdfDownloadKeys(keys) {
    this.pdfDownloadKeys = keys;
  }

  @action.bound closeHisNamePopover() {
    this.hisNameVis = false;
  }
  @action.bound openHisNamePopover() {
    this.hisNameVis = true;
  }
  @action.bound closeContactPopover() {
    this.contactVis = false;
  }
  @action.bound openContactPopover() {
    this.contactVis = true;
  }
  @action.bound extendContact(key) {
    this.contactExtended = this.contactExtended === key ? '' : key;
  }
  // 刷新报告
  refreshRepConfirm = () => {
    this.refreshReport();
  };
  @action.bound refreshModal = () => {
    modalStore.openCompModal({
      title: '刷新报告',
      width: 420,
      isSingleBtn: true,
      confirmAction: this.refreshRepConfirm,
      loader: () => {}
    });
  };
  @action.bound createBasicReport(params) {
    companyHomeApi.createBasicReport({companyName: params.companyName})
    .then(action('createBasicReport', (resp)=>{
      companyHomeStore.reportInfo.basicReportId = resp.data.basicReportId;
      this.getBannerInfo({companyName: params.companyName});
    }))
    .catch(action('createBasicReport err', (error)=>{
      console.log(error);
    }));
  }
  @action.bound getReportStatus(params) {
    this.isLoading = true;
    companyHomeApi.getReportStatus(params)
    .then(action('getReportStatus', (resp)=>{
      if (resp.data.basicReportId || resp.data.reportId) {
        this.getBannerInfo({companyName: params.companyName});
        companyHomeStore.updateValue('reportInfo', Object.assign(companyHomeStore.reportInfo, resp.data));
      } else {
        this.createBasicReport({companyName: params.companyName});
      }
    }))
    .catch(action('getReportStatus err', (error)=>{
      console.log(error);
    }));
  }

  @action.bound getBannerInfo(params) {
    this.isLoading = true;
    companyHomeApi.getBannerInfo(params)
      .then(action('get banner info...', (resp) => {
        console.log(resp.data);
        this.bannerInfoData = bannerDataTest;
        this.isLoading = false;
      }))
      .catch(action('banner err', (err) => {
        console.log('banner出错', err);
        this.bannerInfoData = bannerDataTest;
        this.isLoading = false;
      }));
  }
  @action.bound toggleMonitorStatus(monitorId, status) {
    companyHomeApi.toggleMonitorStatus(monitorId, status)
      .then(action('toggle monitor status', (resp) => {
        this.monitorStatus = resp.data[0].status;
      }))
      .catch((err) => {
        console.log('toggle monitor status 出错', err.response);
      });
  }

  // 获取上市代码
  @action.bound getStockCode({ reportId, monitorId, analysisReportId }) {
    companyHomeApi.getStockCode({ reportId, monitorId, analysisReportId })
      .then(action('get stock code', (resp) => {
        this.stockCode = resp.data;
      }))
      .catch((err) => {
        console.log(err);
        // if (err.response.status !== 404) {
        //   console.log('获取stockCode出错', err.response);
        // }
      });
  }
  @action.bound getReportInfo() {
    const {reportId, basicReportId} = companyHomeStore.reportInfo;
    const getRepInfoHandle = reportId !== '' ? companyHomeApi.getReportInfo(reportId) : companyHomeApi.getBasicRepInfo(basicReportId);
    getRepInfoHandle
    .then(action('report info', (resp)=>{
      this.reportDate = resp.data.lastModifiedTs;
    }))
    .catch((error)=>{
      console.log('report info error', error);
    });
  }
  // 刷新报告
  @action.bound refreshReport() {
    modalStore.confirmLoading = true;
    const {reportId, basicReportId} = companyHomeStore.reportInfo;
    const refreshRepHandle = reportId !== '' ? companyHomeApi.updateReport(reportId) : companyHomeApi.updateBasicRep(basicReportId);
    refreshRepHandle
      .then(action('refresh high or deep', (resp) => {
        console.log(resp.data);
        modalStore.confirmLoading = false;
        modalStore.closeAction();
        messageStore.openMessage({ content: '刷新成功', callBack: this.windowReload });
        this.getReportInfo();
      }))
      .catch((err) => {
        console.log(err.response);
        runInAction(() => {
          modalStore.confirmLoading = false;
          modalStore.closeAction();
          if (err.response.data.errorCode === 403218) {
            this.getReportInfo();
            messageStore.openMessage({ type: 'info', content: err.response.data.message });
          } else {
            messageStore.openMessage({ type: 'warning', content: err.response.data.message });
          }
        });
      });
  }

  // 升级为监控
  @action.bound updateToMonitor({ reportId, time }) {
    companyHomeApi.updateToMonitor({ reportId, time })
      .then(action('update to monitor', (resp) => {
        payModalStore.closeAction();
        browserHistory.push(`/companyHome?monitorId=${resp.data.monitorId}`);
        messageStore.openMessage({ content: '成功创建监控', callBack: this.windowReload });
      }))
      .catch((err) => {
        console.log(err.response);
        runInAction(() => {
          payModalStore.closeAction();
          messageStore.openMessage({ type: 'warning', content: err.response.data.message });
        });
      });
  }
  // 恢复监控loading
  reStoreLoadingAction(monitorStatus) {
    if (monitorStatus === 'PAUSE') {
      runInAction(() => {
        this.reStoreLoading = false;
      });
    } else {
      runInAction(() => {
        this.reStoreLoading = false;
      });
    }
  }
  closePdfModal = () => {
    this.clearPdfConfigChecked();
  };
  openDownLoadPdf = () => {
    modalStore.openCompModal({
      width: 750,
      isCustomize: true,
      closeAction: this.closePdfModal,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('components/companyHome/Banner/ReportAction/DownloadPdf'));
        });
      }
    });
  };
  // 设置Pdf弹窗第一层级
  @action.bound setPdfLevelOne(key, value, checked) {
    this.pdfDownloadConfig.levelOne[key].checked = checked;
    this.pdfDownloadConfig.levelTwo[value].map((item) => {
      item.checked = checked;
    });
    if (checked === false) {
      this.isAllChecked = false;
    }
  }

  // 设置pdf弹窗第二层级
  @action.bound setPdfLevelTwo(_levelOne, key, levelOneKey, checked) {
    const levelOne = this.pdfDownloadConfig.levelOne;
    const levelTwo = this.pdfDownloadConfig.levelTwo;
    const isHasMonitor = window.location.href.includes('monitorId');
    const levelTwoItem = levelTwo[_levelOne][key];
    levelTwoItem.checked = checked;
    if (levelTwoItem.value === 'TEAM_RECRUITMENT_RESUME') {
      if (!isHasMonitor) {
        levelOne[levelOneKey].checked = checked;
      }
    } else {
      const isAllChecked = levelTwo[_levelOne].every((item) => {
        return item.checked === true;
      });
      if (isAllChecked) {
        levelOne[levelOneKey].checked = true;
      } else {
        levelOne[levelOneKey].checked = false;
        this.isAllChecked = false;
      }
    }
  }

  // 设置全部下载按钮
  @action.bound setDownloadAll(checked) {
    this.isAllChecked = checked;
    const levelOne = this.pdfDownloadConfig.levelOne;
    const levelTwo = this.pdfDownloadConfig.levelTwo;
    const levelTwoKeys = Object.keys(levelTwo);
    const stockCode = this.stockCode;
    const isMonitor = window.location.href.includes('monitorId');
    levelOne.map((item) => {
      if (item.value === 'STOCK') {
        if (stockCode) {
          item.checked = checked;
        }
      } else if (item.value === 'TAX') {
        if (isMonitor) {
          item.checked = checked;
        }
      } else {
        item.checked = checked;
      }
    });
    levelTwoKeys.map((key) => {
      if (key === 'STOCK') {
        if (stockCode) {
          levelTwo[key].map((item) => {
            item.checked = checked;
          });
        }
      } else {
        levelTwo[key].map((item) => {
          item.checked = checked;
        });
      }
    });
  }

  // 重置pdfConfig checked
  @action.bound clearPdfConfigChecked() {
    const pdfDownloadConfig = this.pdfDownloadConfig;
    const levelOne = pdfDownloadConfig.levelOne;
    const levelTwo = pdfDownloadConfig.levelTwo;
    const levelTwoKeys = Object.keys(levelTwo);
    levelOne.map((item) => {
      item.checked = false;
    });
    levelTwoKeys.map((key) => {
      levelTwo[key].map((item) => {
        item.checked = false;
      });
    });
    this.isAllChecked = false;
    modalStore.visible = false;
    modalStore.isCustomize = false;
  }

  // 添加/取消收藏
  @action.bound addOrCancelCollection(params) {
    this.collectionLoading = true;
    companyHomeApi.addOrCancelCollection(params)
      .then(action('add or cancel collection', () => {
        this.bannerInfoData.collection = !this.bannerInfoData.collection;
        this.collectionLoading = false;
      }))
      .catch((err) => {
        console.log(err.response);
        runInAction(() => {
          this.collectionLoading = false;
          messageStore.openMessage({ content: err.response.data.message });
        });
      });
  }
  // 监控续期
  renewalMonitorModal = () => {
    payModalStore.openCompModal({
      'modalType': 'continueMonitor',
      'width': '504px',
      'callBack': this.renewalConfirm
    });
  };
  renewalConfirm = () => {
    const {monitorId} = companyHomeStore.reportInfo;
    this.renewalMonitor(monitorId, payModalStore.selectValue);
  };
  @action.bound renewalMonitor(monitorId, time) {
    companyHomeApi.renewalMonitor(monitorId, time)
      .then(action('renewal monitor', () => {
        payModalStore.closeAction();
        messageStore.openMessage({ content: '续期成功', callBack: this.windowReload });
      }))
      .catch((err) => {
        console.log(err.response);
        runInAction(() => {
          payModalStore.closeAction();
          messageStore.openMessage({ type: 'warning', content: err.response.data.message });
        });
      });
  }
  // 暂停恢复监控
  pauseOrRestoreMonitorModal = () => {
    modalStore.openCompModal({
      title: '暂停监控',
      width: 440,
      confirmAction: this.pauseOrRestoreMonitorConfirm,
      cancelAction: modalStore.closeAction,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('components/companyHome/Banner/ReportAction/PauseOrRestoreMonitor'));
        });
      }
    });
  };
  pauseOrRestoreMonitorConfirm = () => {
    const {monitorId, monitorStatus} = companyHomeStore.reportInfo;
    this.pauseOrRestoreMonitor(monitorId, monitorStatus === 'MONITOR' ? 'PAUSE' : 'MONITOR');
  };
  @action.bound pauseOrRestoreMonitor(monitorId, status) {
    modalStore.confirmLoading = true;
    this.reStoreLoading = true;
    companyHomeApi.pauseOrRestoreMonitor(monitorId, status)
      .then(action('pause or restore monitor', () => {
        modalStore.confirmLoading = false;
        modalStore.closeAction();
        this.reStoreLoading = false;
        companyHomeStore.updateValue('reportInfo.monitorStatus', status);
        messageStore.openMessage({ content: '操作成功' });
      }))
      .catch((err) => {
        runInAction(() => {
          modalStore.confirmLoading = false;
          modalStore.closeAction();
          this.reStoreLoading = false;
          messageStore.openMessage({ type: 'warning', content: err.response.data.message });
        });
      });
  }
  @action.bound resetStore() {
    this.monitorId = '';
    this.reportId = '';
    this.score = '';
    this.isLoading = false;
    this.hisNameVis = false;
    this.contactVis = false;
    this.historyName = [];
    this.riskInfo = [];
    this.industryNames = [];
    this.bannerData = {};
    this.contactExtended = '';
    this.monitorStatus = '';
    this.lastModifiedTs = '获取中...';
    this.refreshStatus = 'complete';
    this.searchedCount = '';
    this.lastModifiedTs = '';
    this.collection = false;
    this.mainStatus = '';
    this.stockCode = '';
    this.pdfDownloadConfig = {
      levelOne: [
        { label: '信息概览', value: 'SUMMARY', checked: false },
        { label: '企业基本信息', value: 'CORP', checked: false },
        { label: '税务信息', value: 'TAX', checked: false },
        { label: '上市披露', value: 'STOCK', checked: false },
        { label: '关联网络', value: 'NETWORK', checked: false },
        { label: '风险信息', value: 'RISK', checked: false },
        { label: '新闻信息', value: 'NEWS', checked: false },
        { label: '经营信息', value: 'OPERATION', checked: false },
        { label: '团队信息', value: 'TEAM', checked: false },
      ],
      levelTwo: {
        'SUMMARY': [],
        'CORP': [
          { label: '工商基本信息', value: 'CORP_BASIC', checked: false },
          { label: '工商变更', value: 'CORP_ALTER', checked: false },
          { label: '对外投资任职', value: 'CORP_INV_POS', checked: false },
          { label: '企业年报', value: 'CORP_YEAR_REPORT', checked: false },
        ],
        'TAX': [],
        'STOCK': [
          { label: '公司概况', value: 'STOCK_INFO', checked: false },
          { label: '公司公告', value: 'STOCK_ANNOUNCEMENT', checked: false },
        ],
        'NETWORK': [
          { label: '关联关系', value: 'NETWORK_RELEVANCE', checked: false },
          { label: '风险关系', value: 'NETWORK_BLACKLIST', checked: false },
        ],
        'RISK': [
          { label: '判决文书', value: 'RISK_JUDGEMENT', checked: false },
          { label: '法院公告', value: 'RISK_ANNOUNCEMENT', checked: false },
          { label: '开庭公告', value: 'RISK_NOTICE', checked: false },
          { label: '被执行人信息', value: 'RISK_EXECUTE', checked: false },
          { label: '失信被执行人', value: 'RISK_DISHONESTY', checked: false },
          { label: '涉诉资产', value: 'RISK_LITIGATION', checked: false },
          { label: '纳税信用', value: 'RISK_TAXATION', checked: false },
          { label: '经营异常', value: 'RISK_ABNORMAL', checked: false },
          { label: '抽查检查', value: 'RISK_CHECK', checked: false },
        ],
        'NEWS': [],
        'OPERATION': [
          { label: '招投标', value: 'OPERATION_BIDDING', checked: false },
          { label: '专利', value: 'OPERATION_PATENT', checked: false },
          { label: '商标', value: 'OPERATION_TRADEMARK', checked: false },
        ],
        'TEAM': [
          { label: '招聘/员工背景', value: 'TEAM_RECRUITMENT_RESUME', checked: false },
          { label: '团队监控分析', value: 'TEAM_ANALYSIS', checked: false },
        ]
      },
    };
    this.isAllChecked = false;
    this.collectionLoading = false;
  }
}
export default new BannerStore();
