import { observable, action, runInAction } from 'mobx';
import { browserHistory } from 'react-router';
import { companyHomeApi } from 'api';
import modalStore from './modal';
import messageStore from './message';
import payModalStore from './payModal';
import companyHomeStore from './companyHome';
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
  @observable monitorRepInfo = {
    monitorStatus: '',
    expireDt: '',
  };
  // 上市代码
  @observable stockCode = '';

  // 下载pdf配置
  @observable pdfDownloadConfig = {
    levelOne: [
      { label: '信息概览', value: 'SUMMERY', checked: false, type: 'basicReport' },
      { label: '工商信息', value: 'CORP', checked: false, type: 'basicReport' },
      { label: '对外投资任职', value: 'INV_POS', checked: false, type: 'basicReport' },
      { label: '上市披露', value: 'STOCK', checked: false, type: 'basicReport' },
      { label: '新闻信息', value: 'NEWS', checked: false, type: 'basicReport' },
      { label: '经营信息', value: 'OPERATION', checked: false, type: 'basicReport' },
      { label: '团队信息', value: 'TEAM', checked: false, type: 'basicReport'},
      { label: '纳税公告', value: 'RISK_TAXATION', checked: false, type: 'basicReport' },
      { label: '法务信息', value: 'RISK', checked: false, type: 'basicReport' },
      { label: '工商抽查', value: 'BUSINESS', checked: false, type: 'basicReport' },
      { label: '股权相关', value: 'PLEDGE', checked: false, type: 'basicReport' },
      { label: '关联图', value: 'NETWORK', checked: false, type: 'report' },
      { label: '抵押信息', value: 'MORTGAGE', checked: false, type: 'basicReport' },
      { label: '分析报告', value: 'ANALYSREPORT', checked: false, type: 'loan' },
    ],
    levelTwo: {
      'SUMMERY': [],
      'CORP': [
        { label: '照面信息', value: 'CORP_BASIC', checked: false },
        { label: '工商变更', value: 'CORP_ALTER', checked: false },
        { label: '企业年报', value: 'CORP_YEAR_REPORT', checked: false },
      ],
      'INV_POS': [
        { label: '法人相关', value: 'INV_POS_FR', checked: false, type: 'basicReport' },
        { label: '企业对外投资', value: 'INV_POS_ENT', checked: false, type: 'basicReport' },
        { label: '董监高', value: 'INV_POS_MANAGEMENT', checked: false, type: 'report' },
      ],
      'STOCK': [
        { label: '公司概况', value: 'STOCK_INFO', checked: false },
        { label: '公司公告', value: 'STOCK_ANNOUNCEMENT', checked: false },
      ],
      'NEWS': [],
      'OPERATION': [
        { label: '商标', value: 'OPERATION_TRADEMARK', checked: false },
        { label: '专利', value: 'OPERATION_PATENT', checked: false },
        { label: '招投标', value: 'OPERATION_BIDDING', checked: false },
      ],
      'TEAM': [
        { label: '招聘/员工背景', value: 'TEAM_RECRUITMENT_RESUME', checked: false },
        { label: '团队发展趋势', value: 'TEAM_ANALYSIS', checked: false },
      ],
      'RISK_TAXATION': [],
      'RISK': [
        { label: '判决文书', value: 'RISK_JUDGEMENT', checked: false },
        { label: '法院公告', value: 'RISK_ANNOUNCEMENT', checked: false },
        { label: '开庭公告', value: 'RISK_NOTICE', checked: false },
        { label: '被执行人信息', value: 'RISK_EXECUTE', checked: false },
        { label: '失信被执行人信息', value: 'RISK_DISHONESTY', checked: false },
        { label: '涉诉资产', value: 'RISK_LITIGATION', checked: false },
      ],
      'BUSINESS': [
        { label: '经营异常', value: 'RISK_ABNORMAL', checked: false },
        { label: '抽查检查', value: 'RISK_CHECK', checked: false },
        { label: '违法记录', value: 'RISK_ILLEGAL', checked: false },
      ],
      'NETWORK': [
        { label: '关联关系', value: 'NETWORK_RELEVANCE', checked: false },
        { label: '风险关系', value: 'NETWORK_BLACKLIST', checked: false },
      ],
      'PLEDGE': [
        { label: '股权冻结', value: 'PLEDGE_EQUITY_SHARE', checked: false },
        // { label: '股权质押', value: 'RISK_ANNOUNCEMENT', checked: false },
        // { label: '股权转让', value: 'RISK_JUDGEMENT', checked: false },
      ],
      'MORTGAGE': [
        // { label: '股权相关', value: 'RISK_ANNOUNCEMENT', checked: false },
        { label: '抵押相关', value: 'PLEDGE_EQUITY_SHARE', checked: false },
        // { label: '抵押人信息', value: 'RISK_ANNOUNCEMENT', checked: false },
        // { label: '抵押变更', value: 'RISK_JUDGEMENT', checked: false },
      ],
      'ANALYSREPORT': [
        { label: '多维综合分析', value: 'SCORE', checked: false },
        { label: '盈利能力分析', value: 'PROFIT', checked: false },
        { label: '营运能力分析', value: 'OPERATION', checked: false },
        { label: '成长能力分析', value: 'GROWING', checked: false },
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

  // 报告类型
  @observable reportType = '';

  closeHisNamePopoverAlias = this.closeHisNamePopover;
  openHisNamePopoverAlias = this.openHisNamePopover;
  closeContactPopoverAlias = this.closeContactPopover;
  openContactPopoverAlias = this.openContactPopover;
  extendContactAlias = this.extendContact;

  @action.bound setPdfDownloadKeys(keys, reportType) {
    this.pdfDownloadKeys = keys;
    this.reportType = reportType;
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
        this.bannerInfoData = resp.data;
        this.isLoading = false;
      }))
      .catch(action('banner err', (err) => {
        console.log('banner出错', err);
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
  @action.bound getMonitorRepInfo() {
    const { monitorId } = companyHomeStore.reportInfo;
    companyHomeApi.getMonitorInfo(monitorId)
    .then(action('report info', (resp)=>{
      this.monitorRepInfo = resp.data;
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
        messageStore.openMessage({ content: '续期成功'});
        this.getMonitorRepInfo();
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
    const {monitorId} = companyHomeStore.reportInfo;
    const {monitorStatus} = this.monitorRepInfo;
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
        this.monitorRepInfo.monitorStatus = status;
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
        { label: '信息概览', value: 'SUMMERY', checked: false, type: 'basicReport' },
        { label: '工商信息', value: 'CORP', checked: false, type: 'basicReport' },
        { label: '对外投资任职', value: 'INV_POS', checked: false, type: 'basicReport' },
        { label: '上市披露', value: 'STOCK', checked: false, type: 'basicReport' },
        { label: '新闻信息', value: 'NEWS', checked: false, type: 'basicReport' },
        { label: '经营信息', value: 'OPERATION', checked: false, type: 'basicReport' },
        { label: '团队信息', value: 'TEAM', checked: false, type: 'basicReport'},
        { label: '纳税公告', value: 'RISK_TAXATION', checked: false, type: 'basicReport' },
        { label: '法务信息', value: 'RISK', checked: false, type: 'basicReport' },
        { label: '工商抽查', value: 'BUSINESS', checked: false, type: 'basicReport' },
        { label: '股权相关', value: 'PLEDGE', checked: false, type: 'basicReport' },
        { label: '关联图', value: 'NETWORK', checked: false, type: 'report' },
        { label: '抵押信息', value: 'MORTGAGE', checked: false, type: 'basicReport' },
        { label: '分析报告', value: 'ANALYSREPORT', checked: false, type: 'loan' },
      ],
      levelTwo: {
        'SUMMERY': [],
        'CORP': [
          { label: '照面信息', value: 'CORP_BASIC', checked: false },
          { label: '工商变更', value: 'CORP_ALTER', checked: false },
          { label: '企业年报', value: 'CORP_YEAR_REPORT', checked: false },
        ],
        'INV_POS': [
          { label: '法人相关', value: 'INV_POS_FR', checked: false, type: 'basicReport' },
          { label: '企业对外投资', value: 'INV_POS_ENT', checked: false, type: 'basicReport' },
          { label: '董监高', value: 'INV_POS_MANAGEMENT', checked: false, type: 'report' },
        ],
        'STOCK': [
          { label: '公司概况', value: 'STOCK_INFO', checked: false },
          { label: '公司公告', value: 'STOCK_ANNOUNCEMENT', checked: false },
        ],
        'NEWS': [],
        'OPERATION': [
          { label: '商标', value: 'OPERATION_TRADEMARK', checked: false },
          { label: '专利', value: 'OPERATION_PATENT', checked: false },
          { label: '招投标', value: 'OPERATION_BIDDING', checked: false },
        ],
        'TEAM': [
          { label: '招聘/员工背景', value: 'TEAM_RECRUITMENT_RESUME', checked: false },
          { label: '团队发展趋势', value: 'TEAM_ANALYSIS', checked: false },
        ],
        'RISK_TAXATION': [],
        'RISK': [
          { label: '判决文书', value: 'RISK_JUDGEMENT', checked: false },
          { label: '法院公告', value: 'RISK_ANNOUNCEMENT', checked: false },
          { label: '开庭公告', value: 'RISK_NOTICE', checked: false },
          { label: '被执行人信息', value: 'RISK_EXECUTE', checked: false },
          { label: '失信被执行人信息', value: 'RISK_DISHONESTY', checked: false },
          { label: '涉诉资产', value: 'RISK_LITIGATION', checked: false },
        ],
        'BUSINESS': [
          { label: '经营异常', value: 'RISK_ABNORMAL', checked: false },
          { label: '抽查检查', value: 'RISK_CHECK', checked: false },
          { label: '违法记录', value: 'RISK_ILLEGAL', checked: false },
        ],
        'NETWORK': [
          { label: '关联关系', value: 'NETWORK_RELEVANCE', checked: false },
          { label: '风险关系', value: 'NETWORK_BLACKLIST', checked: false },
        ],
        'PLEDGE': [
          { label: '股权冻结', value: 'PLEDGE_EQUITY_SHARE', checked: false },
          // { label: '股权质押', value: 'RISK_ANNOUNCEMENT', checked: false },
          // { label: '股权转让', value: 'RISK_JUDGEMENT', checked: false },
        ],
        'MORTGAGE': [
          // { label: '股权相关', value: 'RISK_ANNOUNCEMENT', checked: false },
          { label: '抵押相关', value: 'PLEDGE_EQUITY_SHARE', checked: false },
          // { label: '抵押人信息', value: 'RISK_ANNOUNCEMENT', checked: false },
          // { label: '抵押变更', value: 'RISK_JUDGEMENT', checked: false },
        ],
        'ANALYSREPORT': [
          { label: '多维综合分析', value: 'SCORE', checked: false },
          { label: '盈利能力分析', value: 'PROFIT', checked: false },
          { label: '营运能力分析', value: 'OPERATION', checked: false },
          { label: '成长能力分析', value: 'GROWING', checked: false },
        ]
      },
    };
    this.isAllChecked = false;
    this.collectionLoading = false;
  }
}
export default new BannerStore();
