import { observable, action, computed } from 'mobx';
import detailModalStore from '../detailModal';
import pathval from 'pathval';
import axios from 'axios';
import { companyHomeApi } from 'api';
import uiStore from '../ui';
import messageStore from '../message';
const CancelToken = axios.CancelToken;
const testData = {
  data: [
    {
      companyName: 'test',
      ruleId: 77,
      time: '2012-01-01',
      detail: [
        {
          'url': 'http://jobs.zhaopin.com/340398711251776.htm',
          'jobTitle': '总监',
          'eventTime': '2017-06-14',
          'source': 'zhilian'
        },
        {
          'url': 'http://jobs.zhaopin.com/340398711251776.htm',
          'jobTitle': '总监',
          'eventTime': '2017-06-14',
          'source': 'zhilian'
        }
      ],
    },
    {
      companyName: 'test',
      ruleId: 77,
      time: '2012-01-02',
      detail: [
        {
          'url': 'http://jobs.zhaopin.com/340398711251776.htm',
          'jobTitle': '总监2',
          'eventTime': '2017-06-14',
          'source': 'zhilian'
        },
        {
          'url': 'http://jobs.zhaopin.com/340398711251776.htm',
          'jobTitle': '总监2',
          'eventTime': '2017-06-14',
          'source': 'zhilian'
        }
      ],
    }
  ],
};
class AlertAnalysisStore {
  constructor() {
    this.alertCancel = null;
  }

  @observable isMount = false;
  @observable isLoading = true;

