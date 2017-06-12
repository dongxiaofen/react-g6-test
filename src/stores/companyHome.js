import { observable, action, computed} from 'mobx';
// import payModalStore from './payModal';
import modalStore from './modal';
import messageStore from './message';
// import { browserHistory } from 'react-router';
import { companyHomeApi } from 'api';
import pathval from 'pathval';
class CompanyHomeStore {
  @observable reportInfo = {
    analysisReportId: '',
    basicReportId: '',
    reportId: '',
    monitorId: '',
    dimensions: [],
    monitorStatus: '',
  }
  @observable loanOption = [
    { label: '多维综合评价', value: 'SCORE', checked: true},
    { label: '盈利能力分析', value: 'PROFIT', checked: true},
    { label: '营运能力分析', value: 'OPERATION', checked: true},
    { label: '发展能力分析', value: 'GROWING', checked: true},
  ];
  @observable monitorTime = 1;
  @observable loanLoading = false;
  @computed get monitorTimeObj() {
    const init = [
      {text: '1个月', key: 'ONE_MONTH'},
      {text: '2个月', key: 'TWO_MONTH'},
      {text: '3个月', key: 'THREE_MONTH'},
      {text: '4个月', key: 'FOUR_MONTH'},
      {text: '5个月', key: 'FIVE_MONTH'},
      {text: '6个月', key: 'SIX_MONTH'},
      {text: '7个月', key: 'SEVEN_MONTH'},
      {text: '8个月', key: 'EIGHT_MONTH'},
      {text: '9个月', key: 'NINE_MONTH'},
      {text: '10个月', key: 'TEN_MONTH'},
      {text: '11个月', key: 'ELEVEN_MONTH'},
      {text: '12个月', key: 'ONE_YEAR'},
    ];
    return init[this.monitorTime - 1];
  }
  @computed get loanOptValue() {
    const output = [];
    this.loanOption.forEach((item)=>{
      if (item.checked) {
        output.push(item.value);
      }
    });
    return output;
  }
  createMonitorConfirm = (params)=> {
    let text = {
      content: '监控创建成功'
    };
    companyHomeApi.createMonitor(params)
      .then(action('createMonitor', (resp) => {
        modalStore.closeAction();
        messageStore.openMessage({ ...text });
        this.reportInfo.monitorId = resp.data.monitorId;
      }))
      .catch(action('createMonitor error', (err) => {
        console.log(err.response, '=====createMonitor error');
        modalStore.closeAction();
        text = {
          type: 'warning',
          content: err.response.data.message
        };
        messageStore.openMessage({ ...text });
      }));
  }
  @action.bound createMonitor() {
    const args = {
      width: '900px',
      boxStyle: {
        padding: '20px',
      },
      isNeedBtn: false,
      pointText: true,
      isSingleBtn: true,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('components/common/reportOper/CreateMonitor'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
  }
  @action.bound createLoanRep(companyName) {
    let text = {
      content: '分析报告创建成功'
    };
    this.loanLoading = true;
    companyHomeApi.createAnalyRep({companyName, items: this.loanOptValue})
    .then(action('createAnalyRep', (resp) => {
      modalStore.closeAction();
      messageStore.openMessage({ ...text });
      this.reportInfo.analysisReportId = resp.data.analysisReportId;
      this.reportInfo.dimensions = this.reportInfo.dimensions.concat(this.loanOptValue);
      this.loanLoading = false;
    }))
    .catch(action('createMonitor error', (err) => {
      console.log(err.response, '=====createMonitor error');
      modalStore.closeAction();
      text = {
        type: 'warning',
        content: err.response.data.message
      };
      messageStore.openMessage({ ...text });
      this.loanLoading = false;
    }));
  }
  @action.bound openLoanModal() {
    const args = {
      width: '745px',
      boxStyle: {
        padding: '20px',
      },
      isNeedBtn: false,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('components/common/reportOper/CreateLoanRep'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
  }
  @action.bound upgradeReport() {
    const basicReportId = this.reportInfo.basicReportId;
    let text = {
      content: '升级成功'
    };
    companyHomeApi.upgradeReport(basicReportId)
    .then(action('upgradeReport', (resp) => {
      modalStore.closeAction();
      messageStore.openMessage({ ...text });
      this.reportInfo.reportId = resp.data.reportId;
    }))
    .catch(action('upgradeReport error', (err) => {
      console.log(err.response, '=====upgradeReport error');
      modalStore.closeAction();
      text = {
        type: 'warning',
        content: err.response.data.message
      };
      messageStore.openMessage({ ...text });
    }));
  }
  @action.bound openUpReportModal() {
    const args = {
      title: '升级报告',
      pointText: true,
      isSingleBtn: true,
      confirmAction: this.upgradeReport,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('components/common/reportOper/UpgradeReport'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
  }
  @action.bound updateLoanOption(idx, value) {
    this.loanOption[idx].checked = value;
  }
  @action.bound createBasicReport(params) {
    companyHomeApi.createBasicReport({companyName: params.companyName})
    .then(action('createBasicReport', (resp)=>{
      this.reportInfo.basicReportId = resp.data.basicReportId;
    }))
    .catch(action('createBasicReport err', (error)=>{
      console.log(error);
    }));
  }

  @action.bound getReportStatus(params) {
    this.isLoading = true;
    companyHomeApi.getReportStatus(params)
    .then(action('getReportStatus', (resp)=>{
      if (resp.data.basicReportId || resp.data.reportId) {
        this.reportInfo = Object.assign(this.reportInfo, resp.data);
        if (resp.data.dimensions) {
          this.initDimensions(resp.data.dimensions);
        }
      } else {
        this.createBasicReport({companyName: params.companyName});
      }
    }))
    .catch(action('getReportStatus err', (error)=>{
      console.log(error);
    }));
  }
  @action.bound initDimensions(dimensions) {
    dimensions.map((key)=>{
      const idx = this.loanOption.findIndex((item)=>{
        return item.value === key;
      });
      if (idx > -1) {
        this.loanOption[idx].checked = false;
      }
    });
  }
  @action.bound updateValue(keyPath, value) {
    pathval.setPathValue(this, keyPath, value);
  }
  @action.bound resetStore() {
    this.reportInfo = {
      analysisReportId: '',
      basicReportId: '',
      reportId: '',
      monitorId: '',
      dimensions: [],
      monitorStatus: '',
    };
    this.loanOption = [
      { label: '多维综合评价', value: 'SCORE', checked: true},
      { label: '盈利能力分析', value: 'PROFIT', checked: true},
      { label: '营运能力分析', value: 'OPERATION', checked: true},
      { label: '发展能力分析', value: 'GROWING', checked: true},
    ];
    this.monitorTime = 1;
    this.loanLoading = false;
  }
}
export default new CompanyHomeStore();
