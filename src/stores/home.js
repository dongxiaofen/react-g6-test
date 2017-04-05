/* @flow */
import { observable, action } from 'mobx';
import * as apis from 'helpers/api';
class HomeStore {
  @observable isLogin = false;
  @action.bound postLogin() {
    const params = {
      email: 'yadong.wu@sc.cn',
      password: '25f9e794323b453885f5181f1b624d0b'
    };
    apis.postLogin(params)
      .then(action('login...', (response) => {
        if (response.status === 200) {
          this.isLogin = true;
          location.reload();
        }
      }))
      .catch((err)=>{
        console.log('登录失败', err);
      });
  }
  // @action combineServerData(data) {
  //   this.isLogin = data.isLogin;
  // }
}
export default new HomeStore();
