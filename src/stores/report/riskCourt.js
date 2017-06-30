import { observable, action } from 'mobx';
import {companyHomeApi} from 'api';
import pathval from 'pathval';
import detailModalStore from '../detailModal';
import companyHomeStore from '../companyHome';
import entireLoadingStore from '../entireLoading';
class RiskCourtStore {
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
    companyHomeApi.getReportModule('risk', params)
      .then(action('get risk data', (resp)=>{
        this.court.tabAct = this.getDefaultCourtTab(resp.data.countCount);
        this.isLoading = false;
        this.court.courtData = resp.data;
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
          require('components/companyHome/report/riskCourt/JudgeDoc/DetailCom/Info'),
          require('components/companyHome/report/riskCourt/JudgeDoc/DetailCom/Content')
        );
      });
    }, '法务详情');
  }
  // @action.bound getJudgeDetailMonitor(monitorCompanyId, params, info) {
  //   companyHomeApi.getJudgeDetailMonitor(monitorCompanyId, params)
  //     .then(action('judeDoc detail', (resp)=>{
  //       this.court.detailModalData.content = resp.data.detail;
  //       this.court.detailModalData.info = info;
  //       this.openDetailModal();
  //     }))
  //     .catch((error)=>{
  //       // window.open(info.url, '_blank');
  //       console.log('risk error', error);
  //     });
  // }
  @action.bound getJudgeDetailReport(params, info) {
    const reportInfo = companyHomeStore.reportInfo;
    entireLoadingStore.openEntireLoading();
    companyHomeApi.getJudgeDetailReport(reportInfo, params)
      .then(action('judeDoc detail', (resp)=>{
        this.court.detailModalData.content = resp.data.detail;
        this.court.detailModalData.info = info;
        this.openDetailModal();
        entireLoadingStore.closeEntireLoading();
      }))
      .catch((error)=>{
        console.log('risk error', error);
        entireLoadingStore.closeEntireLoading();
      });
  }
  @action.bound updateValue(path, value) {
    pathval.setPathValue(this, path, value);
  }
  @action.bound resetStore() {
    this.court.courtData = {};
    this.court.tabAct = '';
    this.court.hasCourtData = true;
    this.isLoading = true;
    this.isMount = false;
  }
}
export default new RiskCourtStore();
