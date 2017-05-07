import { observable, action, runInAction } from 'mobx';
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
}
export default new MessageStore();
