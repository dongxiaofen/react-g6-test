import { observable, action, runInAction } from 'mobx';
class ModalStore {
  @observable visible = false;
  @observable type = '';
  @observable title;
  @observable infoAction;
  @observable confirmAction;
  @observable cancelAction;
  @observable closeAction;
  @observable compComponent = null;
  // 异步组件的路径
  @observable asyncComp = null;

  @action.bound closeDefalutAction() {
    this.visible = false;
  }

  @action.bound openInfoModal(title, _infoAction, _closeAction) {
    this.visible = true;
    this.type = 'info';
    this.title = title;
    this.infoAction = _infoAction;
    this.closeAction = _closeAction;
  }

  @action.bound openCompModal(title, _confirmAction, _cancelAction, _closeAction, loader) {
    this.visible = true;
    this.type = 'comp';
    this.title = title;
    this.confirmAction = _confirmAction;
    this.cancelAction = _cancelAction;
    this.closeAction = _closeAction;
    loader((comp) => {
      runInAction(() => {
        this.compComponent = comp;
      });
    });
  }

  @action.bound openAsyncModal(title, _closeAction, loader) {
    this.visible = true;
    this.type = 'async';
    this.title = title;
    this.closeAction = _closeAction;
    loader((comp) => {
      runInAction(()=>{
        this.asyncComp = comp;
      });
    });
  }
}
export default new ModalStore();
