import { observable, action, runInAction } from 'mobx';
import { reportManageApi } from 'api';
import payModalStore from './payModal';
import modalStore from './modal';
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

  @action.bound getReportList(params) {
    this.isLoading = true;
    reportManageApi.getReportList(params)
      .then(action('get report page', (resp) => {
        const reportManagePager = uiStore.uiState.reportManagePager;
        this.reportList = resp.data.content;
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

  @action.bound getAnalysisReportList(params) {
    this.isLoading = true;
    reportManageApi.getAnalysisReportList(params)
      .then(action('get analysis report page', (resp) => {
        if (params.index === 1) {
          uiStore.uiState.reportManagePager.index = 1;
        }
        this.reportList = resp.data.content;
        uiStore.uiState.reportManagePager.totalElements = resp.data.totalElements;
        this.isLoading = false;
      }))
      .catch((err) => {
        console.log(err.response, '--------getAnalysisReportList');
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  @action.bound upGradeToMonitor(reportId, status, params, selectValue) {
    reportManageApi.upGradeToMonitor(reportId, status, selectValue)
      .then(action('update to monitor', (resp) => {
        payModalStore.closeAction();
        messageStore.openMessage({ type: 'info', content: '加入监控成功', duration: '1500' });
        this.monitorId = resp.data.monitorId;
        if (status === 'report') {
          this.getReportList(params);
        } else {
          this.getAnalysisReportList(params);
        }
      }))
      .catch(action( (err) => {
        payModalStore.closeAction();
        messageStore.openMessage({type: 'warning', content: err.response.data.message, duration: '1500'});
      }));
  }

  @action.bound updateToAnalysisReport(reporId, params) {
    modalStore.confirmLoading = true;
    reportManageApi.updateToAnalysisReport(reporId)
      .then(action('update to AnalysisReport', () => {
        modalStore.confirmLoading = false;
        modalStore.closeAction();
        messageStore.openMessage({ type: 'info', content: '升级深度分析报告成功', duration: '1500' });
        this.getReportList(params);
      }))
      .catch((err) => {
        console.log(err.response);
        modalStore.closeAction();
        messageStore.openMessage({ type: 'warning', content: err.response.data.message, duration: '1500' });
        modalStore.confirmLoading = false;
      });
  }
}
export default new ReportManageStore();
