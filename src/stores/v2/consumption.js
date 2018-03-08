import { observable, action } from 'mobx';
import pathval from 'pathval';
import uiStore from '../ui';
import { comsumptionApi } from 'api';
// import moment from 'moment';
class ConsumptionStore {
  @observable filter = {
    start: '',
    end: '',
  };
  @observable consumptionList = {};
  @observable interfaceType = {
    c1: {
      current: '',
      list: [],
    },
    c2: {
      current: '',
      list: [],
    }
  };

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }
  @action.bound getConsumptionList() {
    this.consumptionList = {};
    const {index, size} = uiStore.uiState.consumptionV2Pager;
    // const params = Object.assign({index, size}, this.filter);
    const params = {index, size};
    comsumptionApi.getConsumptionList(params)
      .then(action('consume-success', ({data}) => {
        if (data.content.length > 0) {
          this.consumptionList = data;
          uiStore.uiState.consumptionV2Pager.totalElements = data.totalElements;
        } else {
          this.consumptionList = {
            content: [],
            error: {message: '您暂未有消费记录'}
          };
        }
      }))
      .catch(action('consume-err', (err) => {
        this.consumptionList = {
          content: [],
          error: {message: err.response.data.message ? err.response.data.message : '您暂未有消费记录'}
        };
      }));
  }
  @action.bound resertFilter() {
    this.filter = {
      start: '',
      end: '',
    };
  }
}
export default new ConsumptionStore();
