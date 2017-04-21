import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import pathval from 'pathval';
class InternetStore {
  @observable isMount = false;
  @observable analysis = {};
  @observable statistic = {};
  @observable newsData = {};

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    this.analysis = {};
    this.statistic = {};
    this.newsData = {};
    const args = arguments;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get internet data', (resp)=>{
        this.analysis = {data: resp.data.analysis};
        this.statistic = {data: resp.data.info.statistic};
        this.newsData = {data: resp.data.info.data};
      }))
      .catch(action('get internet data error', err => {
        if (pathval.getPathValue(err, 'response.data.errorCode') === 404208) {
          setTimeout(() => {
            this.getReportModule(...args);
          }, 5 * 60 * 1000);
        }
        this.analysis = {error: err.response.data};
        this.statistic = {error: err.response.data};
        this.newsData = {error: err.response.data};
      }));
  }
  @action.bound getInternet(params) {
    this.newsData = {};
    companyHomeApi.getInternet(params)
      .then(action('get internet info success', resp => {
        this.info = {data: resp.data.info.data};
      }))
      .catch(action('get internet info error', err => {
        this.newsData = {error: err.response.data};
      }));
  }
}
export default new InternetStore();
