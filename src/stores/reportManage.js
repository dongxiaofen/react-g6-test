import { observable, action } from 'mobx';
import { reportManageApi } from 'api';
import payModalStore from './payModal';
import messageStore from './message';
import uiStore from './ui';

class ReportManageStore {
  @observable config = [
    {key: 'companyName', dictKey: '报告企业名称', width: '40%', handle: 'tooltip'},
    {key: 'createdTs', dictKey: '创建报告日期', width: '20%', handle: 'time'},
    {key: 'lastModifiedTs', dictKey: '最近分析日期', width: '20%', handle: 'time'},
    {key: 'operation', dictKey: '操作', width: '20%'},
  ];
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
  @observable agreeModal = {
    reportId: '',
    companyName: '',
    turnToMonitor: {
      visible: false,
      title: '转为监控',
      checked: 0,
      showAgree: false,
      loading: false,
    },
  };

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

  @action.bound upGradeToMonitor(reportId, params, selectValue) {
    reportManageApi.upGradeToMonitor(reportId, selectValue)
      .then(action('update to monitor', (resp) => {
        if (resp.status === 200) {
          payModalStore.closeAction();
          messageStore.openMessage({type: 'info', content: '加入监控成功', duration: '1500'});
          this.monitorId = resp.data.monitorId;
          this.getReportList(params);
        }
      }))
      .catch(action( (err) => {
        payModalStore.closeAction();
        messageStore.openMessage({type: 'warning', content: err.response.data.message, duration: '1500'});
      }));
  }
}
export default new ReportManageStore();
