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
        const uId = treeData.formatResult[0].id;
        this.getUserInfo(uId);
        this.getReportAndMonitor(uId);
        this.getProvince(uId);
        this.getIndustry(uId);
        this.getScale(uId);
        this.getConsume(uId);
        this.getRecharge(uId);
        this.getSummary(uId);
      }))
      .catch(action('getTreeList_error', err => {
        console.log(err);
        this.tree.data = {error: err.response.data, content: []};
      }));
  }
  @action.bound getUserInfo(uId) {
    accountSettingApi.getUserInfo(uId)
      .then(action('getUserInfo_success', resp => {
        console.log(resp);
      }))
      .catch(action('getUserInfo_error', err => {
        console.log(err);
      }));
  }
  @action.bound getReportAndMonitor(uId) {
    accountSettingApi.getReportAndMonitor(uId)
      .then(action('getReportAndMonitor_success', resp => {
        console.log(resp);
      }))
      .catch(action('getReportAndMonitor_error', err => {
        console.log(err);
      }));
  }
  @action.bound getProvince(uId) {
    accountSettingApi.getProvince(uId)
      .then(action('getProvince_success', resp => {
        console.log(resp);
      }))
      .catch(action('getProvince_error', err => {
        console.log(err);
      }));
  }
  @action.bound getIndustry(uId) {
    accountSettingApi.getIndustry(uId)
      .then(action('getIndustry_success', resp => {
        console.log(resp);
      }))
      .catch(action('getIndustry_error', err => {
        console.log(err);
      }));
  }
  @action.bound getScale(uId) {
    accountSettingApi.getScale(uId)
      .then(action('getScale_success', resp => {
        console.log(resp);
      }))
      .catch(action('getScale_error', err => {
        console.log(err);
      }));
  }
  @action.bound getConsume(uId) {
    accountSettingApi.getConsume(uId)
      .then(action('getConsume_success', resp => {
        console.log(resp);
      }))
      .catch(action('getConsume_error', err => {
        console.log(err);
      }));
  }
  @action.bound getRecharge(uId) {
    accountSettingApi.getRecharge(uId)
      .then(action('getRecharge_success', resp => {
        console.log(resp);
      }))
      .catch(action('getRecharge_error', err => {
        console.log(err);
      }));
  }
  @action.bound getSummary(uId) {
    accountSettingApi.getSummary(uId)
      .then(action('getSummary_success', resp => {
        console.log(resp);
      }))
      .catch(action('getSummary_error', err => {
        console.log(err);
      }));
  }
}

export default new AccountSettingStore();
