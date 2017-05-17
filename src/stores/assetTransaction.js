import { observable, action } from 'mobx';
class AssetTransactionStore {
  @observable xxxx = '';

  @action.bound aaaa() {
    console.log(111111);
  }
}
export default new AssetTransactionStore();
