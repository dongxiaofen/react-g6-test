import { observable, action } from 'mobx';
import pathval from 'pathval';
import uiStore from '../ui';
import { rechargeApi } from 'api';
// import moment from 'moment';
class RechargeStore {
  @observable filter = {
    start: '',
    end: '',
  };
  @observable rechargeList = {};

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }
  @action.bound getRechargeList() {
    this.rechargeList = {};
    const params = Object.assign({}, uiStore.uiState.rechargeV2Pager, this.filter);
    rechargeApi.getRechargeList(params)
      .then(action('consume-success', ({data}) => {
        if (data.content.length > 0) {
          this.rechargeList = data;
          uiStore.uiState.rechargeV2Pager.totalElements = data.totalElements;
        } else {
          this.rechargeList = {
            content: [],
            error: {message: '您暂未有充值记录'}
          };
        }
      }))
      .catch(action('consume-err', (err) => {
        this.rechargeList = {
          content: [],
          error: {message: err.response.data.message ? err.response.data.message : '您暂未有充值记录'}
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
export default new RechargeStore();
