import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import { clientApi } from 'api';
import message from './message';

class ClientStore {
  @observable userInfo = {};
  @observable envConfig = 'local';

  @action.bound combineServerData(data) {
    this.userInfo = data.userInfo;
  }

  @action.bound loginOut() {
    clientApi.loginOut()
      .then(() => {
        browserHistory.push('/');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        message.openMessage({ content: '退出失败' });
      });
  }
}
export default new ClientStore();
