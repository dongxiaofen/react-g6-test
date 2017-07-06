import {observable, action} from 'mobx';
import pathval from 'pathval';
import {analysisListApi} from 'api';
import uiStore from './ui';
// const testData = {
//   content: [
//     {
//       analysisReportId: 324,
//       companyName: '长安',
//       dimension: 'SCORE',
//       lastModifiedTs: '2017-07-01'
//     },
//     {
//       analysisReportId: 324,
//       companyName: '长安',
//       dimension: 'SCORE',
//       lastModifiedTs: '2017-07-01'
//     },
//     {
//       analysisReportId: 324,
//       companyName: '长安',
//       dimension: 'SCORE',
//       lastModifiedTs: '2017-07-01'
//     }
//   ],
//   totalElements: 100,
// };
class AnalysisListStore {
  @observable activeKey = 'multi'; // multi profit operate develop debt capital cash
  @observable listCount = {};
  @observable multiList = {};
  @observable profitList = {};
  @observable operateList = {};
  @observable developList = {};
  @observable searchInput = '';
  @observable isShowNoResultMessage = false;

  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }

  @action.bound getAnalysisCount() {
    this.listCount = {};
    analysisListApi.getAnalysisCount()
      .then(action('getAnalysisCount_success', (resp) => {
        this.listCount = resp.data;
      }))
      .catch(action('getAnalysisCount_error', err => {
        console.log(err);
        this.listCount = {
          scoreNum: 0,
          profitNum: 0,
          operationNum: 0,
          growingNum: 0,
        };
      }));
  }

  @action.bound getAnalysisList() {
    const activeKey = this.activeKey;
    const apiArr = ['multi', 'profit', 'operate', 'develop'];
    if (!apiArr.includes(activeKey)) return false;
    const moduleStr = activeKey + 'List';
    const analysisListPager = uiStore.uiState[activeKey + 'AnalysisPager'];
    const {index, size} = analysisListPager;
    const params = {
      index,
      size,
      companyName: this.searchInput
    };
    this[moduleStr] = {};
    analysisListApi.getAnalysisList(activeKey, params)
      .then(action('get report page', (resp) => {
        analysisListPager.totalElements = resp.data.totalElements;
        this[moduleStr] = resp.data;
        this.isShowNoResultMessage = !!this.searchInput;
      }))
      .catch(action('get report page', (err) => {
        console.log(err, '-----getAnalysisList');
        this[moduleStr] = {error: pathval.getPathInfo(err, 'response.data') || {message: '暂无信息'}, content: []};
      }));
  }
}
export default new AnalysisListStore();