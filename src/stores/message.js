import { observable, action, runInAction } from 'mobx';
class MessageStore {
  @observable visible = false;
  @observable type = 'info';
  @observable content = '';
  @observable timeOut;

  @action.bound closeMessage() {
    this.timeOut = setTimeout(() => {
      runInAction('set visible false', () => {
        this.visible = false;
      });
    }, 2000);
  }

  @action.bound clearTimer() {
    clearTimeout(this.timeOut);
  }

  @action.bound openInfoMessage(content) {
    this.type = 'info';
    this.visible = true;
    this.content = content;
  }

  @action.bound openWarningMessage(content) {
    this.type = 'warning';
    this.visible = true;
    this.content = content;
  }
}
export default new MessageStore();
