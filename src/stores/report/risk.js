import { observable, action } from 'mobx';
import {companyHomeApi} from 'api';
import pathval from 'pathval';
import detailModalStore from '../detailModal';
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
    tabAct: 'judeDoc',
    detailModalData: {
      info: {},
      content: {},
    }
  };
  @observable corpDetailPunish = {};
  @observable taxList = [];
  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    this.isLoading = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get risk data', (resp)=>{
        this.isLoading = false;
        this.court.courtData = resp.data.data.court;
        this.corpDetailPunish = resp.data.data.corpDetailPunish;
        this.taxList = resp.data.data.taxList;
      }))
      .catch((error)=>{
        console.log('risk error', error);
      });
  }
  openDetailModal() {
    detailModalStore.openDetailModal((cp)=>{
      require.ensure([], (require)=>{
        cp(
          require('components/companyHome/report/risk/Court/JudgeDoc/DetailCom/Info'),
          require('components/companyHome/report/risk/Court/JudgeDoc/DetailCom/Content')
        );
      });
    });
  }
  @action.bound getJudgeDetailMonitor(monitorCompanyId, params, info) {
    companyHomeApi.getJudgeDetailMonitor(monitorCompanyId, params)
      .then(action('judeDoc detail', (resp)=>{
        this.court.detailModalData.content = resp.data.detail;
        this.court.detailModalData.info = info;
        this.openDetailModal();
      }))
      .catch((error)=>{
        console.log('risk error', error);
      });
  }
  @action.bound getJudgeDetailReport(params, info) {
    companyHomeApi.getJudgeDetailReport(params)
      .then(action('judeDoc detail', (resp)=>{
        this.court.detailModalData.content = resp.data.detail;
        this.court.detailModalData.info = info;
        this.openDetailModal();
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
