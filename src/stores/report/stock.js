import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class StockStore {
  isEmptyObject(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  @observable isOverViewLoading = true;
  @observable announcementTypesLoading = true;
  @observable announcementDatasLoading = true;
  @observable isMount = false;

  // 公司概况
  @observable brief = {};
  @observable shareHolder = {};
  @observable circulateShareHolder = {};
  @observable management = [];

  // 公告列表
  @observable selectValue = '';
  @observable announcementTypes = [];
  @observable announcementDatas = [];

  // 上市公告-公司概况
  @action.bound getCompany(params) {
    params.module = 'stock/company';
    companyHomeApi.getReportModule(params)
      .then(action('get stock company', (resp) => {
        this.brief = resp.data.brief;
        this.shareHolder = resp.data.shareHolder;
        this.circulateShareHolder = resp.data.circulateShareHolder;
        this.management = resp.data.management;
        this.isOverViewLoading = false;
      }));
  }
  // 上市公告-公告列表
  @action.bound getAnnouncement(params) {
    params.module = 'stock/announcement';
    companyHomeApi.getReportModule(params)
      .then(action('get stock announcement', (resp) => {
        this.announcementDatas = resp.data.data;
        this.announcementDatasLoading = false;
      }));
  }
  // 上市公告-公告列表-类型列表
  @action.bound getAnnouncementType(params) {
    params.module = 'stock/announcement/type';
    companyHomeApi.getReportModule(params)
      .then(action('get stock announcement type', (resp) => {
        this.announcementTypes = resp.data;
      }));
  }

  // 切换公告类型
  @action.bound changeAnnouncement({ stockType, monitorId, reportId, analysisReportId }) {
    this.announcementDatasLoading = true;
    companyHomeApi.changeAnnouncement({ stockType, monitorId, reportId, analysisReportId })
      .then(action('change announcement', (resp) => {
        this.announcementDatas = resp.data.data;
        this.announcementDatasLoading = false;
      }));
  }

  // 设置selectValue
  @action.bound setSelectValue(val) {
    this.selectValue = val;
  }

  @action.bound getReportModule(params) {
    this.isMount = true;
    this.getCompany(params);
    this.getAnnouncement(params);
    this.getAnnouncementType(params);
  }

  @action.bound resetStore() {
    this.isOverViewLoading = true;
    this.announcementTypesLoading = true;
    this.announcementDatasLoading = true;
    this.isMount = false;
    this.brief = {};
    this.shareHolder = {};
    this.circulateShareHolder = {};
    this.management = [];
    this.selectValue = '';
    this.announcementTypes = [];
    this.announcementDatas = [];
  }
}
export default new StockStore();
