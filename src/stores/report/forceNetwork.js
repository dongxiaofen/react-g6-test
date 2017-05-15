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
  @observable dbFocalNode = {};

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
          console.log(resp.data.currentNetwork, 12111111111111);
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
  @action.bound setFocalNode(node) {
    this.dbFocalNode = node;
  }
}
export default new ForceNetworkStore();
