import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class BlackNetworkStore {
  @observable error = '';
  @observable isLoading = true;
  @observable isMount = false;

  @observable blackNetwork = {
    nodes: []
  };

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get blackNetwork data', (resp) => {
        this.isLoading = false;
        this.blackNetwork = resp.data.result[0];
      }))
      .catch(action('blackNetwork出错', (err) => {
        console.log('blackNetwork出错', err.response.data);
        this.error = err.response.data;
        this.isLoading = false;
      }));
  }
}
export default new BlackNetworkStore();
