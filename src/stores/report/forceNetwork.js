import { observable, action, toJS } from 'mobx';
import { companyHomeApi } from 'api';
import bannerStore from '../banner';
import { browserHistory } from 'react-router';
import * as svgTools from 'helpers/svgTools';

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
    company: {},
  }
  @action.bound saveNetwork(nextLocation) {
    this.isExpandSaved = true;
    browserHistory.push(nextLocation.pathname + nextLocation.search);
  }
  @action.bound expand() {
    this.expandNetwork.nodes = [];
    this.expandNetwork.links = [];
    const source = '6E130A9157DFD30DCC1EF0CFDF8FE7136BE994FD0CEA769F83AC6CD0938BC96E';
    const target = '31F8E5035EACAABDCB950A6E17257F204A429561BFB7CC063D741DD356A8A5A6';
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
        this.expandNetwork.links.pop();
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
            console.info('网络图link名字和node不对应', link);
          }
        });
        resp.data.currentNetwork.nodes.map((node) => {
          node.hide = true;
          if (node.layer === -1) {
            // canRenderSvg = false;
            // console.info('网络图node的layer有-1', node);
          }
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
        this.nodeInfo.company = resp.data;
      }))
      .catch(action((error) => {
        console.log('getCompNodeInfo出错', error);
      }));
  }
}
export default new ForceNetworkStore();
