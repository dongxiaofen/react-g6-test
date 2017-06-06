import { observable, action } from 'mobx';
import payModalStore from './payModal';
import messageStore from './message';
import { browserHistory } from 'react-router';
import { companyHomeApi } from 'api';
class CompanyHomeStore {
  @observable reportInfo = {
    monitorId: '',
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
}
export default new CompanyHomeStore();
