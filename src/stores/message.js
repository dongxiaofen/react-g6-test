import { observable, action, runInAction } from 'mobx';
class MessageStore {
  @observable visible = false;
  @observable type = 'info';
  @observable content = '';
  @observable timeOut;
  @observable duration = 1500;

  @action.bound closeMessage() {
    this.timeOut = setTimeout(() => {
      runInAction('set visible false', () => {
        this.visible = false;
      });
    }, this.duration);
  }

  @action.bound clearTimer() {
    clearTimeout(this.timeOut);
  }

  @action.bound openMessage({ type, content, duration }) {
    this.type = type ? type : 'info';
    if (duration) { this.duration = duration; }
    this.visible = true;
    this.content = content;
  }
}
export default new MessageStore();
