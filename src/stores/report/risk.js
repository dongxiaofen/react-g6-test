import { action } from 'mobx';
import {companyHomeApi} from 'api';
class RiskStore {
  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get risk data', (resp)=>{
        console.log(resp);
      }));
  }
}
export default new RiskStore();
