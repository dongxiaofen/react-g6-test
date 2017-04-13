import { observable, action, runInAction } from 'mobx';
class ModalStore {
  @observable visible = false;
  @observable title;
  @observable width = '440px';
  // action
  @observable confirmAction;
  @observable cancelAction;
  @action.bound closeAction() {
    this.visible = false;
  }

  // button text
  @observable cancelText = '取消';
  @observable confirmText = '确认';

  // loading
  @observable cancelLoading = false;
  @observable confirmLoading = false;

  @observable compComponent = null;

  @action.bound openCompModal({
    title,
    width,
    cancelText,
    confirmText,
    confirmAction,
    cancelAction,
    closeAction,
    cancelLoading,
    confirmLoading,
    loader
  }) {
    this.visible = true;
    this.title = title;
    if (width) { this.width = width; }
    // action
    this.confirmAction = confirmAction;
    this.cancelAction = cancelAction;
    if (closeAction) { this.closeAction = closeAction; }
    // button text
    if (cancelText) { this.cancelText = cancelText; }
    if (confirmText) { this.confirmText = confirmText; }
    // loading
    if (cancelLoading !== undefined) { this.cancelLoading = cancelLoading; }
    if (confirmLoading !== undefined) { this.confirmLoading = confirmLoading; }
    loader((comp) => {
      runInAction(() => {
        this.compComponent = comp;
      });
    });
  }
}
export default new ModalStore();
