import { observable, action } from 'mobx';
import {companyHomeApi} from 'api';
class RiskStore {
  @observable isLoading = false;
  @observable isMount = false;

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    this.isLoading = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get risk data', (resp)=>{
        this.isLoading = false;
        console.log(resp);
      }));
  }
}
export default new RiskStore();
