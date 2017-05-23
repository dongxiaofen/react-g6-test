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
  // 错误信息

  @observable errData = {};

  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule(params)
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
        if (resp.data.tendency && resp.data.tendency.result && resp.data.tendency.result[0] && resp.data.tendency.result[0].data) {
          this.alterAnalysis = resp.data.tendency.result[0].data;
        }
        // 工商变更-变更信息
        if (resp.data.tendency && resp.data.tendency.result && resp.data.tendency.result[0] && resp.data.tendency.result[0].alterList) {
          this.alterList = resp.data.tendency.result[0].alterList;
        }
        // 企业年报
        this.yearReportList = resp.data.corpDetail.yearReportList;
      }))
      .catch(action('get corpDetail err', (err)=>{
        this.isLoading = false;
        if (err.response && err.response.data) {
          this.errData = err.response.data;
        }
        console.log('get corpDetail err', err);
      }));
  }
  // 设置年报显示某年
  @action.bound setYearReport(item) {
    this.yearReportTab = item;
  }
  @action.bound resetStore() {
    this.isLoading = true;
    this.isMount = false;
    this.registerInfo = [];
    this.shareHolderList = [];
    this.personList = [];
    this.filiationList = [];
    this.entinvItemList = [];
    this.frinvList = [];
    this.frPositionList = [];
    this.alterAnalysis = [];
    this.alterList = [];
    this.yearReportList = [];
    this.yearReportTab = '';
  }
}
export default new CorpDetailStore();
