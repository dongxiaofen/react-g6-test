import { observable, action } from 'mobx';
import { reportManageApi } from 'api';

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
  @observable reportList = {
    loading: true,
    module: ''
  };
  @observable searchWithCompany = '';
  @observable focus = false;
  @observable params = {
    companyName: '',
    index: 1,
    size: 10,
  };
  @observable list = {};
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
    reportManageApi.getReportList(params)
      .then(action( (response) => {
        this.list = response;
      }))
      .catch((err) => {
        console.log(err.response);
      });
  }

  @action.bound upGradeToMonitor(reportId, params, selectValue) {
    reportManageApi.upGradeToMonitor(reportId, selectValue)
      .then(action( (response) => {
        console.log(response, params);
      }))
      .catch((error) => {
        console.log(error.response);
      });
  }
}
export default new ReportManageStore();
