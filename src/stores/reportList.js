import {observable, action} from 'mobx';
import pathval from 'pathval';
import {reportListApi} from 'api';
import uiStore from './ui';

class ReportListStore {
  @observable activeKey = 'basic';
  @observable listCount = {};
  @observable basicList = {};
  @observable advancedList = {};
  @observable searchInput = '';
  @observable isShowNoResultMessage = false;

  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }

  @action.bound getReportCount() {
    this.listCount = {};
    reportListApi.getReportCount()
      .then(action('getReportCount_success', resp => {
        this.listCount = resp.data;
      }))
      .catch(action('getReportCount_error', err => {
        console.log(err);
        this.listCount = {
          basicReportNum: 0,
          reportNum: 0,
        };
      }));
  }

  @action.bound getReportList() {
    this.isShowNoResultMessage = false;
    const activeKey = this.activeKey;
    const moduleStr = activeKey + 'List';
    const reportListPager = uiStore.uiState[activeKey + 'ReportPager'];
    const {index, size} = reportListPager;
    const params = {index, size, companyName: this.searchInput};
    this[moduleStr] = {};
    reportListApi.getReportList(activeKey, params)
      .then(action('get report page', (resp) => {
        reportListPager.totalElements = resp.data.totalElements;
        this[moduleStr] = resp.data;
        this.isShowNoResultMessage = !!this.searchInput;
      }))
      .catch(action('get report page', (err) => {
        console.log(err, '-----getReportList');
        this[moduleStr] = {error: pathval.getPathInfo(err, 'response.data') || {message: '暂无信息'}, content: []};
      }));
  }
}
export default new ReportListStore();
