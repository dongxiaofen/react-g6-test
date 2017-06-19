import { observable, action, runInAction } from 'mobx';
import modalStore from './modal';
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
  @action.bound isAssetsNewest(assetsHash, first) {
    const that = this;
    setTimeout(() => {
      axios.get('/front/refresh/assets')
        .then(resp => {
          if (assetsHash !== resp.data.assetsHash) {
            modalStore.openCompModal({
              title: '温馨提示',
              width: 540,
              isSingleBtn: true,
              confirmText: '刷新',
              closeAction: () => {
                location.reload();
              },
              confirmAction: () => {
                location.reload();
              },
              loader: (cb) => {
                require.ensure([], (require) => {
                  cb(require('../components/assetsRefresh'));
                });
              }
            });
          }
          that.isAssetsNewest(resp.data.assetsHash);
        })
        .catch(err => {
          modalStore.openCompModal({
            title: '温馨提示',
            width: 540,
            isSingleBtn: true,
            confirmText: '刷新',
            closeAction: () => {
              location.reload();
            },
            confirmAction: () => {
              location.reload();
            },
            loader: (cb) => {
              require.ensure([], (require) => {
                cb(require('../components/assetsRefresh'));
              });
            }
          });
          that.isAssetsNewest(assetsHash);
          console.log(err);
        });
    }, first ? 0 : 2 * 60 * 1000);
  }
}
export default new MessageStore();
