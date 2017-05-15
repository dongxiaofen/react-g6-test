import { observable, action } from 'mobx';
class AccountProfileStore {
  @observable a = 4;
  @action.bound get() {
    console.log('miss error');
  }
}
export default new AccountProfileStore();
