import { observable, action } from 'mobx';
import {companyHomeApi} from 'api';
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
  @observable stockCode = '';
  @observable bannerData = {};
  @observable contactExtended = '';
  @observable monitorStatus = '';
  @observable lastModifiedTs = '获取中...';
  @observable refreshStatus = 'complete';

  // 上市代码
  @observable stockCode = '';


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
}
export default new BannerStore();
