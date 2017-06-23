import { observable, action, computed, extendObservable, toJS } from 'mobx';
import { companyHomeApi } from 'api';
import networkType from 'dict/networkType';
import blackNetworkStore from './blackNetwork';
import leftBarStore from '../leftBar';
import messageStore from '../message';
import { browserHistory } from 'react-router';
import pathval from 'pathval';
import modalStore from '../modal';

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
  @observable targetComp = '';
  @observable monitorInfoList = [];
  @observable mainCompanyName = '';
  @observable layout = 'circle';
  @observable focusNodeName = '';
  @observable focusNodeInfo = {};
  @observable searchKey = '';
  @observable currentLevel = 1;
  @observable totalLevel = 1;
  @observable showFullScreen = false;
  @observable showSearchInput = false;
  @observable shortestPath = [];
  @observable shortPathLoading = false;
  @action.bound monitorExistNode(monitorId, params) {
    modalStore.confirmLoading = true;
    companyHomeApi.monitorExistNode(monitorId, params)
      .then(action('monitorExistNode', (resp) => {
        modalStore.confirmLoading = false;
        modalStore.closeAction();
        messageStore.openMessage({ content: '添加关联成功！' });
        this.monitorInfoList = resp.data.monitorInfoList;
      }))
      .catch(action('monitorExistNode err', (err) => {
        modalStore.confirmLoading = false;
        modalStore.closeAction();
        messageStore.openMessage({ content: err.response.data.message, type: 'warning' });
      }));
  }
  // @action.bound gotoSearch(name) {
  //   searchCompanyStore.searchTabClick('COMPANY_NAME');
  //   searchCompanyStore.searchChangeOther(name);
  //   searchCompanyStore.getCompanyList();
  //   browserHistory.push(`/searchCompany`);
  // }
  @action.bound jumpBlackNode(name, params) {
    console.log(blackNetworkStore.jumpNode, name, 'blackNetworkStore.jumpNode---------');
    blackNetworkStore.jumpNode = name;
    // 修改导航高亮
    leftBarStore.activeItem = 'blackNetwork';
    browserHistory.push(`/companyHome/blackNetwork${params}`);
  }
  @action.bound selectLevel(currentLevel) {
    this.currentLevel = currentLevel;
  }
  @action.bound toggleFullScreen() {
    this.showFullScreen = !this.showFullScreen;
  }
  @action.bound focusNode(name) {
    this.focusNodeName = name;
    this.nodePanel.show = name === this.mainCompanyName ? false : true;
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
    companyHomeApi.getReportModule('network', params)
      .then(action('get currentNetwork data', (resp) => {
        this.isLoading = false;
        let canRenderSvg = true;
        resp.data.currentNetwork.links.map((link) => {
          if (resp.data.currentNetwork.nodes.findIndex((node) => node.name === link.source) < 0 || resp.data.currentNetwork.nodes.findIndex((node) => node.name === link.target) < 0) {
            canRenderSvg = false;
            console.info('网络图link名字和node不对应', link);
          }
        });
        resp.data.currentNetwork.nodes.map((node) => {
          if (node.layer === -1) {
            // canRenderSvg = false;
            console.info('网络图node的layer有-1', node);
          }
        });
        if (!canRenderSvg || resp.data.currentNetwork.nodes[0].layer === undefined) {
          this.error = {
            message: '网络图数据异常, 请联系管理员'
          };
        } else {
          this.currentNetwork = resp.data.currentNetwork;
          this.mainCompanyName = resp.data.companyName;
          this.monitorInfoList = resp.data.monitorInfoList;
          this.targetComp = resp.data.targetComp;
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
          // 如果节点数超过50, 初始化只展示第一层节点
          this.currentNetwork.nodes.map((node) => {
            if (resp.data.currentNetwork.nodes.length > 50) {
              node.hide = node.firstLayer === 1 ? false : true;
            } else {
              node.hide = false;
            }
          });
          this.currentLevel = resp.data.currentNetwork.nodes.length > 50 ? 1 : Object.keys(layerCount).length;
        }
      }))
      .catch(action('currentNetwork出错', (err) => {
        console.log('currentNetwork出错', err);
        this.error = {
          message: '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考'
        };
        this.isLoading = false;
      }));
  }
  @action.bound showRelation() {
    const args = {
      width: '960px',
      boxStyle: {
        padding: '20px 0',
      },
      isNeedBtn: false,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('components/companyHome/report/network/CurrentNetwork/RelationTable'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
  }
  @action.bound getShortestPath(params) {
    this.shortPathLoading = true;
    companyHomeApi.getShortestPath(params)
    .then(action('shortest ', (resp)=>{
      console.log(resp.data);
      this.shortestPath = [['重庆商社（集团）有限公司', '重庆百货大楼股份有限公司', '重庆市国有资产监督管理委员会']];
      this.shortPathLoading = false;
    }))
    .catch(action('shortest error', (error)=>{
      console.log(error, 'shortest path error');
      this.shortestPath = [['重庆商社（集团）有限公司', '重庆百货大楼股份有限公司', '重庆市国有资产监督管理委员会']];
      messageStore.openMessage({ content: '数据获取失败', type: 'warning' });
      this.shortPathLoading = false;
    }));
  }
  @action.bound updateValue(keyPath, value) {
    pathval.setPathValue(this, keyPath, value);
  }
  @action.bound resetStore() {
    this.error = '';
    this.isLoading = true;
    this.isMount = false;
    this.currentNetwork = {
      nodes: []
    };
    this.monitorInfoList = [];
    this.targetComp = '';
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
  @action.bound resetSvg() { // 报告内路由切换时重置网络图状态
    this.layout = 'circle';
    this.focusNodeName = '';
    this.searchKey = '';
    this.currentLevel = this.currentNetwork.nodes.length > 50 ? 1 : this.totalLevel;
    this.nodePanel.show = false;
    if (this.targetComp !== '') {
      this.typeList.labelArr = [];
      this.typeList.countArr = [];
      this.typeList.checkedArr = [];
      const sumOfType = (sumSoFar, item) => {
        return sumSoFar + this.targetComp[item].length;
      };
      networkType.map((type) => {
        const count = type.key.reduce(sumOfType, 0);
        const checked = count === 0 ? false : true;
        this.typeList.countArr.push(count);
        this.typeList.checkedArr.push(checked);
        this.typeList.labelArr.push(type.label);
      });
      this.typeList.checkedArrChanged = false;
    }
  }

}
export default new NetworkStore();
