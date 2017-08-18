import { observable, action, reaction, extendObservable } from 'mobx';
import pathval from 'pathval';
import interfaceStore from './interface';

const initPagerParams = {
  interfacePager: {
    index: 1,
    size: 10,
    totalElements: 0
  },
};
class UiStore {
  constructor() {
    reaction(
      () => this.uiState.interfacePager.index,
      () => {
        document.body.scrollTop = 0;
        interfaceStore.getInterfaceList();
      }
    );
  }
  @observable uiState = initPagerParams;

  @action.bound
  updateUiStore(keypath, value) {
    pathval.setPathValue(this.uiState, keypath, value);
  }

  // @action.bound
  // toggleExpand(module, rowIdx) {
  //   const value = this.uiState[module].show.get(rowIdx);
  //   this.uiState[module].show.set(rowIdx, !value);
  // }

  // @action.bound
  // resetAccountPager() {
  //   const template = {
  //     index: 1,
  //     size: 10,
  //     totalElements: 0
  //   };
  //   this.uiState.accountAlertCorp = Object.assign({}, template);
  //   this.uiState.accountConsume = Object.assign({}, template);
  //   this.uiState.accountRecharge = Object.assign({}, template);
  //   this.uiState.accountSummary = Object.assign({}, template);
  //   this.uiState.accountLoginRecord = Object.assign({}, template);
  //   this.uiState.relPerCheck = Object.assign({}, template);
  // }

  @action.bound
  resetStore() {
    extendObservable(this, {
      uiState: initPagerParams
    });
  }
}
export default new UiStore();
