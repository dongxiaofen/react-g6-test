import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import detailModalStore from '../detailModal';
import messageStore from '../message';
import pathval from 'pathval';
class InternetStore {
  @observable isMount = false;
  @observable analysis = {};
  @observable statistic = {};
  @observable newsData = {};
  @action.bound changeValue(keyPath, value) {
    pathval.setPathValue(this, keyPath, value);
  }
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
        this.newsData = {data: resp.data.info.data};
      }))
      .catch(action('get internet info error', err => {
        this.newsData = {error: err.response.data};
      }));
  }
  @action.bound getNewsDetail(url) {
    companyHomeApi.getNewsDetail(url)
      .then(action('get internet detail success', resp => {
        detailModalStore.visible = true;
        console.log(resp);
      }))
      .catch(action('get internet detail error', err => {
        messageStore.openMessage({
          type: 'error',
          content: pathval.getPathValue(err, 'response.data.message') || '获取新闻数据失败'
        });
      }));
  }
}
export default new InternetStore();
