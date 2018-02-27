import { observable, action } from 'mobx';
// import pathval from 'pathval';
import uiStore from '../ui';
import { myInterfaceApi } from 'api';
// import moment from 'moment';
class MyApiStore {
  @observable myInterface = {};

  // @action.bound updateValue(changeItem, value) {
  //   pathval.setPathValue(this, changeItem, value);
  // }
  @action.bound getMyInterface() {
    this.myInterface = {};
    const {index, size} = uiStore.uiState.myInterfaceV2Pager;
    myInterfaceApi.getMyInterface({index, size})
      .then(action('myInterface-success', ({data}) => {
        this.myInterface = {list: data.content};
        uiStore.uiState.myInterfaceV2Pager.totalElements = data.totalElements;
      }))
      .catch(action('myInterface-err', () => {
        this.myInterface = {
          list: {},
          error: {message: '暂未获取到接口套餐'}
        };
      }));
  }
  @action.bound resetData() {
    this.myInterface = {};
  }
}
export default new MyApiStore();
