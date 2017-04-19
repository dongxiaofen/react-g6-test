import { observable, action } from 'mobx';
import { reportManageApi } from 'api';
import payModalStore from './payModal';
import pathval from 'pathval';

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
        if (response.status === 200) {
          pathval.setPathValue(payModalStore, 'value.monitorModalStatus', false);
// 显示成功的弹窗
          pathval.setPathValue(payModalStore, 'value.secondVisible', true);
          pathval.setPathValue(payModalStore, 'value.secondText', '加入监控成功');
          pathval.setPathValue(payModalStore, 'value.btnLoading', false);

          pathval.setPathValue(this, 'monitorId', response.data.monitorId);
          this.getReportList(0, params);
        }
      }))
      .catch(action( (err) => {
        console.log(err.response.data.message);
        pathval.setPathValue(payModalStore, 'value.btnLoading', false);
        pathval.setPathValue(payModalStore, 'value.secondVisible', true);
        pathval.setPathValue(payModalStore, 'value.monitorModalStatus', false);
        pathval.setPathValue(payModalStore, 'value.secondText', err.response.data.message);
      }));
  }
}
export default new ReportManageStore();
