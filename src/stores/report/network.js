import { observable, action, computed, extendObservable, toJS } from 'mobx';
import { companyHomeApi } from 'api';
import networkType from 'dict/networkType';

class NetworkStore {
  constructor() {
    extendObservable(this, {
      nodePanel: {
        show: false,
        nodeData: computed(() => {
          return this.currentNetwork.nodes.find((node) => node.name === this.focusNodeName);
        })
      },
      typeList: {
        labelArr: [],
        countArr: [],
        checkedArr: [],
        allChecked: computed(function getAllChecked() {
          return toJS(this.checkedArr).every((item, idx) => item === true || this.countArr[idx] === 0);
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
  // @observable targetComp = {};
  @observable mainCompanyName = '';
  @observable layout = 'circle';
  @observable focusNodeName = '';
  @observable searchKey = '';
  @observable currentLevel = 1;

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
  @action.bound toggleChecked(idx) {
    this.typeList.checkedArr[idx] = !this.typeList.checkedArr[idx];
  }
  @action.bound toggleCheckAll() {
    if (this.typeList.allChecked) {
      this.typeList.checkedArr = [false, false, false, false, false, false, false, false];
    } else {
      this.typeList.checkedArr = [true, true, true, true, true, true, true, true];
    }
  }
  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get currentNetwork data', (resp) => {
        this.isLoading = false;
        this.currentNetwork = resp.data.currentNetwork;
        this.mainCompanyName = resp.data.companyName;
        this.monitorInfoList = resp.data.monitorInfoList;
        // this.targetComp = resp.data.targetComp;

        const sumOfType = (sumSoFar, item) => {
          return sumSoFar + resp.data.targetComp[item].length;
        };
        networkType.map((type) => {
          const count = type.key.reduce(sumOfType, 0);
          const checked = count === 0 ? false : true;
          // const expand = count === 0 ? -1 : 0;
          // const focus = count === 0 ? -1 : 0;
          this.typeList.countArr.push(count);
          this.typeList.checkedArr.push(checked);
          // focusArr.push(focus);
          this.typeList.labelArr.push(type.label);
          // expandArr.push(expand);
        });
      }))
      .catch(action('currentNetwork出错', (err) => {
        console.log('currentNetwork出错', err.response.data);
        this.error = err.response.data;
        this.isLoading = false;
      }));
  }
}
export default new NetworkStore();
