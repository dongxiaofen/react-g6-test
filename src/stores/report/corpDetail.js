import { observable, action, computed } from 'mobx';
import { companyHomeApi } from 'api';
class CorpDetailStore {
  @observable registerInfo = [];
  @computed get isMount() {
    return this.registerInfo.length !== 0;
  }
  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get corpDetail data', (resp) => {
        console.log(resp);
        this.registerInfo = resp.data.corpDetail.basicList;
      }));
  }
}
export default new CorpDetailStore();
