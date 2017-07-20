import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { companyHomeApi } from 'api';
import pathval from 'pathval';
import detailModalStore from '../detailModal';
import companyHomeStore from '../companyHome';
import entireLoadingStore from '../entireLoading';
import uiStore from '../ui';
class RiskCourtStore {
  constructor() {
    this.cancel = {
      judgeDoc: '',
      courtAnnouncement: '',
      courtNotice: '',
    };
  }

  @observable isMount = false;
  @observable court = {
    detailModalData: {
      info: {},
      content: {},
    },
  };

  @observable judgeDocCount = 0;
  @observable courtTabAct = 'judgeDoc';
  @observable courtTab = [
    { key: 'judgeDoc', label: '判决文书' },
    { key: 'courtAnnouncement', label: '法院公告' },
    { key: 'courtNotice', label: '开庭公告' },
    { key: 'courtExecuted', label: '被执行人信息' },
    { key: 'courtDishonesty', label: '失信被执行人信息' },
    { key: 'courtLitigation', label: '涉诉资产' }
  ];

  @observable courtData = {
    judgeDoc: { totalElements: 0, content: [] },
    courtAnnouncement: { totalElements: 0, content: [] },
    courtNotice: { totalElements: 0, content: [] },
    courtExecuted: { totalElements: 0, content: [] },
    courtDishonesty: { totalElements: 0, content: [] },
    courtLitigation: { totalElements: 0, content: [] }
  };

  @computed get courtIsErr() {
    const courtData = this.courtData;
    const dataKeys = Object.keys(courtData);
    return dataKeys.every((key) => {
      return courtData[key].totalElements === 0;
    });
  }

  // 法务信息6个板块的loading
  @observable courtLoadingGroup = {
    judgeDoc: true,
    courtAnnouncement: true,
    courtNotice: true,
    courtExecuted: true,
    courtDishonesty: true,
    courtLitigation: true
  };
  // 法务信息的6个api是否请求回来
  @observable courtIsBackGroup = {
    judgeDoc: false,
    courtAnnouncement: false,
    courtNotice: false,
    courtExecuted: false,
    courtDishonesty: false,
    courtLitigation: false
  };

  @computed get courtIsBack() {
    const courtIsBackGroup = this.courtIsBackGroup;
    const keys = Object.keys(courtIsBackGroup);
    return keys.every((key) => courtIsBackGroup[key] === true);
  }

  // 法务信息前面3个板块的checkBox状态
  @observable courtCheckGroup = {
    judgeDoc: false,
    courtAnnouncement: false,
    courtNotice: false,
  };

  @action.bound getRiskCourt(params) {
    const tabAct = params.tabAct;

    const source = axios.CancelToken.source();
    params.config.cancelToken = source.token;
    if (tabAct === 'judgeDoc' || tabAct === 'courtAnnouncement' || tabAct === 'courtNotice') {
      this.cancel[tabAct] = source.cancel;
    }
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    window.reportSourceCancel.push(source.cancel);

    this.courtLoadingGroup[tabAct] = true;
    companyHomeApi.getRiskCourt({ ...params })
      .then(action('get risk court', (resp) => {
        this.courtData[tabAct].content = resp.data.content;
        this.courtData[tabAct].totalElements = resp.data.totalElements;
        uiStore.uiState[tabAct].totalElements = resp.data.totalElements;
        this.courtLoadingGroup[tabAct] = false;
        this.courtIsBackGroup[tabAct] = true;
      }))
      .catch(action('get risk court catch', (err) => {
        console.log(err);
        this.courtData[tabAct].totalElements = 0;
        this.courtData[tabAct].content = [];
        this.courtLoadingGroup[tabAct] = false;
        this.courtIsBackGroup[tabAct] = true;
      }));
  }

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

  // 获取判决文书总条数
  @action.bound getJudgeDocCount(params) {
    companyHomeApi.getJudgeDocCount({...params})
      .then(action((response) => {
        this.judgeDocCount = response.data;
      })).catch(action((err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getReportModule(params) {
    this.isMount = true;
    this.courtTab.forEach((item) => {
      params.tabAct = item.key;
      params.config = { params: { index: 1, size: 10 } };
      this.getRiskCourt(params);
    });
    this.getJudgeDocCount(params);
  }
  openDetailModal() {
    detailModalStore.openDetailModal((cp) => {
      require.ensure([], (require) => {
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
      .then(action('judeDoc detail', (resp) => {
        this.court.detailModalData.content = resp.data.detail;
        this.court.detailModalData.info = info;
        this.openDetailModal();
        entireLoadingStore.closeEntireLoading();
      }))
      .catch((error) => {
        console.log('risk error', error);
        entireLoadingStore.closeEntireLoading();
      });
  }
  @action.bound updateValue(path, value) {
    pathval.setPathValue(this, path, value);
  }
  @action.bound resetStore() {
    this.cancel = {
      judgeDoc: '',
      courtAnnouncement: '',
      courtNotice: '',
    };

    this.isMount = false;
    this.court = {
      detailModalData: {
        info: {},
        content: {},
      },
    };

    this.courtTabAct = 'judgeDoc';
    this.courtTab = [
      { key: 'judgeDoc', label: '判决文书' },
      { key: 'courtAnnouncement', label: '法院公告' },
      { key: 'courtNotice', label: '开庭公告' },
      { key: 'courtExecuted', label: '被执行人信息' },
      { key: 'courtDishonesty', label: '失信被执行人信息' },
      { key: 'courtLitigation', label: '涉诉资产' }
    ];

    this.courtData = {
      judgeDoc: { totalElements: 0, content: [] },
      courtAnnouncement: { totalElements: 0, content: [] },
      courtNotice: { totalElements: 0, content: [] },
      courtExecuted: { totalElements: 0, content: [] },
      courtDishonesty: { totalElements: 0, content: [] },
      courtLitigation: { totalElements: 0, content: [] }
    };

    // 法务信息6个板块的loading
    this.courtLoadingGroup = {
      judgeDoc: true,
      courtAnnouncement: true,
      courtNotice: true,
      courtExecuted: true,
      courtDishonesty: true,
      courtLitigation: true
    };
    // 法务信息的6个api是否请求回来
    this.courtIsBackGroup = {
      judgeDoc: false,
      courtAnnouncement: false,
      courtNotice: false,
      courtExecuted: false,
      courtDishonesty: false,
      courtLitigation: false
    };

    // 法务信息前面3个板块的checkBox状态
    this.courtCheckGroup = {
      judgeDoc: false,
      courtAnnouncement: false,
      courtNotice: false,
    };
  }
}
export default new RiskCourtStore();
