import { observable, action } from 'mobx';
import {ruleCompanyApi} from 'api';
import uiStore from './ui';
class RuleCompanyStore {
  // 列表数据
  @observable companyList = [];
  // 搜索框
  @observable searchInput = '';
  // 搜索框发送字段
  @observable searchInputSend = '';
  // loading
  @observable loading = false;
  // 获取列表
  @action.bound getCompanyList() {
    // 打开loading
    this.loading = true;
    const params = {
      index: uiStore.uiState.ruleCompanyListPager.index,
      size: uiStore.uiState.ruleCompanyListPager.size,
      companyName: this.searchInputSend,
    };
    ruleCompanyApi.getCompanyList(params)
      .then(action('ruleCompanyList list', (resp) => {
        this.companyList = resp.data.content;
        // 关闭loading
        this.loading = false;
        uiStore.uiState.ruleCompanyListPager.totalElements = resp.data.totalElements;
      }))
      .catch(action('ruleCompanyList error', (err) => {
        // 关闭loading
        this.loading = false;
        console.log(err.response, '=====ruleCompanyList error');
      }));
  }
  // 填写搜索
  @action.bound changeName(evt) {
    this.searchInput = evt.target.value;
  }
  // 搜索handleEnter
  @action.bound handleEnter(evt) {
    if (evt.keyCode === 13) {
      this.searchInputSend = evt.target.value;
      uiStore.uiState.ruleCompanyListPager.index = 1;
      uiStore.uiState.ruleCompanyListPager.size = 10;
      // 发送请求
      this.getCompanyList();
    }
  }
  // 重置数据
  @action.bound resetData() {
    this.companyList = [];
    this.searchInput = '';
    this.searchInputSend = '';
    this.loading = false;
    uiStore.uiState.ruleCompanyListPager.index = 1;
    uiStore.uiState.ruleCompanyListPager.size = 10;
  }
}
export default new RuleCompanyStore();
