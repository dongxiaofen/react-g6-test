import { observable, action} from 'mobx';
import pathval from 'pathval';
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import { browserHistory } from 'react-router';
import { loginApi } from 'api';
import clientStore from './client';

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
  // @observable isShowLogin = false; // 是否显示login
  @observable errText = ''; // 错误提示信息
  // @observable isIE = false; // 判断是否是ie浏览器，只能判断10版本一下

  @action.bound resetVlidateStatus(id) {
    const validateStatus = pathval.getPathValue(this.form, `${id}.validateStatus`);
    if (validateStatus !== 'success' || validateStatus !== 'init') {
      pathval.setPathValue(this.form, `${id}.validateStatus`, 'init');
    }
  }

  @action.bound handleSubmit() {
    const keys = ['username', 'password'];
    let isSumbit = true;
    pathval.setPathValue(this.form, 'isHasEorr', false);
    keys.map((key)=>{
      if (pathval.getPathValue(this.form, `${key}.value`).length < 1) {
        isSumbit = false;
        pathval.setPathValue(this.form, `${key}.validateStatus`, 'error');
      } else {
        pathval.setPathValue(this.form, `${key}.validateStatus`, 'success');
      }
    });
    if (isSumbit) {
      const password = pathval.getPathValue(this.form, 'password.value');
      this.checkLogin(
        {
          email: pathval.getPathValue(this.form, 'username.value'),
          password: encHex.stringify(md5(password))
        },
        // pathname,
        // this.props.history
      );
    } else {
      pathval.setPathValue(this, 'isHasEorr', true);
      pathval.setPathValue(this, 'errText', '请输入用户名和密码');
    }
  }

  @action.bound checkLogin(params) {
    pathval.setPathValue(this, 'loading', true);
    loginApi.postLogin(params)
        .then(action((response)=> {
          // const respData = response.data;
          pathval.setPathValue(this, 'loading', false);
          // if (respData.email) {
          // }
          let pathname = '/interface';
          if (localStorage.pathname) {
            pathname = localStorage.pathname;
          }
          browserHistory.push(pathname);
          //  返回登录数据
          pathval.setPathValue(this, 'loginResult', response.data);
          //  修改client的值
          pathval.setPathValue(clientStore, 'userInfo', response.data);
        }))
        .catch(action((error) => {
          const errorData = error.response.data;
          // console.log(error.response, 'errorData');
          pathval.setPathValue(this, 'loading', false);
          if (error.response.status !== 502) {
            let errText = errorData.message || '用户名或者密码错误';
            if (errorData.errorCode === 401200 || errorData.errorCode === 401201) {
              errText = errorData.message;
            } else if (errorData.errorCode === 401001) {
              errText = '该用户不存在';
            } else if (errorData.errorCode === 403204) {
              errText = '您的帐户已过期，请拨打下方客服电话';
            }
            pathval.setPathValue(this, 'isHasEorr', true);
            pathval.setPathValue(this, 'errText', errText);
            pathval.setPathValue(this, 'loginResult', {});
          }
        }));
  }
  // @action combineServerData(data) {
  //   this.isShowLogin = data.isShowLogin;
  // }

}
export default new LoginStore();
