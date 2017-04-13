import { action } from 'mobx';
import {companyHomeApi} from 'api';
class CorpDetailStore {
  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get corpDetail data', (resp)=>{
        console.log(resp);
      }));
  }
}
export default new CorpDetailStore();
