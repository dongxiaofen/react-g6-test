import { observable, action } from 'mobx';
import pathval from 'pathval';
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import { clientApi } from 'api';
import messageStore from '../message';
class ModifyStore {
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
    clientApi.resetPassword(params)
      .then(action('修改密码成功', () => {
        // this.isModifyLoading = false;
        this.resetData();
        messageStore.openMessage({type: 'info', content: '密码修改成功', duration: 5000});
      }))
      .catch(action('修改密码错误', (err) => {
        this.isModifyLoading = false;
        let errorMessage = '密码修改失败';
        if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
        messageStore.openMessage({type: 'warning', content: errorMessage, duration: 5000});
      }));
  }
  @action.bound resetData() {
    this.modify = {
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
    this.isModifyLoading = false;
  }
}
export default new ModifyStore();
