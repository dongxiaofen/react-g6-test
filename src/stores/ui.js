import { observable, action } from 'mobx';
import pathval from 'pathval';

class UiStore {
  @observable uiState = {
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
      show: {}
    }
  };

  @action.bound updateUiStore(keypath, value) {
    pathval.setPathValue(this.uiState, keypath, value);
  }
}
export default new UiStore();
