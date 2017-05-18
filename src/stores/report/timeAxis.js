import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class TimeAxisStore {
  isMount = false;
  @observable axisData = {};
  @observable eventData = {};

  @action.bound getReportModule(params) {
    params.module = 'timeline';
    companyHomeApi.getReportModule(params)
      .then(action('timeline', resp => {
        const noData = !resp.data || Object.keys(resp.data).length === 0;
        this.axisData = noData ? {error: {message: '暂无信息'}, data: {}} : {data: resp.data};
      }))
      .catch(action('timeline', err => {
        console.log(err);
        this.axisData = {error: err.response.data, data: {}};
      }));
  }
  @action.bound resetStore() {
    this.isMount = false;
  }
}
export default new TimeAxisStore();
