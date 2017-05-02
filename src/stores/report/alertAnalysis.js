import { observable, action } from 'mobx';
import detailModalStore from '../detailModal';
import testData from './testData';
class AlertAnalysisStore {
  @observable detailData = {
    info: {
      'alertType': 'RULE',
      'description': '发现该企业的关联公司2014年2月13日被银行等金融机构起诉',
      'id': 2,
      'ruleName': '新增风险关联',
      'ruleTime': '2017-01-15'
    },
    detail: testData[1],
  }
  @action.bound openDetailModal() {
    detailModalStore.openDetailModal((cp)=>{
      require.ensure([], (require)=>{
        cp(
          require('components/companyHome/report/AlertAnalysis/detail/Info'),
          require('components/companyHome/report/AlertAnalysis/detail/Content')
        );
      });
    });
  }
}
export default new AlertAnalysisStore();
