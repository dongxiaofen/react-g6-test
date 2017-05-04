import { observable, action } from 'mobx';

class ClientStore {
  @observable userInfo = {};
  @observable envConfig = 'local';

  @action combineServerData(data) {
    this.userInfo = data.userInfo;
  }
}
export default new ClientStore();
