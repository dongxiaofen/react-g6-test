import { observable, action } from 'mobx';
// import * as apis from 'helpers/api';
class MyHomePageStore {
  @observable statistic = {};
  @observable alert = {};
  @action.bound setMyHomePageStatistic() {
    console.log(4);
  }
  @action.bound setMyHomePageAlert(params) {
    console.log(params);
  }
}
export default new MyHomePageStore();
