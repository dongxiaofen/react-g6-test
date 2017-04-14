import { observable, action } from 'mobx';
import { clientApi } from 'api';

class ClientStore {
  // @observable obj = {
  //   userInfo: {},
  //   envConfig: 'local'
  // };
  @observable userInfo = {};
  @observable envConfig = 'gd_dianxin_prod';

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

