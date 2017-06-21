import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;

class ReportAxisStore {
  @observable isMount = false;
  getDetailCancel = null;
  companyId = '';
  @observable axisData = {};
  @observable eventParams = {
    time: '',
    module: '',
    relation: '',
  };
  @observable eventData = {};
  moduleDict = {
    corp: '工商信息',
    legal: '法务信息',
    news: '新闻信息',
    operation: '经营信息',
    stock: '上市公告',
    team: '团队信息',
  };
  @action.bound getReportModule(params) {
    this.isMount = true;
    this.companyId = params.reportId;
    companyHomeApi.getReportModule('timeline', params)
      .then(action('timeline', resp => {
        const noData = !resp.data || Object.keys(resp.data).length === 0;
        this.axisData = noData ? {error: {message: '暂无信息'}, data: {}} : {data: resp.data};
        if (noData) {
          this.eventData = {error: {message: '暂无信息'}, events: []};
        } else {
          const time = Object.keys(resp.data).sort().reverse()[0];
          const firstData = resp.data[time];
          Object.keys(firstData).some(type => {
            Object.keys(firstData[type]).some(relation => {
              if (firstData[type][relation] !== 0) {
                this.getAxisDetail(params.reportId, type, time, relation);
              }
            });
          });
        }
      }))
      .catch(action('timeline', err => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.axisData = {error: err.response.data, data: {}};
          this.eventData = {error: err.response.data, events: []};
        }
      }));
  }
  @action.bound getAxisDetail(reportId, key, time, relation) {
    this.eventParams = {
      time,
      relation: relation === 'main' ? '主体企业' : '关联企业',
      module: this.moduleDict[key],
    };
    this.eventData = {};
    if (this.getDetailCancel) {
      this.getDetailCancel();
      this.getDetailCancel = null;
    }
    const source = CancelToken.source();
    this.getDetailCancel = source.cancel;
    companyHomeApi.getReportAxisDetail(reportId, key, time, relation, source)
      .then(action('getAxisDetail', resp => {
        const noData = !resp.data || !resp.data.events || resp.data.events.length === 0;
        this.eventData = noData ? {events: [], error: {message: '未查询到相关数据'}} : resp.data;
        this.getDetailCancel = null;
      }))
      .catch(action('getAxisDetail', err => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.eventData = {error: err.response.data, events: []};
          this.getDetailCancel = null;
        }
      }));
  }
  @action.bound resetStore() {
    this.isMount = false;
    this.axisData = {};
    this.eventParams = {
      time: '',
      module: '',
      relation: '',
    };
    this.eventData = {};
  }
}
export default new ReportAxisStore();
