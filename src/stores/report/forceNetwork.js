import { observable, action, toJS } from 'mobx';
import { companyHomeApi } from 'api';
import bannerStore from '../banner';
import { browserHistory } from 'react-router';
import * as svgTools from 'helpers/svgTools';
import pathval from 'pathval';

class ForceNetworkStore {
  @observable error = '';
  @observable isLoading = true;
  @observable isMount = false;
  @observable forceNetwork = {
    nodes: [],
    links: []
  };
  @observable mainCompanyName = '';
  @observable dbFocalNode = {};
  @observable expandNetwork = {
    nodes: [],
    links: [],
    change: false
  };
  @observable focalNode = {};
  @observable isExpandSaved = true;
  @observable shortestPahth = [];
  @observable centerNode = {
    id: '',
  };
  @observable nodeInfo = {
    isShowInfo: false,
    detailInfo: {},
    tabAct: 0,
  }
  @observable zoomIndex = 1;
  @action.bound saveNetwork(nextLocation) {
    this.isExpandSaved = true;
    browserHistory.push(nextLocation.pathname + nextLocation.search);
  }
  @action.bound expand() {
    this.expandNetwork.nodes = [];
    this.expandNetwork.links = [];
    const source = '7C6B00F8E8AE273AE43412572F8B57E0E3F2BB5ABDE4FAA8AB3CB4769A1F3E93';
    const target = '5D5D8F1C928299E884A210A93E53088B7D0BADF1739D34A9667A1AC945658360';
    const currentNetwork = toJS(svgTools.getCurrentNodesLinks(this.forceNetwork));
    companyHomeApi.expandNetwork(bannerStore.monitorId, { target, source, currentNetwork })
      .then(action('get expand data', (resp) => {
        // console.log(resp);
        resp.data.currentNetwork.nodes.map((node) => {
          node.hide = true;
        });
        resp.data.currentNetwork.links.map((link) => {
          link.hide = true;
        });
        this.expandNetwork.nodes = resp.data.currentNetwork.nodes;
        this.expandNetwork.links = resp.data.currentNetwork.links;
        this.expandNetwork.change = !this.expandNetwork.change;
        this.isExpandSaved = false;
      }))
      .catch(action('get expand出错', (err) => {
        console.log('get expand出错', err);
        this.expandNetwork.change = !this.expandNetwork.change;
      }));
    // this.expandNetwork.nodes.push({
    //   hide: true,
    //   'layer': 1,
    //   'id': '3C6E9F1B195ECD56BEBE7AD301281FABFE18147CF8BCDDDA1FB9A8C02A2179B1',
    //   'name': '重庆预存大数据',
    //   'degree': 1,
    //   'cateType': 1,
    // });
    // this.expandNetwork.links = this.expandNetwork.links.concat([{
    //   hide: true,
    //   'target': '3C6E9F1B195ECD56BEBE7AD301281FABFE18147CF8BCDDDA1FB9A8C02A2179B1',
    //   'lineType': 3,
    //   'source': '6E130A9157DFD30DCC1EF0CFDF8FE7136BE994FD0CEA769F83AC6CD0938BC96E',
    // },
    // {
    //   hide: true,
    //   'target': '3C6E9F1B195ECD56BEBE7AD301281FABFE18147CF8BCDDDA1FB9A8C02A2179B1',
    //   'lineType': 3,
    //   'source': '31F8E5035EACAABDCB950A6E17257F204A429561BFB7CC063D741DD356A8A5A6',
    // }]);
    // setTimeout(action('test', () => {
    //   this.expandNetwork.nodes = [];

    //   this.expandNetwork.change = !this.expandNetwork.change;
    // }), 2000);
    // this.expandNetwork.change = !this.expandNetwork.change;
    // this.isExpandSaved = false;
  }
  @action.bound focusNode(node) {
    this.focalNode = node;
    this.nodeInfo.isShowInfo = true;
  }
  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule(params)
      .then(action('get forceNetwork data', (resp) => {
        this.isLoading = false;
        let canRenderSvg = true;
        resp.data.currentNetwork.links.map((link) => {
          link.hide = true;
          if (resp.data.currentNetwork.nodes.findIndex((node) => node.id === link.source) < 0 || resp.data.currentNetwork.nodes.findIndex((node) => node.id === link.target) < 0) {
            canRenderSvg = false;
            console.info('网络图link名字异常', link);
          }
        });
        resp.data.currentNetwork.nodes.map((node) => {
          node.hide = true;
          // if (resp.data.currentNetwork.links.findIndex((link) => node.id === link.source) < 0 || resp.data.currentNetwork.links.findIndex((link) => node.id === link.target) < 0) {
          //   canRenderSvg = false;
          //   console.info('网络图node名字异常', node);
          // }
          // if (node.layer === -1) {
          //   // canRenderSvg = false;
          //   // console.info('网络图node的layer有-1', node);
          // }
        });
        if (!canRenderSvg || resp.data.currentNetwork.nodes[0].layer === undefined) {
          this.error = {
            message: '网络图数据异常, 请联系管理员'
          };
        } else {
          this.forceNetwork = resp.data.currentNetwork;
          this.mainCompanyName = resp.data.currentNetwork.companyName;
          this.centerNode.id = resp.data.source;
        }
      }))
      .catch(action('forceNetwork出错', (err) => {
        console.log('forceNetwork出错', err);
        this.error = {
          message: '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考'
        };
        this.isLoading = false;
      }));
  }
  @action.bound setFocalNode(node) {
    this.dbFocalNode = node;
    this.nodeInfo.isShowInfo = true;
  }
  @action.bound getShortPath(monitorId, params) {
    companyHomeApi.getShortPath(monitorId, params)
      .then(action('get short path', (resp) => {
        this.shortestPahth = resp.data;
      }))
      .catch(action((error) => {
        console.log('getShortPathk出错', error);
      }));
  }
  @action.bound getCompNodeInfo(monitorId, params) {
    companyHomeApi.getCompNodeInfo(monitorId, params)
      .then(action('getCompNodeInfo', (resp) => {
        this.nodeInfo.detailInfo = resp.data;
      }))
      .catch(action((error) => {
        this.nodeInfo.detailInfo = { error: true };
        console.log('getCompNodeInfo出错', error);
      }));
  }
  @action.bound getPersonNodeInfo(monitorId, params) {
    companyHomeApi.getPersonNodeInfo(monitorId, params)
      .then(action('getPersonNodeInfo', (resp) => {
        this.nodeInfo.detailInfo = resp.data;
      }))
      .catch(action((error) => {
        this.nodeInfo.detailInfo = { error: true };
        console.log('getPersonNodeInfo', error);
      }));
  }
  @action.bound updateValue(keyPath, value) {
    pathval.setPathValue(this, keyPath, value);
  }
  @action.bound resetNodeInfo() {
    this.nodeInfo.detailInfo = {};
    this.nodeInfo.tabAct = 0;
  }
  @action.bound resetNetWork() {
    this.zoomIndex = 1;
    this.dbFocalNode = {};
    this.focalNode = {};
    this.nodeInfo = {
      isShowInfo: false,
      detailInfo: {},
      tabAct: 0,
    };
  }
}
export default new ForceNetworkStore();
