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
        checkedArrChanged: false,
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
  @observable mainCompanyName = '';
  @observable layout = 'circle';
  @observable focusNodeName = '';
  @observable searchKey = '';
  @observable currentLevel = 1;
  @observable totalLevel = 1;
  @observable showFullScreen = false;

  @action.bound selectLevel(currentLevel) {
    this.currentLevel = currentLevel;
  }
  @action.bound toggleFullScreen() {
    this.showFullScreen = !this.showFullScreen;
  }
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
    this.typeList.checkedArrChanged = !this.typeList.checkedArrChanged;
  }
  @action.bound toggleCheckAll() {
    if (this.typeList.allChecked) {
      this.typeList.checkedArr = [false, false, false, false, false, false, false, false];
    } else {
      this.typeList.checkedArr = [true, true, true, true, true, true, true, true];
    }
    this.typeList.checkedArrChanged = !this.typeList.checkedArrChanged;
  }
  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule(params)
      .then(action('get currentNetwork data', (resp) => {
        this.isLoading = false;
        this.currentNetwork = resp.data.currentNetwork;
        this.mainCompanyName = resp.data.companyName;
        this.monitorInfoList = resp.data.monitorInfoList;
        const sumOfType = (sumSoFar, item) => {
          return sumSoFar + resp.data.targetComp[item].length;
        };
        networkType.map((type) => {
          const count = type.key.reduce(sumOfType, 0);
          const checked = count === 0 ? false : true;
          this.typeList.countArr.push(count);
          this.typeList.checkedArr.push(checked);
          this.typeList.labelArr.push(type.label);
        });
        // 获取totalLevel
        const layerCount = {};
        resp.data.currentNetwork.nodes.map((node) => {
          if (node.layer !== -1) {
            const nodeLayer = node.layer ? node.layer : 1;
            if (layerCount[nodeLayer] === undefined) {
              layerCount[nodeLayer] = 1;
            } else {
              layerCount[nodeLayer]++;
            }
          }
        });
        this.totalLevel = Object.keys(layerCount).length;
      }))
      .catch(action('currentNetwork出错', (err) => {
        console.log('currentNetwork出错', err.response.data);
        this.error = err.response.data;
        this.isLoading = false;
      }));
  }
  @action.bound resetStore() {
    this.error = '';
    this.isLoading = true;
    this.isMount = false;
    this.currentNetwork = {
      nodes: []
    };
    this.monitorInfoList = [];
    this.mainCompanyName = '';
    this.layout = 'circle';
    this.focusNodeName = '';
    this.searchKey = '';
    this.currentLevel = 1;
    this.nodePanel.show = false;
    this.typeList.labelArr = [];
    this.typeList.countArr = [];
    this.typeList.checkedArr = [];
    this.typeList.checkedArrChanged = false;
  }
}
export default new NetworkStore();
