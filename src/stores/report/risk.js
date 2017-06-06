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
    tabAct: '',
    detailModalData: {
      info: {},
      content: {},
    },
    hasCourtData: true,
  };
  @observable corpDetailPunish = {};
  @observable taxList = [];
  @action.bound getDefaultCourtTab(courtCount) {
    let tabAct = '';
    const courtTab = this.court.courtTab;
    for (const tabItem of courtTab) {
      if (courtCount[tabItem.label] > 0) {
        tabAct = tabItem.label;
        break;
      }
    }
    if (tabAct === '') {
      this.court.hasCourtData = false;
      tabAct = '判决文书';
    }
    return tabAct;
  }
  @action.bound getReportModule(params) {
    this.isMount = true;
    this.isLoading = true;
    companyHomeApi.getReportModule(params)
      .then(action('get risk data', (resp)=>{
        this.isLoading = false;
        this.court.courtData = resp.data.data.court;
        this.court.tabAct = this.getDefaultCourtTab(resp.data.data.court.countCount);
        this.corpDetailPunish = resp.data.data.corpDetailPunish;
        this.taxList = resp.data.data.taxList;
      }))
      .catch(action('risk error', (error)=>{
        console.log('risk error', error);
        this.isLoading = false;
      }));
  }
  openDetailModal() {
    detailModalStore.openDetailModal((cp)=>{
      require.ensure([], (require)=>{
        cp(
          require('components/companyHome/report/risk/Court/JudgeDoc/DetailCom/Info'),
          require('components/companyHome/report/risk/Court/JudgeDoc/DetailCom/Content')
        );
      });
    }, '法务详情');
  }
  @action.bound getJudgeDetailMonitor(monitorCompanyId, params, info) {
    companyHomeApi.getJudgeDetailMonitor(monitorCompanyId, params)
      .then(action('judeDoc detail', (resp)=>{
        this.court.detailModalData.content = resp.data.detail;
        this.court.detailModalData.info = info;
        this.openDetailModal();
      }))
      .catch((error)=>{
        // window.open(info.url, '_blank');
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
  @action.bound resetData(path, type) {
    let value = '';
    if (type !== 'str') {
      value = type === 'obj' ? {} : [];
    }
    pathval.setPathValue(this, path, value);
  }
  @action.bound resetStore() {
    this.resetData('court.courtData', 'obj');
    this.resetData('court.tabAct', 'str');
    this.resetData('corpDetailPunish', 'obj');
    this.resetData('taxList', 'ary');
    this.court.hasCourtData = true;
    this.isLoading = true;
    this.isMount = false;
  }
}
export default new RiskStore();
