import { observable } from 'mobx';
class LoginStore {
  @observable form = {
    username: {
      value: '',
      validateMsg: '请填写用户名',
      validateStatus: 'init',
      validateMethod: ''
    },
    password: {
      value: '',
      validateMsg: '请填写密码',
      validateStatus: 'init',
      validateMethod: ''
    },
  };
  @observable loginResult = {};
  @observable loading = false;
  @observable isHasEorr = false; // 登录出错
  @observable isShowLogin = false; // 是否显示login
  @observable errText = ''; // 错误提示信息
  @observable isIE = false; // 判断是否是ie浏览器，只能判断10版本一下
}
export default new LoginStore();
