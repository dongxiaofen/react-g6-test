import { observable, action } from 'mobx';
import { reportManageApi } from 'api';
import payModalStore from './payModal';
import modalStore from './modal';
import messageStore from './message';
import uiStore from './ui';

class ReportManageStore {
  @observable msgModal = {
    show: false,
    iconType: 'info',
    msg: '',
  };
  // @observable reportList = {
  //   loading: true,
  //   module: ''
  // };
  @observable searchWithCompany = '';
  @observable focus = false;

  @observable reportList = [];
  @observable isLoading = false;

  @observable monitorId = '';

  @action.bound getReportList(params) {
    this.isLoading = true;
    reportManageApi.getReportList(params)
      .then(action('get report page', (resp) => {
        this.reportList = resp.data.content;
        uiStore.uiState.reportManagePager.totalElements = resp.data.totalElements;
        this.isLoading = false;
      }))
      .catch((err) => {
        console.log(err.response, '-----getReportList');
        this.isLoading = false;
      });
  }

  @action.bound getAnalysisReportList(params) {
    this.isLoading = true;
    reportManageApi.getAnalysisReportList(params)
      .then(action('get analysis report page', (resp) => {
        this.reportList = resp.data.content;
        uiStore.uiState.reportManagePager.totalElements = resp.data.totalElements;
        this.isLoading = false;
      }))
      .catch((err) => {
        console.log(err.response, '--------getAnalysisReportList');
        this.isLoading = false;
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
        messageStore.openMessage({ type: 'info', content: '升级深度评估报告成功', duration: '1500' });
        this.getReportList(params);
      }))
      .catch((err) => {
        console.log(err.response);
        modalStore.confirmLoading = false;
      });
  }
}
export default new ReportManageStore();
