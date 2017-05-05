import { observable, action, computed } from 'mobx';
import detailModalStore from '../detailModal';
import pathval from 'pathval';
import axios from 'axios';
import { companyHomeApi } from 'api';
import uiStore from '../ui';
import messageStore from '../message';
const CancelToken = axios.CancelToken;
class AlertAnalysisStore {
  @observable isMount = false;
  @observable loadingId = -1;
  alertCancel = null;
  @observable listData = {};
  @observable detailData = {
    activeIndex: 0,
    page: 1,
    tabTop: computed(function() {
      return 0 - (this.page - 1) * 8 * 60;
    }),
    info: {},
    detail: {},
    html: '',
  }
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound getAlertDetail(url, companyType, companyId) {
    if (this.alertCancel) {
      this.alertCancel();
      this.alertCancel = null;
    }
    this.detailData.activeIndex = 0;
    const source = CancelToken.source();
    this.alertCancel = source.cancel;
    companyHomeApi.getAlertDetail(url, source)
      .then(action('getAlertDetail_success', resp => {
        this.loadingId = -1;
        this.alertCancel = null;
        this.detailData.detail = resp.data;
        this.openDetailModal(this.detailData.info.alertType);
        if (this.detailData.info.alertType === 'RULE') {
          const pattern = this.detailData.detail[0].pattern;
          if (pattern === 'NEWS') {
            this.getNewsDetail(companyType, companyId);
          } else if (pattern === 'JUDGMENT') {
            this.getJudgeDocDetail(companyType, companyId);
          }
        }
      }))
      .catch(action('getAlertDetail_error', err => {
        if (!axios.isCancel(err)) {
          this.loadingId = -1;
          this.alertCancel = null;
          messageStore.openMessage({
            type: 'error',
            content: pathval.getPathValue(err, 'response.data.message') || '获取数据失败'
          });
        }
      }));
  }
  @action.bound getNewsDetail(type, companyId) {
    const detailData = this.detailData.detail[this.detailData.activeIndex];
    const params = {};
    params.createdAt = detailData.content.createdAt;
    params.url = detailData.content.url;
    if (type !== 'monitor') {
      params.analysisReportId = companyId;
    }
    const getNewsDetailFunc = type === 'monitor' ? companyHomeApi.getAlertNewsMonitor(companyId, params) : companyHomeApi.getAlertNewsReport(params);
    getNewsDetailFunc
    .then(action('get news', resp=> {
      this.detailData.html = resp.data.html;
    }))
    .catch(action('get news error', (error)=>{
      console.log('get news', error);
      this.detailData.html = '--';
    }));
  }
  @action.bound getJudgeDocDetail(type, companyId) {
    const detailData = this.detailData.detail[this.detailData.activeIndex];
    const params = {};
    params.docId = detailData.content.docId;
    params.trailDate = detailData.content.trailDate;
    if (type !== 'monitor') {
      params.analysisReportId = companyId;
    }
    const getJudeDocDetailFunc = type === 'monitor' ? companyHomeApi.getAlertJudgeDocMonitor(companyId, params) : companyHomeApi.getAlertJudgeDocReport(params);
    getJudeDocDetailFunc
    .then(action('get judgeDoc', resp=> {
      this.detailData.html = resp.data.detail;
    }))
    .catch((error)=>{
      this.detailData.html = '--';
      console.log('get judgeDoc', error);
    });
  }
  @action.bound getAlertAnalysisList(monitorId, reportId) {
    this.isMount = true;
    this.listData = {};
    const {index, size} = uiStore.uiState.alertAnalysis;
    companyHomeApi.getAlertAnalysisList(monitorId, reportId, {index, size})
      .then(action('getAlert_success', resp => {
        let data = null;
        if (resp.data.content && resp.data.content.length > 0) {
          uiStore.updateUiStore('alertAnalysis.totalElements', resp.data.totalElements);
          data = resp.data;
        } else {
          data = {error: {message: '暂无信息'}, content: []};
        }
        this.listData = data;
      }))
      .catch(action('getAlert_error', err => {
        this.listData = err.response && {error: err.response.data, content: []} || {error: {message: '暂无信息'}, content: []};
      }));
  }
  @action.bound openDetailModal(type) {
    const companyName = this.detailData.info.companyName;
    if (type === 'SYS_RULE') {
      detailModalStore.openDetailModal((cp)=>{
        require.ensure([], (require)=>{
          cp(
            require('components/companyHome/report/AlertAnalysis/detail/Info'),
            require('components/companyHome/report/AlertAnalysis/detail/Content'),
          );
        });
      }, `预警详情（${companyName}）`);
    } else {
      detailModalStore.openDetailModal((cp)=>{
        require.ensure([], (require)=>{
          cp(
            require('components/companyHome/report/AlertAnalysis/detail/Info'),
            require('components/companyHome/report/AlertAnalysis/detail/Content'),
            null,
            require('components/companyHome/report/AlertAnalysis/detail/LeftBar')
          );
        });
      }, `预警详情（${companyName}）`);
    }
  }
}
export default new AlertAnalysisStore();
