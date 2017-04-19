import { observable, action } from 'mobx';
import { myHomePageApi } from 'api';

class MyHomePageStore {
  @observable statistic = {};
  @observable alert = {};
  @action.bound getStatistic() {
    myHomePageApi.getMyHomePageStatistic()
      .then(action( (response) => {
        this.statistic = response.data;
      })
      )
      .catch( (error) => {
        console.log(error);
      });
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
