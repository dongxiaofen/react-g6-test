import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
class ForceNetworkStore {
  @observable error = '';
  @observable isLoading = true;
  @observable isMount = false;
  @observable forceNetwork = {
    nodes: []
  };
  @observable mainCompanyName = '';
  @observable expandNetwork = {
    nodes: [],
    links: [],
    change: false
  };
  @observable focusNodeName = '';

  @action.bound expand() {
    this.expandNetwork.nodes = [];
    this.expandNetwork.links = [];
    this.expandNetwork.nodes.push({
      'category': 4,
      'status': 1,
      'layer': 1,
      'keyCate': 0,
      'name': '杭州誉存科技有限公司',
      'degree': 1,
      'cateType': 1,
      'caseRecord': [],
      'pdfPrint': 0,
      'blackList': false,
      'state': 0,
      'linkedNodes': [],
      'cateList': [
        4
      ],
      'esDate': '2014-07-14',
      'firstLayer': 0
    });
    this.expandNetwork.links.push({
      'target': '杭州誉存科技有限公司',
      'invConum': -1,
      'state': 0,
      'current': 1,
      'source': '重庆贝牛网络科技有限公司綦江分公司',
      'invRatio': -1,
      'linkCate': 0,
      'property': 2,
      'name': {
        '高管': [
          '执行董事'
        ]
      }
    });
    this.expandNetwork.change = !this.expandNetwork.change;
  }
  @action.bound focusNode(name) {
    this.focusNodeName = name;
  }
  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule(params)
      .then(action('get forceNetwork data', (resp) => {
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
          this.forceNetwork = resp.data.currentNetwork;
          this.mainCompanyName = resp.data.companyName;
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
}
export default new ForceNetworkStore();
