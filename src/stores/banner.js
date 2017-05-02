import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import {companyHomeApi} from 'api';
import modalStore from './modal';
import messageStore from './message';
import payModalStore from './payModal';
class BannerStore {
  // banner
  @observable monitorId = '';
  @observable reportId = '';
  @observable companyName = '';
  @observable companyType = '';

  @observable hisNameVis = false;
  @observable contactVis = false;
  @observable historyName = [];
  @observable riskInfo = [];
  @observable industryNames = [];
  @observable bannerData = {};
  @observable contactExtended = '';
  @observable monitorStatus = '';
  @observable lastModifiedTs = '获取中...';
  @observable refreshStatus = 'complete';
  @observable searchedCount = '';
  @observable lastModifiedTs = '';

  // 上市代码
  @observable stockCode = '';

  // 升级成高级报告或者深度报告
  @observable updateHighOrDeep = {
    active: 1,
    pointText: '已选择高级查询报告',
    pointTextSub: '（包含快速查询报告数据，另有关联网络、上市、新闻、团队、经营数据）'
  };


  closeHisNamePopoverAlias = this.closeHisNamePopover;
  openHisNamePopoverAlias = this.openHisNamePopover;
  closeContactPopoverAlias = this.closeContactPopover;
  openContactPopoverAlias = this.openContactPopover;
  extendContactAlias = this.extendContact;

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
  @action.bound getBannerInfo(monitorId, reportId, companyName, companyType) {
    this.monitorId = monitorId;
    this.reportId = reportId;
    this.companyName = companyName;
    this.companyType = companyType;
    companyHomeApi.getBannerInfo(monitorId, reportId, companyName, companyType)
      .then(action('get banner info...', (resp) => {
        console.log('banner结果', resp.data);
        this.companyName = resp.data.name;
        this.historyName = resp.data.bannerInfo.bannerInfo.historyName;
        this.riskInfo = resp.data.bannerInfo.bannerInfo.riskInfo;
        this.industryNames = resp.data.industryNames;
        this.bannerData = resp.data.bannerInfo.bannerInfo;
        this.monitorStatus = resp.data.monitorStatus;
        this.lastModifiedTs = resp.data.lastModifiedTs ? resp.data.lastModifiedTs : '无';
        this.refreshStatus = 'complete';
        this.stockCode = resp.data.stockCode;
        this.searchedCount = resp.data.searchedCount;
        this.lastModifiedTs = resp.data.lastModifiedTs;
      }))
      .catch((err) => {
        console.log('banner出错', err);
      });
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
      }));
  }

  // 修改UpdateHighOrDeep
  @action.bound setUpdateHighOrDeep({ active, pointText, pointTextSub }) {
    this.updateHighOrDeep.active = active;
    this.updateHighOrDeep.pointText = pointText;
    this.updateHighOrDeep.pointTextSub = pointTextSub;
  }

  // 创建高级报告或者深度报告
  @action.bound createReport(active, companyName) {
    modalStore.confirmLoading = true;
    companyHomeApi.createReport(active, companyName)
      .then(action('create report', (resp) => {
        console.log(resp.data);
        modalStore.confirmLoading = false;
        modalStore.closeAction();
        if (resp.data.reportId) {
          messageStore.openMessage({ content: '高级查询报告创建成功' });
          browserHistory.push(`/companyHome?reportId=${resp.data.reportId}&companyType=MAIN`);
        }
        if (resp.data.analysisReportId) {
          messageStore.openMessage({ content: '深度分析报告创建成功' });
          browserHistory.push(`/companyHome?analysisReportId=${resp.data.analysisReportId}&companyType=MAIN`);
        }
      }))
      .catch((err) => {
        console.log(err);
        modalStore.confirmLoading = false;
      });
  }

  // 创建监控
  @action.bound createMonitor(obj) {
    companyHomeApi.createMonitor(obj)
      .then(action('create monitor', (resp) => {
        payModalStore.closeAction();
        messageStore.openMessage({ content: '成功创建监控' });
        browserHistory.push(`/companyHome?monitorId=${resp.data.monitorId}&companyType=MAIN`);
      }))
      .catch(action('createMonitor error', (err) => {
        console.log(err.response, '=====createMonitor error');
      }));
  }
}
export default new BannerStore();
