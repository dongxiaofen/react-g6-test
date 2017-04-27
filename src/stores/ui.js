import { observable, action, reaction } from 'mobx';
import pathval from 'pathval';
import bannerStore from './banner';
import assetsStore from './report/assets';

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
  }

  @observable uiState = {
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
    news: {
      index: 1,
      size: 10,
      type: 'ALL',
    },
    judgeDoc: {
      index: 1,
      size: 10,
      show: observable.map({
        0: false
      }),
    },
    recentRecruitment: {
      index: 1,
      size: 10
    }
  };

  @action.bound updateUiStore(keypath, value) {
    pathval.setPathValue(this.uiState, keypath, value);
  }
  @action.bound toggleExpand(module, rowIdx) {
    console.log(module, rowIdx);
    const value = this.uiState[module].show.get(rowIdx);
    this.uiState[module].show.set(rowIdx, !value);
  }
}
export default new UiStore();
