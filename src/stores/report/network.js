import { observable, action, computed, extendObservable } from 'mobx';
import { companyHomeApi } from 'api';

class NetworkStore {
  constructor() {
    extendObservable(this, {
      nodePanel: {
        show: false,
        nodeData: computed(() => {
          return this.currentNetwork.nodes.find((node) => node.name === this.focusNodeName);
        })
      }
    });
  }
  @observable error = '';
  @observable isLoading = true;
  @observable isMount = false;
  @observable currentNetwork = {
    nodes: []
  };
  @observable monitorInfoList = [];
  @observable mainCompanyName = '';
  @observable layout = 'circle';
  @observable focusNodeName = '';
  @observable searchKey = '';

  @action.bound focusNode(name) {
    this.focusNodeName = name;
    this.nodePanel.show = true;
  }
  @action.bound closePanel() {
    this.nodePanel.show = false;
    this.focusNodeName = '';
  }
  @action.bound switchLayout() {
    this.layout = this.layout === 'circle' ? 'force' : 'circle';
  }
  @action.bound getReportModule(module, monitorId, reportId, analysisReportId, companyName, companyType) {
    this.isMount = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, analysisReportId, companyName, companyType)
      .then(action('get currentNetwork data', (resp) => {
        this.isLoading = false;
        this.currentNetwork = resp.data.currentNetwork;
        this.mainCompanyName = resp.data.companyName;
        this.monitorInfoList = resp.data.monitorInfoList;
      }))
      .catch(action('currentNetwork出错', (err) => {
        console.log('currentNetwork出错', err.response.data);
        this.error = err.response.data;
        this.isLoading = false;
      }));
  }
}
export default new NetworkStore();
