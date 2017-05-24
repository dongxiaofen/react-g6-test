import { observable, action, runInAction } from 'mobx';
class ModalStore {
  @observable visible = false;
  @observable title;
  // 是否是自定义modal
  @observable isCustomize = false;
  // 是否是单个确认按钮
  @observable isSingleBtn = false;
  @observable width = '440px';
  // 是否有提示文本
  @observable pointText = false;
  // action
  @observable confirmAction;
  @observable cancelAction;
  @action.bound closeAction() {
    this.visible = false;
    this.isCustomize = false;
    this.isSingleBtn = false;
    this.pointText = false;
    this.width = '440px';
    this.cancelText = '取消';
    this.confirmText = '确定';
  }

  // button text
  @observable cancelText = '取消';
  @observable confirmText = '确定';
  @observable confirmWidth = '';

  // loading
  @observable cancelLoading = false;
  @observable confirmLoading = false;

  // 是否需要按钮
  @observable isNeedBtn = true;

  // 确认按钮的disable
  @observable confirmDisable = false;

  @observable compComponent = null;

  @action.bound openCompModal({
    width,
    title,
    isNeedBtn,
    pointText,
    isCustomize,
    isSingleBtn,
    cancelText,
    confirmText,
    confirmAction,
    confirmWidth,
    cancelAction,
    closeAction,
    cancelLoading,
    confirmLoading,
    confirmDisable,
    loader
  }) {
    this.visible = true;
    this.title = title;
    if (width) { this.width = width; }
    if (isNeedBtn !== undefined) { this.isNeedBtn = isNeedBtn; }
    if (pointText !== undefined) { this.pointText = pointText; }
    if (isCustomize !== undefined) { this.isCustomize = isCustomize; }
    if (isSingleBtn !== undefined) { this.isSingleBtn = isSingleBtn; }
    // action
    this.confirmAction = confirmAction;
    this.cancelAction = cancelAction;
    this.confirmWidth = confirmWidth;
    if (closeAction) { this.closeAction = closeAction; }
    // button text
    if (cancelText) { this.cancelText = cancelText; }
    if (confirmText) { this.confirmText = confirmText; }
    // loading
    if (cancelLoading !== undefined) { this.cancelLoading = cancelLoading; }
    if (confirmLoading !== undefined) { this.confirmLoading = confirmLoading; }
    // disable
    if (confirmDisable) { this.confirmDisable = confirmDisable; }
    loader((comp) => {
      runInAction(() => {
        this.compComponent = comp;
      });
    });
  }
}
export default new ModalStore();
