import { observable, action, runInAction } from 'mobx';
import modalStore from './modal';
import clientStore from './client';
import loginStore from './login';
import axios from 'axios';
class MessageStore {
  @observable visible = false;
  @observable type = 'info';
  @observable content = '';
  @observable timeOut;
  @observable duration = 1500;
  @observable callBack;

  @action.bound closeMessage() {
    this.timeOut = setTimeout(() => {
      runInAction('set visible false', () => {
        this.visible = false;
      });
      if (this.callBack && typeof this.callBack === 'function') {
        this.callBack();
      }
    }, this.duration);
  }

  @action.bound clearTimer() {
    clearTimeout(this.timeOut);
  }

  @action.bound openMessage({ type, content, duration, callBack }) {
    this.type = type ? type : 'info';
    if (duration) { this.duration = duration; }
    if (callBack) { this.callBack = callBack; }
    this.visible = true;
    this.content = content;
  }
  @action.bound isAssetsNewest(assetsHash) {
    axios.get('/front/refresh/assets')
      .then(action('isAssetsNewest', resp => {
        console.info(resp.data.assetsHash, assetsHash, '---');
        if (assetsHash !== resp.data.assetsHash) {
          const notRouteToHome = true;
          modalStore.openCompModal({
            title: '温馨提示',
            width: 540,
            isSingleBtn: true,
            confirmText: '重新登录',
            closeAction: () => {
              clientStore.loginOut(notRouteToHome);
              runInAction('set isShowLogin true', () => {
                loginStore.isShowLogin = true;
              });
            },
            confirmAction: () => {
              clientStore.loginOut(notRouteToHome);
              runInAction('set isShowLogin true', () => {
                modalStore.visible = false;
                loginStore.isShowLogin = true;
              });
            },
            loader: (cb) => {
              require.ensure([], (require) => {
                cb(require('../components/assetsRefresh'));
              });
            }
          });
        }
      }))
      .catch(err => {
        console.log(err);
      });
  }
}
export default new MessageStore();
