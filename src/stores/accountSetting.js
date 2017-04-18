import { observable, action } from 'mobx';
import { accountSettingApi } from 'api';
import pathval from 'pathval';
import Formater from 'helpers/formatTreeData';
class AccountSettingStore {
  @observable tree = {
    addModal: {
      show: false,
      form: {},
    },
    searchInput: '',
    activeIndex: 0,
    data: {},
  };
  @observable base = {

  };
  @observable tabs = {

  };
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound getTreeList() {
    accountSettingApi.getTreeList()
      .then(action('getTreeList_success', resp => {
        const treeData = new Formater(resp);
        treeData.formatData(null, null, 'cy@sc.cn');
        this.tree.data = {content: treeData.formatResult};
      }))
      .catch(action('getTreeList_error', err => {
        console.log(err);
        this.tree.data = {error: err.response.data, content: []};
      }));
  }
}

export default new AccountSettingStore();
