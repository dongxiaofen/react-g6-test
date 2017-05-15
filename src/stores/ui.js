import { observable, action, reaction, extendObservable } from 'mobx';
import pathval from 'pathval';
import bannerStore from './banner';
import assetsStore from './report/assets';
import monitorListStore from './monitorList';
import ruleStore from './rule';
import ruleCompanyStore from './ruleCompany';
import accountSettingStore from './accountSetting';
import alertAnalysisStore from './report/alertAnalysis';
import reportManageStore from './reportManage';
import collectionStore from './collection';
import relPerCheckStore from './report/relPerCheck';
import bidMarketStore from './bidMarket';

class UiStore {
  constructor() {
    reaction(
      () => this.uiState.trademarkLists.index,
      () => {
        const { monitorId, reportId, analysisReportId, companyName, companyType} = bannerStore;
        assetsStore.getTrademarkData({monitorId, reportId, analysisReportId, companyName, companyType});
      }
    );
    reaction(
      () => this.uiState.patentInfo.index,
      () => {
        const {monitorId, reportId, analysisReportId, companyName, companyType} = bannerStore;
        assetsStore.getPatentData({monitorId, reportId, analysisReportId, companyName, companyType});
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
      () => this.uiState.alertAnalysis.index,
      () => {
        const { monitorId, analysisReportId } = bannerStore;
        alertAnalysisStore.getAlertAnalysisList(monitorId, analysisReportId);
      }
    );
    reaction(
      () => this.uiState.ruleListPager.index,
      () => {
        ruleStore.getRuleList();
      }
    );
    reaction(
      () => this.uiState.ruleCompanyListPager.index,
      () => {
        ruleCompanyStore.getCompanyList();
      }
    );
    reaction(
      () => this.uiState.accountAlertCorp.index,
      () => {
        const uId = accountSettingStore.base.data.id;
        accountSettingStore.getAlertCorp(uId);
      }
    );
    reaction(
      () => this.uiState.accountConsume.index,
      () => {
        const uId = accountSettingStore.base.data.id;
        accountSettingStore.getConsume(uId);
      }
    );
    reaction(
      () => this.uiState.accountRecharge.index,
      () => {
        const uId = accountSettingStore.base.data.id;
        accountSettingStore.getRecharge(uId);
      }
    );
    reaction(
      () => this.uiState.accountSummary.index,
      () => {
        const uId = accountSettingStore.base.data.id;
        accountSettingStore.getSummary(uId);
      }
    );
    reaction(
        () => this.uiState.accountLoginRecord.index,
      () => {
        const uId = accountSettingStore.base.data.id;
        accountSettingStore.getLoginRecord(uId);
      }
    );
    reaction(
      () => this.uiState.reportManagePager.index,
      () => {
        if (this.uiState.reportManageList.reportStatus === 'report') {
          reportManageStore.getReportList(this.uiState.reportManagePager);
        } else {
          reportManageStore.getAnalysisReportList(this.uiState.reportManagePager);
        }
      }
    );
    reaction(
      () => this.uiState.collection.index,
      () => {
        const collection = this.uiState.collection;
        collectionStore.getCollectionPage({
          companyName: collection.companyName,
          index: collection.index,
          size: collection.size
        });
      }
    );
    reaction(
      () => this.uiState.relPerCheck.index,
      () => {
        relPerCheckStore.getReportModule(relPerCheckStore.reloadMonitorId);
      }
    );
    reaction(
      () => this.uiState.bidMarketInfo.index,
      () => {
        const params = bidMarketStore.params;
        params.index = this.uiState.bidMarketInfo.index;
        params.size = this.uiState.bidMarketInfo.size;
        bidMarketStore.getInfo(params);
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
    accountAlertCorp: {
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
    ruleListPager: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    ruleCompanyListPager: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    shareholder: {
      index: 1,
      size: 10
    },
    personList: {
      index: 1,
      size: 10
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
    },
    collection: {
      companyName: '',
      index: 1,
      size: 10,
      totalElements: 0, // 服务端分页
    },
    bidMarketInfo: {
      index: 1,
      size: 9,
      totalElements: 0
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
    this.uiState.accountAlertCorp = Object.assign({}, template);
    this.uiState.accountConsume = Object.assign({}, template);
    this.uiState.accountRecharge = Object.assign({}, template);
    this.uiState.accountSummary = Object.assign({}, template);
    this.uiState.accountLoginRecord = Object.assign({}, template);
    this.uiState.relPerCheck = Object.assign({}, template);
  }
  @action.bound resetStore() {
    extendObservable(this, {
      uiState: {
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
        accountAlertCorp: {
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
        relPerCheck: {
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
        ruleListPager: {
          index: 1,
          size: 10,
          show: observable.map({})
        },
        ruleCompanyListPager: {
          index: 1,
          size: 10,
          show: observable.map({})
        },
        shareholder: {
          index: 1,
          size: 10
        },
        personList: {
          index: 1,
          size: 10
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
        },
        collection: {
          companyName: '',
          index: 1,
          size: 10,
          totalElements: 0, // 服务端分页
        },
        bidMarketInfo: {
          index: 1,
          size: 9,
          totalElements: 0
        }
      }
    });
  }
}
export default new UiStore();
