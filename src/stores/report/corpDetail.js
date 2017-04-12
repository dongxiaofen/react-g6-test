import { observable, action } from 'mobx';
class CorpDetailStore {
  @observable name = 4;
  @action.bound foo() {
    console.log();
  }
}
export default new CorpDetailStore();
