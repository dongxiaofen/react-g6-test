import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
// import {showAlert} from './alert';
import {openTextModal} from './modal';
import * as apis from 'helpers/api';
class RelationStore {
  @observable monitorId = '';
  @observable mainCompany = '';
  @observable relationData = {};
  @action.bound getRelation() {
    apis.getRelation(this.monitorId)
      .then(action('get relation...', (resp) => {
        console.log('关系网络图', resp);
        this.relationData = this.handleNetworkData(resp.data);
        browserHistory.push('/relation');
      }))
      .catch(action('关系网络图出错', (err) => {
        console.log('关系网络图出错', err.response);
        openTextModal('警告', err.response.data.message);
        // openAsyncModal((callback) => {
        //   require.ensure([], (require) => {
        //     callback(require('components/test/Test'));
        //   });
        // });
        // showAlert('warning', err.response.data.message, () => {
        //   alert('自定义关闭alert事件');
        // });
      }));
  }
  handleNetworkData(network) {
    const res = {};
    res.nodes = [];
    res.links = [];
    res.nodes = network.currentNetwork.nodes.map((node)=>{
      node.id = node.name;
      return node;
    });
    res.links = this.linksToIndex(network);
    return res;
  }
  linksToIndex(network) {
    return network.currentNetwork.links.map((link) => {
      const fromIndex = network.currentNetwork.nodes[network.currentNetwork.nodes.findIndex((node) => node.name === link.source)].name;
      const toIndex = network.currentNetwork.nodes[network.currentNetwork.nodes.findIndex((node) => node.name === link.target)].name;
      return {from: fromIndex, to: toIndex, linkData: link};
    });
  }
}
export default new RelationStore();
