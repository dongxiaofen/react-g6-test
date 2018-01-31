import { observable, action, reaction, extendObservable } from 'mobx';
import pathval from 'pathval';
import interfaceStore from './v1/interface';
import consumeStore from './v1/consume';
import accountStore from './v1/account';
import introduceStore from './v2/introduce';

const initPagerParams = {
  // v1
  interfacePager: {
    index: 1,
    size: 15,
    totalElements: 0
  },
  consumptionPager: {
    index: 1,
    size: 10,
    totalElements: 0
  },
  rechargePager: {
    index: 1,
    size: 10,
    totalElements: 0
  },
  accountSafe: {
    index: 1,
    size: 10,
    totalElements: 0
  },
  // v2
  introducePager: {
    index: 1,
    size: 15,
    totalElements: 0
  },
};
class UiStore {
  constructor() {
    // v1
    reaction(
      () => this.uiState.interfacePager.index,
      () => {
        document.body.scrollTop = 0;
        interfaceStore.getInterfaceList();
      }
    );
    reaction(
      () => this.uiState.consumptionPager.index,
      () => {
        document.body.scrollTop = 0;
        consumeStore.getConsumptionList();
      }
    );
    reaction(
      () => this.uiState.rechargePager.index,
      () => {
        document.body.scrollTop = 0;
        consumeStore.getRechargeList();
      }
    );
    reaction(
      () => this.uiState.accountSafe.index,
      () => {
        document.body.scrollTop = 0;
        accountStore.getResetApiList();
      }
    );
    // v2
    reaction(
      () => this.uiState.introducePager.index,
      () => {
        document.body.scrollTop = 0;
        introduceStore.getAssortmentC2();
      }
    );
  }
  @observable uiState = initPagerParams;

  @action.bound
  updateUiStore(keypath, value) {
    pathval.setPathValue(this.uiState, keypath, value);
  }

  @action.bound
  resetStore() {
    extendObservable(this, {
      uiState: initPagerParams
    });
  }
}
export default new UiStore();
