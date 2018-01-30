import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import { clientApi } from 'api';

class ClientStore {
  @observable userInfo = {};
  @observable version = 'v2';
  @observable isOldClient = false;
  // @observable envConfig = 'local';

  @action.bound combineServerData(data) {
    this.userInfo = data.userInfo;
    // this.envConfig = data.envConfig;
  }
  @action.bound handleLogin(data) {
    this.userInfo = data;
    const isNewUser = false;
    // 路由跳转
    let pathname = isNewUser ? '/v2/interface/introduce' : '/v1/interface/introduce';
    if (localStorage.pathname) {
      pathname = localStorage.pathname;
    }
    browserHistory.push(pathname);
    // 版本判断
    if (isNewUser) {
      this.version = 'v2';
      this.isOldClient = false;
    } else {
      this.version = 'v1';
      this.isOldClient = true;
      console.log('请跳转新版本');
    }
  }

  @action.bound loginOut() {
    clientApi.loginOut()
      .then(() => {
        localStorage.removeItem('pathname');
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
