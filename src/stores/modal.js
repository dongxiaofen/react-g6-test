import { observable, action, runInAction } from 'mobx';
class ModalStore {
  @observable visible = false;
  @observable type = '';
  @observable title;
  @observable closeFunc;
  // 异步组件的路径
  @observable asyncComp;

  @action.bound closeAction() {
    this.visible = false;
  }
  @action.bound openTextModal(title, closeFunc) {
    this.visible = true;
    this.type = 'text';
    this.title = title;
    this.closeFunc = closeFunc;
  }
  @action.bound openAsyncModal(loader) {
    this.visible = true;
    this.type = 'async';
    loader((comp) => {
      runInAction(()=>{
        this.asyncComp = comp;
      });
    });
  }
}
export default new ModalStore();
