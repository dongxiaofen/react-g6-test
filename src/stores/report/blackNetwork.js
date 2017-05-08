import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class BlackNetworkStore {
  @observable error = '';
  @observable isLoading = true;
  @observable isMount = false;

  @observable mainCompanyName = '';
  @observable blackNetwork = {
    nodes: []
  };

  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule(params)
      .then(action('get blackNetwork data', (resp) => {
        this.isLoading = false;
        this.blackNetwork = resp.data.result[0];
        this.mainCompanyName = resp.data.result[0].mainCompanyName;
        const pathsArr = resp.data.result[0].paths;
        this.blackNetwork.nodes.map((node) => {
          if (pathsArr[0].relatedPaths.includes(node.name)) {
            node.hide = false;
            if (node.name === pathsArr[0].blackListNode) {
              node.isBlack = true;
            }
          } else {
            node.hide = true;
          }
        });
        this.blackNetwork.links.map((link) => {
          if (pathsArr[0].relatedPaths.includes(link.source) && pathsArr[0].relatedPaths.includes(link.target)) {
            link.hide = false;
          } else {
            link.hide = true;
          }
        });
      }))
      .catch(action('blackNetwork出错', (err) => {
        console.log('blackNetwork出错', err);
        this.error = err.response.data;
        this.isLoading = false;
      }));
  }
}
export default new BlackNetworkStore();
