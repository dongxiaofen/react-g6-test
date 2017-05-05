import { observable, action } from 'mobx';
class LeftBarStore {
  @observable activeMenu = ['report'];
  @observable activeItem = 'corpDetail';

  @action.bound resetStore() {
    this.activeMenu = ['report'];
    this.activeItem = 'corpDetail';
  }
  @action combineServerData(data) {
    this.activeItem = data.activeItem;
  }
}
export default new LeftBarStore();
