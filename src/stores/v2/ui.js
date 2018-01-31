import { observable, action, reaction, extendObservable } from 'mobx';
import pathval from 'pathval';
import introduceStore from './introduce';
// import consumeStore from './consume';
// import accountStore from './account';

const initPagerParams = {
  introducePager: {
    index: 1,
    size: 15,
    totalElements: 0
  },
};
class UiStore {
  constructor() {
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
