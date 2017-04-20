import { observable, action } from 'mobx';
class LeftBarStore {
  @observable activeMenu = ['report'];
  @observable activeItem = 'corpDetail';

  @action combineServerData(data) {
    this.activeItem = data.activeItem;
  }
}
export default new LeftBarStore();
