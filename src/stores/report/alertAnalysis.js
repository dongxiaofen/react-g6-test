import { observable, action } from 'mobx';
import detailModalStore from '../detailModal';
import pathval from 'pathval';
import axios from 'axios';
import { companyHomeApi } from 'api';
import uiStore from '../ui';
import messageStore from '../message';
import testData from './testData';
const CancelToken = axios.CancelToken;
class AlertAnalysisStore {
  @observable isMount = false;
  @observable loadingId = -1;
  alertCancel = null;
  @observable listData = {};
  @observable detailData = {
    info: {
      'alertType': 'RULE',
      'description': '发现该企业的关联公司2014年2月13日被银行等金融机构起诉',
      'id': 2,
      'ruleName': '新增风险关联',
      'ruleTime': '2017-01-15'
    },
    detail: testData.rule13to31,
  }
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound getAlertDetail(url) {
    if (this.alertCancel) {
      this.alertCancel();
      this.alertCancel = null;
    }
    const source = CancelToken.source();
    this.alertCancel = source.cancel;
    companyHomeApi.getAlertDetail(url, source)
      .then(action('getAlertDetail_success', resp => {
        this.loadingId = -1;
        this.alertCancel = null;
        console.log(resp);
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
  @action.bound openDetailModal() {
    const companyName = this.detailData.detail.companyName;
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
export default new AlertAnalysisStore();
