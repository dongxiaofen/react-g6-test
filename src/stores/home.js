/* @flow */
import { observable, action } from 'mobx';
import {loginApi} from 'api';
class HomeStore {
  @observable isLogin = false;
  @action.bound postLogin() {
    const params = {
<<<<<<< HEAD
      email: 'cy@sc.cn',
      password: '25f9e794323b453885f5181f1b624d0b'
=======
      email: 'jing.ye@socialcredits.cn',
      password: 'e10adc3949ba59abbe56e057f20f883e'
>>>>>>> xx-mobx-2.0.0-dev
    };
    loginApi.postLogin(params)
      .then(action('login...', (response) => {
        if (response.status === 200) {
          this.isLogin = true;
          // location.reload();
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
