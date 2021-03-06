import { observable, action, reaction, extendObservable } from 'mobx';
import pathval from 'pathval';
import interfaceStore from './v1/interface';
import consumeStore from './v1/consume';
import accountStore from './v1/account';
import introduceStore from './v2/introduce';
import consumptionStore from './v2/consumption';
import rechargeStore from './v2/recharge';
import safeStore from './v2/safe';
import myInterfaceStore from './v2/myApi';

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
  accountWhiteListPager: {
    index: 1,
    size: 10,
    totalElements: 0
  },
  // v2
  introducePager: {
    index: 1,
    size: 10,
    totalElements: 0
  },
  consumptionV2Pager: {
    index: 1,
    size: 10,
    totalElements: 0
  },
  rechargeV2Pager: {
    index: 1,
    size: 10,
    totalElements: 0
  },
  safePager: {
    index: 1,
    size: 10,
    totalElements: 0
  },
  safeWhiteListPager: {
    index: 1,
    size: 10,
    totalElements: 0
  },
  myInterfaceV2Pager: {
    index: 1,
    size: 10,
    totalElements: 0
  }
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
    reaction(
      () => this.uiState.accountWhiteListPager.index,
      () => {
        document.body.scrollTop = 0;
        accountStore.getWhiteList();
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
    reaction(
      () => this.uiState.consumptionV2Pager.index,
      () => {
        document.body.scrollTop = 0;
        consumptionStore.getConsumptionList();
      }
    );
    reaction(
      () => this.uiState.rechargeV2Pager.index,
      () => {
        document.body.scrollTop = 0;
        rechargeStore.getRechargeList();
      }
    );
    reaction(
      () => this.uiState.safePager.index,
      () => {
        document.body.scrollTop = 0;
        safeStore.getResetApiList();
      }
    );
    reaction(
      () => this.uiState.safeWhiteListPager.index,
      () => {
        document.body.scrollTop = 0;
        safeStore.getWhiteList();
      }
    );
    reaction(
      () => this.uiState.myInterfaceV2Pager.index,
      () => {
        document.body.scrollTop = 0;
        myInterfaceStore.getMyInterface();
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
