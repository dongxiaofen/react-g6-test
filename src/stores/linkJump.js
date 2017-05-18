import { observable, action } from 'mobx';
class LinkJumpStore {
  // 点击名称 如公司名等
  @observable name = '';
  // 获取报告类型
  @action.bound getNameType() {}
}
export default new LinkJumpStore();
