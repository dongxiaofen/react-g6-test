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
  @observable base = {};
  @observable tabs = {
    business: {
      reportAndMonitor: {},
      province: {},
      industry: {},
      scale: {},
    },
    consume: {},
    recharge: {},
    summary: {},
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
    this.base = {};
    accountSettingApi.getUserInfo(uId)
      .then(action('getUserInfo_success', resp => {
        this.base = {data: resp.data};
      }))
      .catch(action('getUserInfo_error', err => {
        console.log(err);
        this.base = {data: {}};
      }));
  }
  @action.bound getReportAndMonitor(uId) {
    this.tabs.business.reportAndMonitor = {};
    accountSettingApi.getReportAndMonitor(uId)
      .then(action('getReportAndMonitor_success', resp => {
        this.tabs.business.reportAndMonitor = {data: resp.data};
      }))
      .catch(action('getReportAndMonitor_error', err => {
        console.log(err);
        this.tabs.business.reportAndMonitor = {error: err.response.data};
      }));
  }
  @action.bound getProvince(uId) {
    this.tabs.business.province = {};
    accountSettingApi.getProvince(uId)
      .then(action('getProvince_success', resp => {
        this.tabs.business.province = {content: resp.data};
      }))
      .catch(action('getProvince_error', err => {
        console.log(err);
        this.tabs.business.province = {error: err.response.data};
      }));
  }
  @action.bound getIndustry(uId) {
    this.tabs.business.industry = {};
    accountSettingApi.getIndustry(uId)
      .then(action('getIndustry_success', resp => {
        this.tabs.business.industry = {content: resp.data};
      }))
      .catch(action('getIndustry_error', err => {
        console.log(err);
        this.tabs.business.industry = {error: err.response.data};
      }));
  }
  @action.bound getScale(uId) {
    this.tabs.business.scale = {};
    accountSettingApi.getScale(uId)
      .then(action('getScale_success', resp => {
        this.tabs.business.scale = {data: resp.data};
      }))
      .catch(action('getScale_error', err => {
        console.log(err);
        this.tabs.business.scale = {error: err.response.data};
      }));
  }
  @action.bound getConsume(uId) {
    this.tabs.consume = {};
    accountSettingApi.getConsume(uId)
      .then(action('getConsume_success', resp => {
        this.tabs.consume = resp.data;
      }))
      .catch(action('getConsume_error', err => {
        console.log(err);
        this.tabs.consume = {error: err.response.data};
      }));
  }
  @action.bound getRecharge(uId) {
    this.tabs.recharge = {};
    accountSettingApi.getRecharge(uId)
      .then(action('getRecharge_success', resp => {
        this.tabs.recharge = resp.data;
      }))
      .catch(action('getRecharge_error', err => {
        console.log(err);
        this.tabs.recharge = {error: err.response.data};
      }));
  }
  @action.bound getSummary(uId) {
    this.tabs.summary = {};
    accountSettingApi.getSummary(uId)
      .then(action('getSummary_success', resp => {
        this.tabs.summary = resp.data;
      }))
      .catch(action('getSummary_error', err => {
        console.log(err);
        this.tabs.summary = {error: err.response.data};
      }));
  }
}

export default new AccountSettingStore();
