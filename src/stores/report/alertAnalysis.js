import { observable, action } from 'mobx';
import detailModalStore from '../detailModal';
import { companyHomeApi } from 'api';
import uiStore from '../ui';
import testData from './testData';
class AlertAnalysisStore {
  @observable isMount = false;
  @observable listData = {};
  @observable detailData = {
    info: {
      'alertType': 'RULE',
      'description': '发现该企业的关联公司2014年2月13日被银行等金融机构起诉',
      'id': 2,
      'ruleName': '新增风险关联',
      'ruleTime': '2017-01-15'
    },
    detail: testData.rule8,
  }
  @action.bound getAlertAnalysisList(monitorId, reportId) {
    this.isMount = true;
    const {index, size} = uiStore.uiState.alertAnalysis;
    companyHomeApi.getAlertAnalysisList(monitorId, reportId, {index, size})
      .then(action('getAlert_success'), resp => {
        let data = null;
        if (resp.data.content && resp.data.content.length > 0) {
          uiStore.updateUiStore('alertAnalysis.totalElements', resp.data.totalElements);
          data = resp.data;
        } else {
          data = {error: {message: '暂无信息'}, content: []};
        }
        this.listData = data;
      })
      .catch(action('getAlert_error'), err => {
        this.listData = err.response && {error: err.response.data, content: []} || {error: {message: '暂无信息'}, content: []};
      });
  }
  @action.bound openDetailModal() {
    const companyName = this.detailData.detail.companyName;
    detailModalStore.openDetailModal((cp)=>{
      require.ensure([], (require)=>{
        cp(
          require('components/companyHome/report/AlertAnalysis/detail/Info'),
          require('components/companyHome/report/AlertAnalysis/detail/Content')
        );
      });
    }, `预警详情（${companyName}）`);
  }
}
export default new AlertAnalysisStore();
