import { observable, action } from 'mobx';
import {companyHomeApi} from 'api';
import pathval from 'pathval';
class RiskStore {
  @observable isLoading = true;
  @observable isMount = false;
  @observable court = {
    courtData: {},
    courtTab: [
      {key: 'judeDoc', label: '判决文书'},
      {key: 'courtAnnouncement', label: '法院公告'},
      {key: 'courtNotice', label: '开庭公告'},
      {key: 'courtExecution', label: '被执行人信息'},
      {key: 'dishonestyList', label: '失信被执行人信息'},
      {key: 'litigationAssets', label: '涉诉资产'}
    ],
    tabAct: '',
  };
  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    this.isLoading = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get risk data', (resp)=>{
        this.isLoading = false;
        this.court.courtData = resp.data.data.court;
      }))
      .catch((error)=>{
        console.log('risk error', error);
      });
  }
  @action.bound updateValue(path, value) {
    pathval.setPathValue(this, path, value);
  }
}
export default new RiskStore();
