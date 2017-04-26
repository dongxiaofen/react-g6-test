import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;
import detailModalStore from '../detailModal';
import messageStore from '../message';
import pathval from 'pathval';
class InternetStore {
  @observable isMount = false;
  @observable analysis = {};
  @observable statistic = {};
  @observable newsData = {};
  @observable activeUrl = '';
  newsDetailCancel = null;
  newsCancel = null;
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
    if (this.newsCancel) {
      console.log(this.newsCancel, '-------------');
      this.newsCancel();
    }
    const source = CancelToken.source();
    this.newsCancel = source.cancel;
    companyHomeApi.getInternet(params, source)
      .then(action('get internet info success', resp => {
        this.newsCancel = null;
        this.newsData = {data: resp.data.info.data};
      }))
      .catch(action('get internet info error', err => {
        if (!axios.isCancel(err)) {
          this.newsCancel = null;
          this.newsData = {error: err.response.data};
        }
      }));
  }
  @action.bound getNewsDetail(url, activeUrl) {
    this.activeUrl = activeUrl;
    if (this.newsDetailCancel) {
      this.newsDetailCancel();
      console.log('cancel', this.newsDetailCancel);
      this.newsDetailCancel = null;
    }
    const source = CancelToken.source();
    this.newsDetailCancel = source.cancel;
    companyHomeApi.getNewsDetail(url, source)
      .then(action('get internet detail success', resp => {
        console.log(resp);
        this.newsDetailCancel = null;
        detailModalStore.visible = true;
        this.activeUrl = '';
      }))
      .catch(action('get internet detail error', err => {
        if (!axios.isCancel(err)) {
          this.newsDetailCancel = null;
          this.activeUrl = '';
          messageStore.openMessage({
            type: 'error',
            content: pathval.getPathValue(err, 'response.data.message') || '获取新闻数据失败'
          });
        }
      }));
  }
}
export default new InternetStore();
