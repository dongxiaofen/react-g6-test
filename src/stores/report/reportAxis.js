import { observable, action, computed } from 'mobx';
import { companyHomeApi } from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;
import uiStore from '../ui';
import messageStore from '../message';
import detailModalStore from '../detailModal';
import pathval from 'pathval';

class ReportAxisStore {
  constructor() {
    this.alertCancel = null;
  }
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
    this.getReportAxis(params);
    this.getAlterAnalisis(params);
    this.getScanStatus(params.reportId);
  }
  @action.bound getReportAxis(params) {
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

    this.resetDetailData();
    this.listData = {};
    this.loadingId = -1;
    this.isMount = false;
  }

  // 风险信息相关================================
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
  @observable listData = [];
  @observable module = 'alertAnalysis';

  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound getAlterAnalisis(idParams) {
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
      .then(action('getAlertDetail_success', (resp) => {
        this.loadingId = -1;
        this.alertCancel = null;
        this.detailData.detail = resp.data;
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
  @action.bound getJudgeDocDetail(companyId, data) {
    const params = {};
    params.docId = data.docId;
    params.trailDate = data.trailDate;
    this.detailData.html = '';
    companyHomeApi.getAlertJudgeDocReport(companyId, params)
    .then(action('get judgeDoc', resp => {
      this.detailData.html = resp.data.detail;
    }))
    .catch(action('doc error', (error) => {
      console.log('get judgeDoc', error);
      this.detailData.html = '--';
    }));
  }
  @action.bound getNewsDetail(companyId) {
    const detailData = this.detailData.detail[this.detailData.activeIndex];
    const ruleId = detailData.ruleId;
    const scId = detailData.detail[0].id;
    this.detailData.html = '';
    companyHomeApi.getAlertNewsReport(companyId, ruleId, { scId })
    .then(action('get news', resp => {
      this.detailData.html = resp.data.html;
      detailData.detail[0].title = resp.data.title;
      detailData.detail[0].alterDt = resp.data.createTs;
    }))
    .catch(action('get news error', (error)=>{
      console.log('get news', error);
      this.detailData.html = '--';
    }));
  }
  @action.bound cancelAlertDetail() {
    if (this.alertCancel) {
      this.alertCancel();
      this.alertCancel = null;
    }
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

  // 风险扫描相关================================
  // reportId
  @observable reportId = '';
  // 结果loading
  @observable riskLoading = true;
  // 列表loading
  @observable riskListLoading = [];
  // 是否可扫描
  @observable canScan = false;
  // 分析状态
  @observable status = 'FIRST_TIME';
  // 结果
  @observable result = '';
  // 风险数据列表
  @observable listDataRisk = [];
  // 是否接口失败
  @observable apiIsResult = false;

  // 点击开始扫描按钮时先发送请求数据接口,再发送请求状态接口
  @action.bound getScanStatusClick() {
    const source = CancelToken.source();
    this.riskLoading = true;
    // 发送数据接口
    companyHomeApi.getEventAnalysis(this.reportId, source)
      .then(action('eventAnalysis', resp => {
        this.result = resp.data;
        this.getScanStatus(this.reportId);
      }))
      .catch(action('eventAnalysis', err => {
        if (err.response.data.errorCode === 404203 || err.response.data.errorCode === '404203') {
          this.getScanStatus(this.reportId);
        }
        // 接口失败
        this.apiIsResult = true;
      }));
  }

  // 请求分析状态:开始进入路由时发送此接口
  // 返回状态为"FIRST_TIME"时,不做任何操作,点击按钮后再次发送此接口,每隔10s发送一次,直到返回结果为"FINISH"
  // 返回状态为"PROCESSING"时,每隔10s发送一次,直到返回结果为"FINISH"
  // 返回状态为"FINISH"时,发送：scan/eventAnalysis接口,并获取结果数据
  @action.bound getScanStatus(reportId) {
    const source = CancelToken.source();
    this.reportId = reportId;
    this.riskLoading = true;
    companyHomeApi.getEventAnalysisStatus(this.reportId, source)
      .then(action('eventAnalysisStatus', resp => {
        // 是否可扫描
        this.canScan = resp.data.canScan;
        // 分析状态
        this.status = resp.data.status;
        // 分析状态
        if (this.status === 'FIRST_TIME') {
          this.riskLoading = false;
        }
        if (this.status === 'PROCESSING') {
          setTimeout(() => {
            this.getScanStatus(this.reportId);
          }, 30000);
        }
        if (resp.data.status === 'FINISH') {
          // 请求风险结果
          this.getScanResult();
        }
      }))
      .catch(action('eventAnalysisStatus', err => {
        // 接口失败
        this.apiIsResult = true;
        console.log(err);
      }));
  }
  // 请求风险结果
  @action.bound getScanResult() {
    const source = CancelToken.source();
    companyHomeApi.getEventAnalysis(this.reportId, source)
      .then(action('eventAnalysis', resp => {
        // 分析状态
        if (this.status === 'FINISH') {
          this.riskLoading = false;
        }
        this.result = resp.data;
      }))
      .catch(action('eventAnalysis', err => {
        console.log(err);
        // 接口失败
        this.apiIsResult = true;
      }));
  }
  // 请求风险数据详情列表
  @action.bound getScanList(recordIds, index) {
    // 判断是否已经有数据,有数据改变显示状态,无数据则请求数据
    // console.log(index, '=====index');
    let flag = true;
    if (this.listDataRisk.length > 0) {
      this.listDataRisk.map((obj, idx)=>{
        if (obj.index === index) {
          this.listDataRisk[idx].status = !this.listDataRisk[idx].status;
          flag = false;
          // console.log('1111====');
        }
      });
    }
    // console.log(flag, '====flag');
    if (flag) {
      // console.log('2222====');
      this.getScanListDetail(recordIds, index);
    }
    // console.log(this.listDataRisk, '===data');
  }
  // 请求风险数据详情列表
  @action.bound getScanListDetail(recordIds, index) {
    const source = CancelToken.source();
    this.riskListLoading.push(index);
    companyHomeApi.getEventAnalysisList(this.reportId, recordIds, source)
      .then(action('eventAnalysisList', resp => {
        this.listDataRisk.push(
          {
            index: index,
            status: true,
            data: resp.data
          }
        );
        if (this.riskListLoading.length > 0) {
          this.riskListLoading.splice(this.riskListLoading.indexOf(index), 1);
        }
        // console.log(this.riskListLoading, '====this.riskListLoading');
      }))
      .catch(action('eventAnalysisList', err => {
        console.log(err);
      }));
  }
  // reset
  @action.bound resetStoreRisk() {
    this.reportId = '';
    // 结果loading
    this.riskLoading = true;
    // 列表loading
    this.riskListLoading = [];
    // 是否可扫描
    this.canScan = false;
    // 分析状态
    this.status = 'FIRST_TIME';
    // 结果
    this.result = '';
    // 风险数据列表
    this.listDataRisk = [];
    // 是否接口失败
    this.apiIsResult = false;
  }
}
export default new ReportAxisStore();
