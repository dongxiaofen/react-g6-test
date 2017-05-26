import { observable, action, runInAction } from 'mobx';
import { reportManageApi } from 'api';
import payModalStore from './payModal';
import messageStore from './message';
import uiStore from './ui';

class ReportManageStore {
  @observable focus = false;
  @observable companyName = '';

  @observable reportList = [];
  @observable isLoading = false;

  @observable monitorId = '';

  // 设置搜索的公司名称
  @action.bound setCompanyName(value) {
    this.companyName = value;
  }
  // 设置搜索的focus
  @action.bound setFocus(value) {
    this.focus = value;
  }

  @action.bound getReportListData(params) {
    const reportManagePager = uiStore.uiState.reportManagePager;
    const pageIndex = reportManagePager.index;
    if (this.reportList.length === 1 && pageIndex !== 1) {
      reportManagePager.index = pageIndex - 1;
    } else {
      this.getReportList(params);
    }
  }

  @action.bound getReportList(params) {
    this.isLoading = true;
    reportManageApi.getReportList(params)
      .then(action('get report page', (resp) => {
        this.reportList = resp.data.content;
        const reportManagePager = uiStore.uiState.reportManagePager;
        reportManagePager.totalElements = resp.data.totalElements;
        this.isLoading = false;
      }))
      .catch((err) => {
        console.log(err, '-----getReportList');
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  @action.bound upGradeToMonitor(reportId, params, selectValue) {
    reportManageApi.upGradeToMonitor(reportId, selectValue)
      .then(action('update to monitor', (resp) => {
        payModalStore.closeAction();
        messageStore.openMessage({ type: 'info', content: '加入监控成功', duration: '1500' });
        this.monitorId = resp.data.monitorId;
        this.getReportListData(params);
      }))
      .catch(action( (err) => {
        payModalStore.closeAction();
        messageStore.openMessage({type: 'warning', content: err.response.data.message, duration: '1500'});
      }));
  }
}
export default new ReportManageStore();
