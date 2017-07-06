import { observable, action, runInAction } from 'mobx';
import { companyHomeApi } from 'api';
import uiStore from '../ui';

class StockStore {
  isEmptyObject(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  @observable isMount = false;
  @observable isOverViewLoading = true;
  @observable announcementTypesLoading = true;
  @observable announcementDatasLoading = true;

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
    companyHomeApi.getReportModule('stock/company', params)
      .then(action('get stock company', (resp) => {
        if (Object.keys(resp.data.brief).length) {
          const brief = resp.data.brief;
          brief.issued_shares = brief.issued_shares ? (brief.issued_shares / 10000).toFixed(2) : '';
          brief.reg_cap = brief.reg_cap ? (brief.reg_cap / 10000).toFixed(2) : '';
          this.brief = brief;
        } else {
          this.brief = {};
        }
        this.shareHolder = resp.data.shareHolder;
        this.circulateShareHolder = resp.data.circulateShareHolder;
        this.management = resp.data.management;
        this.isOverViewLoading = false;
      }))
      .catch((err) => {
        console.log(err.response);
        runInAction(() => {
          this.isOverViewLoading = false;
        });
      });
  }
  // 上市公告-公告列表
  @action.bound getAnnouncement(idInfo, params) {
    this.announcementDatasLoading = true;
    companyHomeApi.getReportModule('stock/announcement', idInfo, params)
      .then(action('get stock announcement', (resp) => {
        this.announcementDatas = resp.data.data;
        this.announcementDatasLoading = false;
        uiStore.uiState.stockAnnouncement.index = 1;
      }))
      .catch((err) => {
        console.log(err.response);
        runInAction(() => {
          this.announcementDatasLoading = false;
        });
      });
  }
  // 上市公告-公告列表-类型列表
  @action.bound getAnnouncementType(params) {
    companyHomeApi.getReportModule('stock/announcement/type', params)
      .then(action('get stock announcement type', (resp) => {
        this.announcementTypes = resp.data;
      }))
      .catch((err) => {
        console.log(err.response);
      });
  }

  // 切换公告类型
  @action.bound changeAnnouncement(stockType, params) {
    this.getAnnouncement(params, {stockType});
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