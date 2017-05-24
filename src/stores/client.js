import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import { clientApi } from 'api';

class ClientStore {
  @observable userInfo = {};
  @observable envConfig = 'cfca_prod';

  @action.bound combineServerData(data) {
    this.userInfo = data.userInfo;
    this.envConfig = data.envConfig;
  }

  @action.bound loginOut() {
    clientApi.loginOut()
      .then(() => {
        browserHistory.push('/');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
}
export default new ClientStore();
