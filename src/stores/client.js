import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import { clientApi } from 'api';
import modalStore from './modal';
import pathval from 'pathval';

class ClientStore {
  @observable userInfo = {};
  @observable version = 'v2';
  @observable isOldClient = false;
  // @observable envConfig = 'local';
  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }
  @action.bound combineServerData(data) {
    this.userInfo = data.userInfo;
    // this.envConfig = data.envConfig;
  }
  @action.bound handleLogin(data) {
    this.userInfo = data;
    const isNewUser = data.versionNo !== 'V1';
    // 路由跳转
    let pathname = isNewUser ? '/v2/introduce' : '/v1/introduce';
    if (localStorage.pathname) {
      pathname = localStorage.pathname;
    }
    browserHistory.push(pathname);
    // 版本判断
    this.handleVersion(isNewUser, 'login');
  }
  @action.bound handleVersion(isNewUser, type) {
    if (isNewUser) {
      this.version = 'v2';
      this.isOldClient = false;
    } else {
      this.version = 'v1';
      this.isOldClient = true;
      if (type === 'login') {
        // console.log('请跳转新版本');
        this.openVersionAlert();
      }
    }
  }
  @action.bound openVersionAlert() {
    const data = {
      isCustomize: true,
      width: 700,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('components/common/VersionAlert'));
        });
      }
    };
    modalStore.openCompModal(data);
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
        const isNewUser = data.versionNo !== 'V1';
        const routeVersion = window.location.pathname.split('/')[1];
        // console.log(routeVersion, 'routeVersion');
        if (routeVersion === data.versionNo.toLowerCase()) {
          this.handleVersion(isNewUser, 'getUserInfo');
        } else {
          this.version = routeVersion;
          this.isOldClient = data.versionNo === 'V1';
        }
      }))
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new ClientStore();
