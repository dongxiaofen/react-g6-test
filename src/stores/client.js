import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import { clientApi } from 'api';

class ClientStore {
  @observable userInfo = {};
  @observable envConfig = 'local';
  @observable taxPause = true;

  @action.bound combineServerData(data) {
    this.userInfo = data.userInfo;
    this.envConfig = data.envConfig;
    this.taxPause = data.taxPause;
  }

  @action.bound loginOut(notRouteToHome) {
    clientApi.loginOut()
      .then(() => {
        if (!notRouteToHome) {
          browserHistory.push('/');
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
}
export default new ClientStore();
