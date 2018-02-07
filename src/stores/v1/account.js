import { observable, action } from 'mobx';
import pathval from 'pathval';
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import { accountApi, interfaceApi } from 'api';
// import { accountApi } from 'api';
import messageStore from '../message';
import modalStore from '../modal';
import uiStore from '../ui';

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

  @observable safe = {
    safeKey: [
      {key: 'apikey', title: 'APIKEY'},
      {key: 'sharedSecret', title: '密钥'}
    ],
    safeData: {},
    safeDataOpen: [false, false],
    password: {
      value: '',
      error: '',
    },
    isResetLoading: false, // 重置密钥加载
    resetList: {
      result: {},
      // index: 1,
      // size: 10,
      // cancel: null,
    },
    whiteList: {
      form: {
        ip: '',
        remark: '',
      },
      isAddLoading: false,
      result: {},
    },
  };

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

  @action.bound getApiKey() {
    interfaceApi.getApiKey()
      .then(action('a-apiKey', ({data}) => {
        this.safe.safeData = {data};
      }))
      .catch(action('a-apiKey-err', () => {
        this.safe.safeData = {
          data: {},
          error: {message: '获取密钥失败'}
        };
      }));
  }

  @action.bound getWhiteList() {
    this.safe.whiteList.result = {};
    accountApi.getWhiteList(uiStore.uiState.accountWhiteListPager)
      .then(action('resetlist-s', ({data}) => {
        if (data.content.length > 0) {
          this.safe.whiteList.result = {data};
          uiStore.uiState.accountWhiteListPager.totalElements = data.totalElements;
        } else {
          this.safe.whiteList.result = {
            data: {},
            error: {message: '您暂无白名单列表'}
          };
        }
      }))
      .catch(action('resetlist-err', () => {
        // console.log('eeer--------------------');
        this.safe.whiteList.result = {
          data: {},
          error: {message: '您暂无白名单列表'}
        };
      }));
  }
  @action.bound createWhiteList() {
    const params = this.safe.whiteList.form;
    if (!params.ip) {
      messageStore.openMessage({type: 'warning', content: '请填写ip地址', duration: 5000});
      return false;
    }
    this.safe.whiteList.isAddLoading = true;
    accountApi.createWhiteList(params)
      .then(action(() => {
        modalStore.closeAction();
        this.getWhiteList();
        this.safe.whiteList.isAddLoading = false;
      }))
      .catch(action((err) => {
        this.safe.whiteList.isAddLoading = false;
        const message = pathval.getPathValue(err, 'response.data.message') || '白名单添加失败';
        messageStore.openMessage({type: 'warning', content: message, duration: 5000});
      }));
  }
  @action.bound deleteWhiteList(id) {
    accountApi.deleteWhiteList(id)
      .then(action(() => {
        const {index} = uiStore.uiState.accountWhiteListPager;
        if (this.safe.whiteList.result.data.content.length > 1 || index === 1) {
          // do delete
          this.getWhiteList();
        } else {
          // index - 1
          uiStore.uiState.accountWhiteListPager.index = index - 1;
          // if (index > 1) {
          // } else {
          //
          // }
        }
      }))
      .catch();
  }
  @action.bound resetAddForm() {
    this.safe.whiteList.form.ip = '';
    this.safe.whiteList.form.remark = '';
  }

  @action.bound getResetApiList() {
    this.safe.resetList.result = {};
    accountApi.getResetApiList(uiStore.uiState.accountSafe)
      .then(action('resetlist-s', ({data}) => {
        if (data.content.length > 0) {
          this.safe.resetList.result = {data};
          uiStore.uiState.accountSafe.totalElements = data.totalElements;
        } else {
          this.safe.resetList.result = {
            data: {},
            error: {message: '您暂无重置列表'}
          };
        }
      }))
      .catch(action('resetlist-err', () => {
        this.safe.resetList.result = {
          data: {},
          error: {message: '您暂无重置列表'}
        };
      }));
  }
  @action.bound resetApikey() {
    if (!this.safe.password.value) {
      this.safe.password.error = '密码不能为空！';
    } else {
      this.isResetLoading = true;
      accountApi.resetApikey({password: encHex.stringify(md5(this.safe.password.value))})
        .then(action('resetApikey-s', ({data}) => {
          this.isResetLoading = false;
          this.safe.password.value = '';
          this.safe.safeData = {data};
          modalStore.closeAction();
          messageStore.openMessage({type: 'info', content: '密钥重置成功', duration: 3000});
          // 更新重置列表
          if (uiStore.uiState.accountSafe.index === 1) {
            this.getResetApiList();
          } else {
            uiStore.uiState.accountSafe.index = 1;
          }
        }))
        .catch(action('resetApikey-err', (err) => {
          this.isResetLoading = false;
          this.safe.password.value = '';
          if (err && err.response.data) {
            if (err.response.data.errorCode === 401201) {
              this.safe.password.error = '密码输入错误，请重新输入！';
            } else {
              this.safe.password.error = err.response.data.message;
            }
          }
        }));
    }
  }
}
export default new AccountStore();
