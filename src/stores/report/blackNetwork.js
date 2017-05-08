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
  @observable focusNodeName = '';
  @observable blackList = [];
  @observable radioList = [];
  @observable modalFocusIdx = -1; // 弹窗idx

  @action.bound modalFocus(idx) {
    this.modalFocusIdx = idx;
  }
  @action.bound focusNode(name) {
    this.focusNodeName = name;
  }
  @action.bound toggleExpand(idx) {
    const resetRadioList = Array(this.radioList.length).fill(0);
    resetRadioList[idx] = 1;
    this.radioList = resetRadioList;
    this.modalFocusIdx = -1;
  }
  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule(params)
      .then(action('get blackNetwork data', (resp) => {
        this.isLoading = false;
        this.blackNetwork = resp.data.result[0];
        this.mainCompanyName = resp.data.result[0].mainCompanyName;
        this.radioList = Array(resp.data.result[0].paths.length).fill(0);
        this.radioList[0] = 1;
        const pathsArr = resp.data.result[0].paths;
        this.blackList = pathsArr;
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
