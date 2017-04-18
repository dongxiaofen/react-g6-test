import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
class CorpDetailStore {
  @observable registerInfo = [];
  @observable shareHolderList = [];
  @observable isLoading = false;
  @observable isMount = false;

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isLoading = true;
    this.isMount = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get corpDetail data', (resp) => {
        this.isLoading = false;
        this.registerInfo = resp.data.corpDetail.basicList;
        this.shareHolderList = resp.data.corpDetail.shareHolderList;
      }));
  }
}
export default new CorpDetailStore();
