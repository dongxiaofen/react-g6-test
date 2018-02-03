import { observable, action } from 'mobx';
import pathval from 'pathval';
import uiStore from '../ui';
import { safeApi } from 'api';
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import messageStore from '../message';
import modalStore from '../modal';
class SafeStore {
  @observable safeKey = [
    {key: 'apikey', title: 'APIKEY'},
    {key: 'sharedSecret', title: '密钥'}
  ];
  @observable safeData = {};
  @observable safeDataOpen = [false, false];
  @observable password = {
    value: '',
    error: '',
  };
  @observable isResetLoading = false; // 重置密钥加载
  @observable resetList = {
    result: {},
    // index: 1,
    // size: 10,
    // cancel: null,
  };

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }
  @action.bound getApiKey() {
    safeApi.getApiKey()
      .then(action('a-apiKey', ({data}) => {
        this.safeData = {data};
      }))
      .catch(action('a-apiKey-err', () => {
        this.safeData = {
          data: {},
          error: {message: '获取密钥失败'}
        };
      }));
  }
  @action.bound getResetApiList() {
    this.resetList.result = {};
    const {index, size} = uiStore.uiState.safePager;
    safeApi.getResetApiList({index, size})
      .then(action('resetlist-s', ({data}) => {
        if (data.content.length > 0) {
          this.resetList.result = {data};
          uiStore.uiState.safePager.totalElements = data.totalElements;
        } else {
          this.resetList.result = {
            data: {},
            error: {message: '您暂无重置列表'}
          };
        }
      }))
      .catch(action('resetlist-err', () => {
        this.resetList.result = {
          data: {},
          error: {message: '您暂无重置列表'}
        };
      }));
  }
  @action.bound resetApikey() {
    if (!this.password.value) {
      this.password.error = '密码不能为空！';
    } else {
      this.isResetLoading = true;
      safeApi.resetApikey({password: encHex.stringify(md5(this.password.value))})
        .then(action('resetApikey-s', ({data}) => {
          this.isResetLoading = false;
          this.password.value = '';
          this.safeData = {data};
          modalStore.closeAction();
          messageStore.openMessage({type: 'info', content: '密钥重置成功', duration: 3000});
          // 更新重置列表
          if (uiStore.uiState.safePager.index === 1) {
            this.getResetApiList();
          } else {
            uiStore.uiState.safePager.index = 1;
          }
        }))
        .catch(action('resetApikey-err', (err) => {
          this.isResetLoading = false;
          this.password.value = '';
          if (err && err.response.data) {
            if (err.response.data.errorCode === 401201) {
              this.password.error = '密码输入错误，请重新输入！';
            } else {
              this.password.error = err.response.data.message;
            }
          }
        }));
    }
  }
  @action.bound resetData() {

  }
}
export default new SafeStore();
