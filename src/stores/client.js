import { observable, action } from 'mobx';
import { clientApi } from 'api';

class ClientStore {
  @observable userInfo = {};
  @observable envConfig = 'local';

  @action.bound getUserInfo() {
    clientApi.getUserInfo()
      .then(action('获取用户信息', (response) => {
        console.log(response);
      }))
      .catch((err)=>{
        console.log('获取失败', err.response);
      });
  }
}
export default new ClientStore();

