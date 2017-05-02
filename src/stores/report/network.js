import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class NetworkStore {
  @observable isLoading = true;
  @observable isMount = false;
  @observable currentNetwork = {};
  @observable layout = 'circle';


  @action.bound switchLayout() {
    this.layout = this.layout === 'circle' ? 'force' : 'circle';
  }
  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get currentNetwork data', (resp) => {
        this.isLoading = false;
        this.currentNetwork = resp.data.currentNetwork;
      }));
  }
}
export default new NetworkStore();
