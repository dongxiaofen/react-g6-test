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
  @observable pointText = '';
  @observable pactUrl = '';
  @observable pactName = '';
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

  // 是否需要按钮
  @observable isNeedBtn = true;

  @observable compComponent = null;

  @action.bound openCompModal({
    width,
    title,
    isNeedBtn,
    pointText,
    pactUrl,
    pactName,
    isCustomize,
    isSingleBtn,
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
    if (isNeedBtn !== undefined) { this.isNeedBtn = isNeedBtn; }
    if (pointText !== undefined) { this.pointText = pointText; }
    if (pactUrl !== undefined) { this.pactUrl = pactUrl; }
    if (pactName !== undefined) { this.pactName = pactName; }
    if (isCustomize !== undefined) { this.isCustomize = isCustomize; }
    if (isSingleBtn !== undefined) { this.isSingleBtn = isSingleBtn; }
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
