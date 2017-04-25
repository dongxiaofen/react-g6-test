import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
class CorpDetailStore {
  @observable isLoading = true;
  @observable isMount = false;

  @observable registerInfo = [];
  @observable shareHolderList = [];
  @observable personList = [];
  @observable filiationList = [];

  @observable entinvItemList = [];
  // 对外投资任职-法人对外投资
  @observable frinvList = [];
  // 对外投资任职-法人对外任职
  @observable frPositionList = [];
  // 工商变更-变更分析
  @observable alterAnalysis = [];
  // 工商变更-变更信息
  @observable alterList = [];
  // 企业年报
  @observable yearReportList = [];
  // 选择年报
  @observable yearReportTab = '';

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get corpDetail data', (resp) => {
        this.isLoading = false;
        this.registerInfo = resp.data.corpDetail.basicList;
        this.shareHolderList = resp.data.corpDetail.shareHolderList;
        this.personList = resp.data.corpDetail.personListForPortal;
        this.filiationList = resp.data.corpDetail.filiationList;
        this.entinvItemList = resp.data.corpDetail.entinvItemList;
        // 对外投资任职-法人对外投资
        this.frinvList = resp.data.corpDetail.frinvList;
        // 对外投资任职-法人对外任职
        this.frPositionList = resp.data.corpDetail.frPositionList;
        // 工商变更-变更分析
        this.alterAnalysis = resp.data.tendency.result[0].data;
        // 工商变更-变更信息
        this.alterList = resp.data.tendency.result[0].alterList;
        // 企业年报
        this.yearReportList = resp.data.corpDetail.yearReportList;
      }));
  }
  // 设置年报显示某年
  @action.bound setYearReport(item) {
    this.yearReportTab = item;
  }
}
export default new CorpDetailStore();
