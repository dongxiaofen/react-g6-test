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
    ruleCompanyApi.getCompanyList(uiStore.uiState.ruleCompanyListPager)
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
}
export default new RuleCompanyStore();
