import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;
import detailModalStore from '../detailModal';
import pathval from 'pathval';
class InternetStore {
  @observable isMount = false;
  @observable analysis = {};
  @observable statistic = {};
  @observable newsData = {};
  @observable activeUrl = '';
  newsDetailCancel = null;
  newsCancel = null;
  @observable detailInfo = {
    type: '',
    label: '',
    time: '',
    title: '',
    source: '',
    html: '',
    url: '',
  };
  @action.bound changeValue(keyPath, value) {
    pathval.setPathValue(this, keyPath, value);
  }
  @action.bound assignDetail(obj) {
    Object.assign(this.detailInfo, obj);
  }
  @action.bound getReportModule(params) {
    this.isMount = true;
    this.analysis = {};
    this.statistic = {};
    this.newsData = {};
    const args = arguments;
    companyHomeApi.getReportModule(params)
      .then(action('get internet data', (resp)=>{
        this.analysis = {data: resp.data.analysis};
        this.statistic = {data: resp.data.info.statistic};
        this.newsData = {data: resp.data.info.data};
      }))
      .catch(action('get internet data error', err => {
        const time = 5 * 60 * 1000;
        if (pathval.getPathValue(err, 'response.data.errorCode') === 404208) {
          setTimeout(() => {
            this.getReportModule(...args);
          }, time);
        }
        this.analysis = {error: err.response.data};
        this.statistic = {error: err.response.data};
        this.newsData = {error: err.response.data};
      }));
  }
  @action.bound getInternet(params) {
    this.newsData = {};
    if (this.newsCancel) {
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
      this.newsDetailCancel = null;
    }
    const source = CancelToken.source();
    this.newsDetailCancel = source.cancel;
    companyHomeApi.getNewsDetail(url, source)
      .then(action('get internet detail success', resp => {
        this.detailInfo.html = resp.data.html;
        this.newsDetailCancel = null;
        detailModalStore.openDetailModal((cb) => {
          require.ensure([], require => {
            cb(
              require('components/companyHome/report/internet/news/detail/DetailHeader'),
              require('components/companyHome/report/internet/news/detail/DetailContent'),
              require('components/companyHome/report/internet/news/detail/DetailFooter')
            );
          });
        }, '新闻详情');
        this.activeUrl = '';
      }))
      .catch(action('get internet detail error', err => {
        if (!axios.isCancel(err)) {
          this.newsDetailCancel = null;
          this.activeUrl = '';
          window.open(this.detailInfo.url);
        }
      }));
  }
  @action.bound resetStore() {
    this.isMount = false;
    this.analysis = {};
    this.statistic = {};
    this.newsData = {};
    this.activeUrl = '';
    this.newsDetailCancel = null;
    this.newsCancel = null;
    this.detailInfo = {
      type: '',
      label: '',
      time: '',
      title: '',
      source: '',
      html: '',
    };
  }
}
export default new InternetStore();
