import { observable, action } from 'mobx';
// import pathval from 'pathval';
// import uiStore from '../ui';
import { myInterfaceApi } from 'api';
// import moment from 'moment';
class MyApiStore {
  @observable myInterface = {};

  // @action.bound updateValue(changeItem, value) {
  //   pathval.setPathValue(this, changeItem, value);
  // }
  @action.bound getMyInterface() {
    this.myInterface = {};
    myInterfaceApi.getMyInterface()
      .then(action('myInterface-success', ({data}) => {
        this.myInterface = {data};
      }))
      .catch(action('myInterface-err', () => {
        this.myInterface = {
          data: {},
          error: {message: '暂未获取到接口套餐'}
        };
      }));
  }
  @action.bound resetData() {
    this.myInterface = {};
  }
}
export default new MyApiStore();
