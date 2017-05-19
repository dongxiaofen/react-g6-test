import { observable, action } from 'mobx';
class EntireLoadingStore {
  @observable visible = false;

  @action.bound openEntireLoading() {
    this.visible = true;
  }

  @action.bound closeEntireLoading(callBack) {
    this.visible = false;
    if (callBack && typeof callBack === 'function') {
      callBack();
    }
  }
}
export default new EntireLoadingStore();
