import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class TimeAxisStore {
  isMount = false;
  @observable axisData = {};
  @observable eventData = {};

  @action.bound getReportModule(params) {
    params.module = 'timeline';
    companyHomeApi.getReportModule(params)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }
  @action.bound resetStore() {
    this.isMount = false;
  }
}
export default new TimeAxisStore();
