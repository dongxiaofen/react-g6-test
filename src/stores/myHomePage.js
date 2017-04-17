import { observable, action } from 'mobx';
import { myHomePageApi } from 'api';

class MyHomePageStore {
  @observable statistic = {};
  @observable alert = {};
  @action.bound getStatistic() {
    console.log(4);
  }
  @action.bound getAlert(params) {
    myHomePageApi.getMyHomePageAlert(params)
      .then(action( (response) => {
        console.log(response.data);
        this.alert = response.data;
      }))
      .catch( (error) => {
        console.log(error.response);
      });
  }
}
export default new MyHomePageStore();
