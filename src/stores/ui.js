import { observable, action, reaction, extendObservable } from 'mobx';
import pathval from 'pathval';
import interfaceStore from './interface';
import consumeStore from './consume';

const initPagerParams = {
  interfacePager: {
    index: 1,
    size: 20,
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
