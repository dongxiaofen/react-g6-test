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
      show: {}
    },
    trademarkLists: {
      index: 1,
      size: 10,
    },
    patentLists: {
      index: 1,
      size: 10,
    },
    internetInfo: {
      news: {
        index: 1,
        size: 10,
        type: 'ALL',
      },
      judgeDoc: {
        index: 1,
        size: 10,
        show: observable.map({}),
      }
    }
  };

  @action.bound updateUiStore(keypath, value) {
    pathval.setPathValue(this.uiState, keypath, value);
  }
  @action.bound toggleShowValue(module, rowIdx) {
    const value = this.uiState[module].show.get(rowIdx);
    this.uiState[module].show.set(rowIdx, !value);
  }
}
export default new UiStore();
