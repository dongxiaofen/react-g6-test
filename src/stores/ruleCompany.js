import { observable, action } from 'mobx';
class RuleCompanyStore {
  // 列表数据
  @observable companyList = [];
  // 获取列表
  @action.bound getCompanyList() {}
}
export default new RuleCompanyStore();
