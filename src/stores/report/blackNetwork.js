import { observable, action, reaction } from 'mobx';
import { companyHomeApi } from 'api';

class BlackNetworkStore {
  constructor() {
    reaction(
      () => this.jumpNode,
      () => {
        const tmp = this.blackNetwork.paths.findIndex((path) => path.blackListNode === this.jumpNode);
        this.expandIdx = tmp >= 0 ? tmp : this.expandIdx;
        this.isJump = true;
      }
    );
  }

  @observable error = '';
  @observable isLoading = true;
  @observable isMount = false;

  @observable mainCompanyName = '';
  @observable blackNetwork = {
    nodes: [],
    paths: []
  };
  @observable isJump = false;
  @observable jumpNode = '';
  @observable expandIdx = 0;
  @observable focusNodeName = '';
  @observable blackList = [];
  @observable modalFocusIdx = -1; // 失信记录点击idx记录
  @observable detailModalData = {};
  @observable focusNodeFlag = false;

  @action.bound openDetailModal(idx, data) {
    this.modalFocusIdx = idx;
    this.detailModalData = data;
  }
  @action.bound focusNode(name) {
    this.focusNodeName = name;
    this.focusNodeFlag = !this.focusNodeFlag;
  }
  @action.bound toggleExpand(idx) {
    this.expandIdx = idx;
    this.modalFocusIdx = -1;
    this.isJump = false;
  }
  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule('network/blacklist', params)
      .then(action('get blackNetwork data', (resp) => {
        this.isLoading = false;
        this.blackNetwork = resp.data.result[0];
        this.mainCompanyName = resp.data.result[0].mainCompanyName;
        const pathsArr = resp.data.result[0].paths;
        this.blackList = pathsArr;
        // 判断是否从关联关系跳转过来
        if (this.jumpNode !== '') {
          const tmp = this.blackNetwork.paths.findIndex((path) => path.blackListNode === this.jumpNode);
          this.expandIdx = tmp > 0 ? tmp : this.expandIdx;
        }
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
    this.modalFocusIdx = -1;
    this.detailModalData = {};
  }
}
export default new BlackNetworkStore();
