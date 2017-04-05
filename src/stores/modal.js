import { observable, action, runInAction } from 'mobx';
class ModalStore {
  @observable open = false;
  @observable type = '';
  @observable title;
  @observable message;
  @observable closeFunc;
  @observable asyncComp;

  @action.bound closeModal() {
    this.open = false;
    // this.asyncComp = '';
  }
  @action.bound openTextModal(title, message, closeFunc) {
    this.open = true;
    this.type = 'text';
    this.title = title;
    this.message = message;
    this.closeFunc = closeFunc;
  }
  @action.bound openAsyncModal(loader) {
    this.open = true;
    this.type = 'async';
    loader((comp) => {
      runInAction(()=>{
        this.asyncComp = comp;
      });
    });
  }
}
export default new ModalStore();