  @observable loadingId = -1;
  @observable listData = [];
  // 六芒星data
  @observable sixStarData = '';
  // 六芒星loading
  @observable loading = false;
  @observable detailData = {
    activeIndex: 0,
    page: 1,
    tabTop: computed(function tabTop() {
      return 0 - (this.page - 1) * 8 * 60;
    }),
    info: {},
    detail: {},
    html: '',
    orgData: {},
    loading: false,
  }
  @observable module = 'alertAnalysis';
  @action.bound getReportModule(idParams) {
    this.isMount = true;
    this.listData = {};
    const {index, size} = uiStore.uiState.alertAnalysis;
    companyHomeApi.getReportModule('alert/page', idParams, {index, size})
    .then(action('getAlert_success', resp => {
      let data = null;
      if (resp.data.content && resp.data.content.length > 0) {
        uiStore.updateUiStore('alertAnalysis.totalElements', resp.data.totalElements);
        data = resp.data;
      } else {
        data = {error: {message: '暂无信息'}, content: []};
      }
      this.listData = data;
      this.isLoading = false;
    }))
    .catch(action('getAlert_error', err => {
      this.isLoading = false;
      this.listData = err.response && {error: err.response.data, content: []} || {error: {message: '暂无信息'}, content: []};
    }));
  }
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound routeToCompanyHome(companyName) {
    companyHomeApi.judgeReportType(companyName)
      .then(resp => {
        const {reportId, monitorId, analysisReportId} = resp.data;
        let url;
        if (monitorId) {
          url = `corpDetail?monitorId=${monitorId}`;
        } else if (reportId) {
          url = `corpDetail?reportId=${reportId}`;
        } else if (analysisReportId) {
          url = `corpDetail?analysisReportId=${analysisReportId}`;
        } else {
          url = `corpDetail?companyName=${companyName}`;
        }
        window.open(url);
      })
      .catch(err => {
        messageStore.openMessage({
          type: 'error',
          content: pathval.getPathValue(err, 'response.data.message') || '跳转失败，请重试'
        });
      });
  }
  @action.bound getAlertDetail(url, companyType, companyId, info, params) {
    if (this.alertCancel) {
      this.alertCancel();
      this.alertCancel = null;
    }
    this.detailData.loading = true;
    this.detailData.activeIndex = 0;
    this.detailData.page = 1;
    const source = CancelToken.source();
    this.alertCancel = source.cancel;
    companyHomeApi.getAlertDetail(url, source, params)
      .then(action('getAlertDetail_success', resp => {
        this.loadingId = -1;
        this.alertCancel = null;
        this.detailData.detail = testData.data;
        this.detailData.orgData = resp.data;
        this.detailData.info = info;
        this.detailData.loading = false;
        this.openDetailModal(this.detailData.info.alertType);
        if (this.detailData.detail[0].ruleType === 1) {
          this.getJudgeDocDetail(companyId, this.detailData.detail[0].detail[0].judgeInfo);
        }
        if (this.detailData.detail[0].ruleType === 11) {
          this.getNewsDetail(companyId);
        }
      }))
      .catch(action('getAlertDetail_error', err => {
        if (!axios.isCancel(err)) {
          console.log(err, '===');
          this.loadingId = -1;
          this.detailData.loading = false;
          this.alertCancel = null;
          messageStore.openMessage({
            type: 'error',
            content: pathval.getPathValue(err, 'response.data.message') || '获取数据失败'
          });
        }
      }));
  }
  @action.bound getNewsDetail(companyId) {
    const detailData = this.detailData.detail[this.detailData.activeIndex];
    const ruleId = detailData.ruleId;
    const scId = detailData.detail[0].id;
    this.detailData.html = '';
    companyHomeApi.getAlertNewsReport(companyId, ruleId, { scId })
    .then(action('get news', resp=> {
      this.detailData.html = resp.data.html;
    }))
    .catch(action('get news error', (error)=>{
      console.log('get news', error);
      this.detailData.html = '--';
    }));
  }
  @action.bound getJudgeDocDetail(companyId, data) {
    const params = {};
    params.docId = data.docId;
    params.trailDate = data.trailDate;
    this.detailData.html = '';
    companyHomeApi.getAlertJudgeDocReport(companyId, params)
    .then(action('get judgeDoc', resp=> {
      this.detailData.html = resp.data.detail;
    }))
    .catch(action('doc error', (error)=>{
      console.log('get judgeDoc', error);
      this.detailData.html = '--';
    }));
  }
  // @action.bound getAlertAnalysisList(monitorId, analysisReportId) {
  //   this.isMount = true;
  //   this.listData = {};
  //   if (window.reportSourceCancel === undefined) {
  //     window.reportSourceCancel = [];
  //   }
  //   const source = CancelToken.source();
  //   window.reportSourceCancel.push(source.cancel);
  //   const {index, size} = uiStore.uiState.alertAnalysis;
  //   companyHomeApi.getAlertAnalysisList(monitorId, analysisReportId, {index, size}, source)
  //     .then(action('getAlert_success', resp => {
  //       let data = null;
  //       if (resp.data.content && resp.data.content.length > 0) {
  //         uiStore.updateUiStore('alertAnalysis.totalElements', resp.data.totalElements);
  //         data = resp.data;
  //       } else {
  //         data = {error: {message: '暂无信息'}, content: []};
  //       }
  //       this.listData = data;
  //     }))
  //     .catch(action('getAlert_error', err => {
  //       this.listData = err.response && {error: err.response.data, content: []} || {error: {message: '暂无信息'}, content: []};
  //     }));
  // }
  @action.bound openDetailModal() {
    const companyName = this.detailData.info.companyName;
    detailModalStore.openDetailModal((cp)=>{
      require.ensure([], (require)=>{
        cp(
          require('components/companyHome/report/AlertAnalysis/detail/Info'),
          require('components/companyHome/report/AlertAnalysis/detail/Content'),
          null,
          require('components/companyHome/report/AlertAnalysis/detail/LeftBar')
        );
      });
    }, `推送详情（${companyName}）`);
  }
  @action.bound resetHtml() {
    this.detailData.html = '';
  }
  @action.bound resetDetailData() {
    this.detailData = {
      activeIndex: 0,
      page: 1,
      tabTop: computed(function testName() {
        return 0 - (this.page - 1) * 8 * 60;
      }),
      info: {},
      detail: {},
      html: '',
    };
  }
  // 获取六芒星Data
  @action.bound getSixStar(monitorId) {
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    const source = CancelToken.source();
    window.reportSourceCancel.push(source.cancel);
    // 打开loading
    this.loading = true;
    // 获取列表数据
    companyHomeApi.getSixStar(monitorId, source)
      .then(action('six list', (resp) => {
        this.sixStarData = resp.data.result;
        // 关闭loading
        this.loading = false;
      }))
      .catch(action('six error', (err) => {
        console.log(err.response, '=====six error');
        // 关闭loading
        this.loading = false;
        this.sixStarData = {error: 'error'};
      }));
  }
  @action.bound resetStore() {
    this.isMount = false;
    this.loadingId = -1;
    this.listData = {};
    this.sixStarData = {};
    this.loading = false;
    this.resetDetailData();
  }
  @action.bound cancelAlertDetail() {
    if (this.alertCancel) {
      this.alertCancel();
      this.alertCancel = null;
    }
  }
}
export default new AlertAnalysisStore();
