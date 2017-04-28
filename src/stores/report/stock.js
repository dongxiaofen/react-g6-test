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

  @observable isLoading = true;
  @observable isMount = false;

  @observable brief = {};

  // 上市公告-公司概况
  @action.bound getCompany(module, monitorId, reportId, companyName, companyType) {
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get stock company', (resp) => {
        this.brief = resp.data.brief;
      }));
  }
  // 上市公告-公告列表
  @action.bound getAnnouncement(module, monitorId, reportId, companyName, companyType) {
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get stock announcement', (resp) => {
        console.log(resp.data);
      }));
  }
  // 上市公告-公告列表-类型列表
  @action.bound getAnnouncementType(module, monitorId, reportId, companyName, companyType) {
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get stock announcement type', (resp) => {
        console.log(resp.data);
      }));
  }

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.getCompany('stock/company', monitorId, reportId, companyName, companyType);
    this.getAnnouncement('stock/announcement', monitorId, reportId, companyName, companyType);
    this.getAnnouncementType('stock/announcement/type', monitorId, reportId, companyName, companyType);
    this.isMount = true;
  }
}
export default new StockStore();
