import { observable, action, extendObservable, computed } from 'mobx';
import { companyHomeApi } from 'api';

class BlackNetworkStore {
  constructor() {
    extendObservable(this, {
      expandIdx: computed(() => {
        console.log('computed', this.jumpNode);
        const tmp = this.blackNetwork.paths.findIndex((path) => path.blackListNode === this.jumpNode);
        console.log('tmp', tmp);
        return tmp > 0 ? tmp : 0;
      })
    });
  }

  @observable error = '';
  @observable isLoading = true;
  @observable isMount = false;

  @observable mainCompanyName = '';
  @observable blackNetwork = {
    nodes: [],
    paths: []
  };
  @observable jumpNode = '';
  @observable focusNodeName = '';
  @observable blackList = [];
  @observable radioList = [];
  @observable modalFocusIdx = -1; // 弹窗idx
  @observable detailModalData = {};

  @action.bound openDetailModal(idx, data) {
    this.modalFocusIdx = idx;
    this.detailModalData = data;
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
        this.radioList[this.expandIdx] = 1;
        const pathsArr = resp.data.result[0].paths;
        this.blackList = pathsArr;
        this.blackNetwork.nodes.map((node) => {
          if (pathsArr[this.expandIdx].relatedPaths.includes(node.name)) {
            node.hide = false;
            if (node.name === pathsArr[this.expandIdx].blackListNode) {
              node.isBlack = true;
            }
          } else {
            node.hide = true;
          }
        });
        this.blackNetwork.links.map((link) => {
          if (pathsArr[this.expandIdx].relatedPaths.includes(link.source) && pathsArr[this.expandIdx].relatedPaths.includes(link.target)) {
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
  @action.bound resetStore() {
    this.error = '';
    this.isLoading = true;
    this.isMount = false;
    this.mainCompanyName = '';
    this.blackNetwork = {
      nodes: [],
      paths: []
    };
    this.focusNodeName = '';
    this.blackList = [];
    this.radioList = [];
    this.modalFocusIdx = -1;
    this.detailModalData = {};
  }
}
export default new BlackNetworkStore();
