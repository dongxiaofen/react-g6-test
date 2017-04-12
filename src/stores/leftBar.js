import { observable } from 'mobx';
class LeftBarStore {
  @observable activeMenu = ['report'];
  @observable activeItem = 'corpDetail';
}
export default new LeftBarStore();
