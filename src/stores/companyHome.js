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
  };
  @observable loanOption = [
    { label: '多维综合评价', value: 'SCORE', checked: true},
    { label: '盈利能力分析', value: 'PROFIT', checked: true},
    { label: '营运能力分析', value: 'OPERATION', checked: true},
    { label: '发展能力分析', value: 'GROWING', checked: true},
  ];
  @observable loanDemoAct = 0;
  @observable monitorDemoAct = 0;
  @observable monitorTime = 1;
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
  };
  @action.bound getIdParams(params) {
    companyHomeApi.getReportStatus(params)
      .then(action('getIdParams', resp => {
        this.reportInfo = Object.assign({}, this.reportInfo, resp.data);
      }))
      .catch(action('getIdParams', err => {
        console.log(err, 'getIdParams');
        messageStore.openMessage({
          type: 'warning',
          content: err.response.data.message
        });
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
    companyHomeApi.createAnalyRep({companyName, items: this.loanOptValue})
    .then(action('createAnalyRep', (resp) => {
      modalStore.closeAction();
      messageStore.openMessage({ ...text });
      this.reportInfo.analysisReportId = resp.data.analysisReportId;
      this.reportInfo.dimensions = this.reportInfo.dimensions.concat(this.loanOptValue);
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
  @action.bound openLoanModal() {
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
  @action.bound updateValue(keyPath, value) {
    pathval.setPathValue(this, keyPath, value);
  }

}
export default new CompanyHomeStore();
