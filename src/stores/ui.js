import { observable, action, reaction } from 'mobx';
import pathval from 'pathval';
import bannerStore from './banner';
import assetsStore from './report/assets';
import monitorListStore from './monitorList';
import accountSettingStore from './accountSetting';
import reportManageStore from './reportManage';

class UiStore {
  constructor() {
    reaction(
      () => this.uiState.trademarkLists.index,
      () => {
        const {monitorId, reportId, companyName, companyType} = bannerStore;
        assetsStore.getTrademarkData(monitorId, reportId, companyName, companyType);
      }
    );
    reaction(
      () => this.uiState.patentInfo.index,
      () => {
        const {monitorId, reportId, companyName, companyType} = bannerStore;
        assetsStore.getPatentData(monitorId, reportId, companyName, companyType);
      }
    );
    reaction(
      () => this.uiState.monitorListPager.index,
      () => {
        document.body.scrollTop = 0;
        monitorListStore.getMainList();
      }
    );
    reaction(
      () => this.uiState.accountConsume.index,
      () => {
        accountSettingStore.getConsume();
      }
    );
    reaction(
      () => this.uiState.accountRecharge.index,
      () => {
        accountSettingStore.getRecharge();
      }
    );
    reaction(
      () => this.uiState.accountSummary.index,
      () => {
        accountSettingStore.getSummary();
      }
    );
    reaction(
      () => this.uiState.accountLoginRecord.index,
      () => {
        accountSettingStore.getLoginRecord();
      }
    );
    reaction(
      () => this.uiState.reportManagePager.index,
      () => {
        pathval.setPathValue(reportManageStore, 'list', {});
        reportManageStore.getReportList(this.uiState.reportManagePager);
      }
    );
  }

  @observable uiState = {
    monitorList: {
      searchInput: '',
      sortDirection: {
        start_tm: 'DESC',
        expire_dt: 'DESC',
        latestTs: 'DESC',
      },
      params: {
        companyName: '',
        sort: 'start_tm,DESC',
        monitorStatus: '',
      }
    },
    monitorListPager: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    accountConsume: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    accountRecharge: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    accountSummary: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    accountLoginRecord: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    alertAnalysis: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    shareholder: {
      index: 1,
      size: 4
    },
    personList: {
      index: 1,
      size: 4
    },
    filiationList: {
      index: 1,
      size: 10
    },
    entinvItemLists: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    frinvList: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    frPositionList: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    alterList: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    yearInvestor: {
      index: 1,
      size: 10,
    },
    yearWebsite: {
      index: 1,
      size: 10,
    },
    yearEquityChange: {
      index: 1,
      size: 10,
    },
    yearChangeRecords: {
      index: 1,
      size: 10,
    },
    trademarkLists: {
      index: 1,
      size: 10,
      totalElements: 0, // 服务端分页
    },
    patentInfo: {
      index: 1,
      size: 10,
      totalElements: 0, // 服务端分页
      show: observable.map({}),
    },
    judgeDoc: {
      index: 1,
      size: 10,
      show: observable.map({}),
    },
    courtAnnouncement: {
      index: 1,
      size: 10,
      show: observable.map({}),
    },
    courtNotice: {
      index: 1,
      size: 10,
      show: observable.map({}),
    },
    courtExecution: {
      index: 1,
      size: 10,
    },
    dishonestyList: {
      index: 1,
      size: 10,
      show: observable.map({}),
    },
    litigationAssets: {
      index: 1,
      size: 10,
      show: observable.map({}),
    },
    jyErrorData: {
      index: 1,
      size: 10,
      show: observable.map({}),
    },
    checkMessage: {
      index: 1,
      size: 10,
      show: observable.map({}),
    },
    taxPublicInfo: {
      index: 1,
      size: 10,
      show: observable.map({}),
    },
    news: {
      index: 1,
      size: 10,
      type: 'ALL',
    },
    biddingList: {
      index: 1,
      size: 10,
    },
    recentRecruitment: {
      index: 1,
      size: 10
    },
    reportManageList: {
      reportStatus: 'report',
    },
    reportManagePager: {
      index: 1,
      size: 10,
      totalElements: 0, // 服务端分页
    },
    relPerCheck: {
      index: 1,
      size: 10,
      totalElements: 0, // 服务端分页
    },
    stockShareHolder: {
      index: 1,
      size: 10
    },
    stockCirculateShareHolder: {
      index: 1,
      size: 10
    },
    stockManagement: {
      index: 1,
      size: 20
    },
    stockAnnouncement: {
      index: 1,
      size: 10
    },
    personBlacklist: {
      index: 1,
      size: 10
    },
    executed: {
      index: 1,
      size: 10
    },
    dishonesty: {
      index: 1,
      size: 5
    }
  };

  @action.bound updateUiStore(keypath, value) {
    pathval.setPathValue(this.uiState, keypath, value);
  }
  @action.bound toggleExpand(module, rowIdx) {
    const value = this.uiState[module].show.get(rowIdx);
    this.uiState[module].show.set(rowIdx, !value);
  }
  @action.bound resetAccountPager() {
    const template = {
      index: 1,
      size: 10,
      totalElements: 0,
    };
    this.uiState.accountConsume = Object.assign({}, template);
    this.uiState.accountRecharge = Object.assign({}, template);
    this.uiState.accountSummary = Object.assign({}, template);
    this.uiState.accountLoginRecord = Object.assign({}, template);
  }
}
export default new UiStore();
