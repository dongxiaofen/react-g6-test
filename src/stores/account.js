import { observable, action } from 'mobx';
import pathval from 'pathval';
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import { accountApi, interfaceApi } from 'api';
// import { accountApi } from 'api';
import messageStore from './message';

class AccountStore {
  @observable modify = {
    originPw: {
      value: '',
      errText: '',
      validateStatus: 'init',
      label: '当前登录密码'
    },
    newPw: {
      value: '',
      errText: '',
      validateStatus: 'init',
      label: '新的登录密码'
    },
    confirmPw: {
      value: '',
      errText: '',
      validateStatus: 'init',
      label: '确认新的密码'
    },
  };
  @observable isModifyLoading = false;

  @observable myApi = {
    myInterface: {},
    interfaceType: {}, // 接口套餐分类
  };

  @observable safeData = {};

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }

  @action.bound handleSubmit() {
    let isSumbit = true;
    Object.keys(this.modify).map((key) => {
      const value = this.modify[key].value;
      if (value.length < 8 || value.length > 16) {
        this.modify[key].validateStatus = 'error';
        this.modify[key].errText = '密码长度为8~16位';
        isSumbit = false;
      }
    });
    const newPassword = this.modify.newPw.value;
    const rePassword = this.modify.confirmPw.value;
    if (newPassword !== rePassword) {
      this.modify.confirmPw.validateStatus = 'error';
      this.modify.confirmPw.errText = '密码输入不一致';
      isSumbit = false;
    }
    if (isSumbit) {
      const oldPassword = this.modify.originPw.value;
      this.resetPassword({
        oldPassword: encHex.stringify(md5(oldPassword)),
        newPassword: encHex.stringify(md5(newPassword))
      });
    }
  }
  @action.bound resetPassword(params) {
    this.isModifyLoading = true;
    accountApi.resetPassword(params)
      .then(action('修改密码成功', () => {
        this.isModifyLoading = false;
        messageStore.openMessage({type: 'info', content: '密码修改成功', duration: 5000});
      }))
      .catch(action('修改密码错误', () => {
        this.isModifyLoading = false;
        messageStore.openMessage({type: 'warning', content: '密码修改失败', duration: 5000});
      }));
  }

  @action.bound getMyInterface() {
    this.myApi.myInterface = {};
    interfaceApi.getMyInterface()
      .then(action('myInterface-success', ({data}) => {
        this.myApi.myInterface = {data};
      }))
      .catch(action('myInterface-err', () => {
        this.myApi.myInterface = {
          data: {},
          error: {message: '暂未获取到接口套餐'}
        };
      }));
  }
  @action.bound getInterfaceType() {
    interfaceApi.getInterfaceType()
      .then(action('type-success', ({data}) => {
        this.myApi.interfaceType = data;
      }))
      .catch(action('type-err', () => {
        this.myApi.interfaceType = {};
      }));
  }
}
export default new AccountStore();
