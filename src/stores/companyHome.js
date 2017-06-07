import { observable, action, computed} from 'mobx';
import payModalStore from './payModal';
import modalStore from './modal';
import messageStore from './message';
import { browserHistory } from 'react-router';
import { companyHomeApi } from 'api';
import pathval from 'pathval';
class CompanyHomeStore {
  @observable reportInfo = {
    analysisReportId: '',
    monitorId: '',
    dimensions: [],
  }
  @observable loanOption = [
    { label: '多维综合评价', value: 'SCORE', checked: true},
    { label: '盈利能力分析', value: 'PROFIT', checked: true},
    { label: '营运能力分析', value: 'OPERATION', checked: true},
    { label: '发展能力分析', value: 'GROWING', checked: true},
  ];
  @observable loanDemoAct = 0;
  @observable monitorDemoAct = 0;
  @computed get loanOptValue() {
    const output = [];
    this.loanOption.forEach((item)=>{
      if (item.checked) {
        output.push(item.value);
      }
    });
    return output;
  }
  choiceOk = (companyName)=> {
    const params = {companyName: companyName, time: payModalStore.selectValue};
    let text = {
      content: '监控创建成功'
    };
    companyHomeApi.createMonitor(params)
      .then(action('createMonitor', (resp) => {
        payModalStore.closeAction();
        messageStore.openMessage({ ...text });
        this.reportInfo.monitorId = resp;
        browserHistory.push(`/companyHome/monitorTimeAxis/?companyName=${companyName}`);
      }))
      .catch(action('createMonitor error', (err) => {
        console.log(err.response, '=====createMonitor error');
        payModalStore.closeAction();
        text = {
          type: 'warning',
          content: err.response.data.message
        };
        messageStore.openMessage({ ...text });
      }));
  }
  @action.bound createMonitor(companyName) {
    payModalStore.openCompModal({
      'modalType': 'createMonitor',
      'width': '580px',
      'pointText': true,
      'callBack': this.choiceOk.bind(this, companyName),
    });
  }
  @action.bound createLoanRep(companyName) {
    let text = {
      content: '分析报告创建成功'
    };
    companyHomeApi.createAnalyRep({companyName, items: this.loanOptValue})
    .then(action('createAnalyRep', (resp) => {
      payModalStore.closeAction();
      messageStore.openMessage({ ...text });
      this.reportInfo.monitorId = resp;
      browserHistory.push(`/companyHome/monitorTimeAxis/?companyName=${companyName}`);
    }))
    .catch(action('createMonitor error', (err) => {
      console.log(err.response, '=====createMonitor error');
      payModalStore.closeAction();
      text = {
        type: 'warning',
        content: err.response.data.message
      };
      messageStore.openMessage({ ...text });
    }));
  }
  @action.bound openLoanModal(companyName) {
    const args = {
      width: '900px',
      boxStyle: {
        padding: '20px',
      },
      isNeedBtn: false,
      pointText: true,
      isSingleBtn: true,
      confirmAction: this.createLoanRep.bind(this, companyName),
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('components/common/reportOper/CreateLoanRep'));
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
