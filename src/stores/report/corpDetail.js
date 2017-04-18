import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
class CorpDetailStore {
  @observable registerInfo = [];
  @observable shareHolderList = [];
  @observable personList = [];
  @observable filiationList = [];
  @observable isLoading = true;
  @observable isMount = false;

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get corpDetail data', (resp) => {
        this.isLoading = false;
        this.registerInfo = resp.data.corpDetail.basicList;
        this.shareHolderList = resp.data.corpDetail.shareHolderList;
        this.personList = resp.data.corpDetail.personListForPortal;
        this.filiationList = resp.data.corpDetail.filiationList;
      }));
  }
}
export default new CorpDetailStore();
