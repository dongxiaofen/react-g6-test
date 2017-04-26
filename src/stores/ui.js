import { observable, action } from 'mobx';
import pathval from 'pathval';

class UiStore {
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
    },
    patentInfo: {
      index: 1,
      size: 10,
      show: observable.map({}),
    },
    internetInfo: {
      news: {
        index: 1,
        size: 10,
        type: 'ALL',
      }
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
    }
  };

  @action.bound updateUiStore(keypath, value) {
    pathval.setPathValue(this.uiState, keypath, value);
  }
  @action.bound toggleExpand(module, rowIdx) {
    const value = this.uiState[module].show.get(rowIdx);
    this.uiState[module].show.set(rowIdx, !value);
  }
}
export default new UiStore();
