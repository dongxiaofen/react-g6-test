import { observable, action } from 'mobx';
import pathval from 'pathval';
import { consumeApi, interfaceApi } from 'api';
import uiStore from './ui';

class ConsumeStore {
  @observable consumption = {
    consumptionList: {},
    selectInputTarget: 'id',
    filter: {
      id: '',
      // permissionName: '',
      permissionClassification: '',
      sdkApiRecordParams: '',
      createdTsBegin: '',
      createdTsEnd: '',
    },
  };

  @observable recharge = {
    rechargeList: {},
    filter: {
      createdTsBegin: '',
      createdTsEnd: ''
    },
  }

  @observable interfaceType = {};

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }

  @action.bound getConsumptionList() {
    this.consumption.consumptionList = {};
    const params = Object.assign({}, uiStore.uiState.consumptionPager, this.consumption.filter);
    consumeApi.getConsumptionList(params)
      .then(action('consume-success', ({data}) => {
        if (data.content.length > 0) {
          this.consumption.consumptionList = data;
          uiStore.uiState.consumptionPager.totalElements = data.totalElements;
        } else {
          this.consumption.consumptionList = {
            content: [],
            error: {message: '您暂未有消费记录'}
          };
        }
      }))
      .catch(action('consume-err', (err) => {
        this.consumption.consumptionList = {
          content: [],
          error: {message: err.response.data.message ? err.response.data.message : '您暂未有消费记录'}
        };
      }));
  }

  @action.bound getRechargeList() {
    this.recharge.rechargeList = {};
    const params = Object.assign({}, uiStore.uiState.rechargePager, this.recharge.filter);
    consumeApi.getRechargeList(params)
      .then(action('consume-success', ({data}) => {
        if (data.content.length > 0) {
          this.recharge.rechargeList = data;
          uiStore.uiState.rechargePager.totalElements = data.totalElements;
        } else {
          this.recharge.rechargeList = {
            content: [],
            error: {message: '您暂未有充值记录'}
          };
        }
      }))
      .catch(action('consume-err', (err) => {
        this.recharge.rechargeList = {
          content: [],
          error: {message: err.response.data.message ? err.response.data.message : '您暂未有充值记录'}
        };
      }));
  }

  @action.bound getInterfaceType() {
    interfaceApi.getInterfaceType()
      .then(action('type-success', ({data}) => {
        this.interfaceType = data;
      }))
      .catch(action('type-err', () => {
        this.interfaceType = {};
      }));
  }
}

export default new ConsumeStore();
