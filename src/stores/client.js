import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import { clientApi } from 'api';

class ClientStore {
  @observable userInfo = {};
  // @observable envConfig = 'local';

  @action.bound combineServerData(data) {
    this.userInfo = data.userInfo;
    // this.envConfig = data.envConfig;
  }

  @action.bound loginOut() {
    clientApi.loginOut()
      .then(() => {
        browserHistory.push('/login');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        browserHistory.push('/login');
        window.location.reload();
      });
  }

  @action.bound getUserInfo() {
    clientApi.getUserInfo()
      .then(action('get-userinfo-success', ({data}) => {
        // console.log(data);
        this.userInfo = data;
      }))
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new ClientStore();
