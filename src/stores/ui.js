import { observable, action, reaction, extendObservable } from 'mobx';
import pathval from 'pathval';
import companyHomeStore from './companyHome';
import assetsStore from './report/assets';
import reportListStore from './reportList';
import analysisListStore from './analysisList';
import monitorListStore from './monitorList';
import ruleListStore from './ruleList';
import ruleCompanyStore from './ruleCompany';
import accountSettingStore from './accountSetting';
import alertAnalysisStore from './report/alertAnalysis';
import monitorAlertStore from './report/monitorAlert';
import collectionStore from './collection';
import relPerCheckStore from './relPerCheck';
import nowRecordStore from './report/nowRecord';
import taxCheckStore from './taxCheck';
import bidMarketStore from './bidMarket';
import assetTransactionStore from './assetTransaction';
import riskCourtStore from './report/riskCourt';

class UiStore {
  constructor() {
    reaction(
      () => this.uiState.trademarkLists.index,
      () => {
        const reportInfo = companyHomeStore.reportInfo;
        assetsStore.getTrademarkData(reportInfo);
      }
    );
    reaction(
      () => this.uiState.patentInfo.index,
      () => {
        const reportInfo = companyHomeStore.reportInfo;
        assetsStore.getPatentData(reportInfo);
      }
    );
    reaction(
      () => this.uiState.basicReportPager.index,
      () => {
        document.body.scrollTop = 0;
        reportListStore.getReportList();
      }
    );
    reaction(
      () => this.uiState.advancedReportPager.index,
      () => {
        document.body.scrollTop = 0;
        reportListStore.getReportList();
      }
    );
    reaction(
      () => this.uiState.multiAnalysisPager.index,
      () => {
        document.body.scrollTop = 0;
        analysisListStore.getAnalysisList();
      }
    );
    reaction(
      () => this.uiState.profitAnalysisPager.index,
      () => {
        document.body.scrollTop = 0;
        analysisListStore.getAnalysisList();
      }
    );
    reaction(
      () => this.uiState.operateAnalysisPager.index,
      () => {
        document.body.scrollTop = 0;
        analysisListStore.getAnalysisList();
      }
    );
    reaction(
      () => this.uiState.developAnalysisPager.index,
      () => {
        document.body.scrollTop = 0;
        analysisListStore.getAnalysisList();
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
        alertAnalysisStore.getReportModule(companyHomeStore.reportInfo);
      }
    );
    reaction(
      () => this.uiState.monitorAlert.index,
      () => {
        monitorAlertStore.getReportModule(companyHomeStore.reportInfo);
      }
    );
    reaction(
      () => this.uiState.ruleListPager.index,
      () => {
        ruleListStore.getRuleTypeList();
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
        if (uId) {
          accountSettingStore.getAlertCorp(uId);
        }
      }
    );
    reaction(
      () => this.uiState.nowRecordPager.index,
      () => {
        nowRecordStore.getNowRecordList();
      }
    );
    reaction(
      () => this.uiState.taxCheckPager.index,
      () => {
        taxCheckStore.getReportModule();
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
    reaction(
      () => this.uiState.assetLocal.index,
      () => {
        const params = assetTransactionStore.assetLocalParams;
        params.index = this.uiState.assetLocal.index;
        params.size = this.uiState.assetLocal.size;
        assetTransactionStore.getAssetLocal(params);
      }
    );
    // 判决文书
    reaction(
      () => this.uiState.judgeDoc.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.uiState.judgeDoc.index,
              size: this.uiState.judgeDoc.size,
              finance: riskCourtStore.courtCheckGroup.judgeDoc
            }
          }
        };
        riskCourtStore.getRiskCourt(params);
      }
    );
    // 法院公告
    reaction(
      () => this.uiState.courtAnnouncement.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.uiState.courtAnnouncement.index,
              size: this.uiState.courtAnnouncement.size,
              finance: riskCourtStore.courtCheckGroup.courtAnnouncement
            }
          }
        };
        riskCourtStore.getRiskCourt(params);
      }
    );
    // 开庭公告
    reaction(
      () => this.uiState.courtNotice.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.uiState.courtNotice.index,
              size: this.uiState.courtNotice.size,
              finance: riskCourtStore.courtCheckGroup.courtNotice
            }
          }
        };
        riskCourtStore.getRiskCourt(params);
      }
    );
    // 被执行人信息
    reaction(
      () => this.uiState.courtExecuted.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.uiState.courtExecuted.index,
              size: this.uiState.courtExecuted.size
            }
          }
        };
        riskCourtStore.getRiskCourt(params);
      }
    );
    // 失信被执行人信息
    reaction(
      () => this.uiState.courtDishonesty.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.uiState.courtDishonesty.index,
              size: this.uiState.courtDishonesty.size
            }
          }
        };
        riskCourtStore.getRiskCourt(params);
      }
    );
    // 涉诉资产
    reaction(
      () => this.uiState.courtLitigation.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.uiState.courtLitigation.index,
              size: this.uiState.courtLitigation.size
            }
          }
        };
        riskCourtStore.getRiskCourt(params);
      }
    );
  }

  @observable uiState = {
    basicReportPager: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    advancedReportPager: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    multiAnalysisPager: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    profitAnalysisPager: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    operateAnalysisPager: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    developAnalysisPager: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
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
    monitorAlert: {
      index: 1,
      size: 10,
      totalElements: 0,
    },
    ruleListPager: {
      index: 1,
      size: 10,
      // show: observable.map({})
    },
    ruleCompanyListPager: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    nowRecordPager: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    taxCheckPager: {
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
      size: 10,
      // show: observable.map({})
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
    sharesFrostListItemLists: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    sharesTransferListItemLists: {
      index: 1,
      size: 10,
      show: observable.map({})
    },
    sharesImpawnListItemLists: {
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
      totalElements: 0
    },
    courtAnnouncement: {
      index: 1,
      size: 10,
      show: observable.map({}),
      totalElements: 0
    },
    courtNotice: {
      index: 1,
      size: 10,
      show: observable.map({}),
      totalElements: 0
    },
    courtExecuted: {
      index: 1,
      size: 10,
      totalElements: 0
    },
    courtDishonesty: {
      index: 1,
      size: 10,
      show: observable.map({}),
      totalElements: 0
    },
    courtLitigation: {
      index: 1,
      size: 10,
      show: observable.map({}),
      totalElements: 0
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
    illegalRecord: {
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
    },
    assetLocal: {
      index: 1,
      size: 10,
      totalElements: 0
    },
    biddingStatistic: {
      index: 1,
      size: 10
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
        basicReportPager: {
          index: 1,
          size: 10,
          totalElements: 0,
        },
        advancedReportPager: {
          index: 1,
          size: 10,
          totalElements: 0,
        },
        multiAnalysisPager: {
          index: 1,
          size: 10,
          totalElements: 0,
        },
        profitAnalysisPager: {
          index: 1,
          size: 10,
          totalElements: 0,
        },
        operateAnalysisPager: {
          index: 1,
          size: 10,
          totalElements: 0,
        },
        developAnalysisPager: {
          index: 1,
          size: 10,
          totalElements: 0,
        },
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
        monitorAlert: {
          index: 1,
          size: 10,
          totalElements: 0,
        },
        ruleListPager: {
          index: 1,
          size: 10,
          // show: observable.map({})
        },
        ruleCompanyListPager: {
          index: 1,
          size: 10,
          show: observable.map({})
        },
        nowRecordPager: {
          index: 1,
          size: 10,
          show: observable.map({})
        },
        taxCheckPager: {
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
          size: 10,
          // show: observable.map({})
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
        sharesFrostListItemLists: {
          index: 1,
          size: 10,
          show: observable.map({})
        },
        sharesTransferListItemLists: {
          index: 1,
          size: 10,
          show: observable.map({})
        },
        sharesImpawnListItemLists: {
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
          totalElements: 0
        },
        courtAnnouncement: {
          index: 1,
          size: 10,
          show: observable.map({}),
          totalElements: 0
        },
        courtNotice: {
          index: 1,
          size: 10,
          show: observable.map({}),
          totalElements: 0
        },
        courtExecuted: {
          index: 1,
          size: 10,
          totalElements: 0
        },
        courtDishonesty: {
          index: 1,
          size: 10,
          show: observable.map({}),
          totalElements: 0
        },
        courtLitigation: {
          index: 1,
          size: 10,
          show: observable.map({}),
          totalElements: 0
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
        illegalRecord: {
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
        },
        assetLocal: {
          index: 1,
          size: 10,
          totalElements: 0
        },
        biddingStatistic: {
          index: 1,
          size: 10
        }
      }
    });
  }
}
export default new UiStore();
