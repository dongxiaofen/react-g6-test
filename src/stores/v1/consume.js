import { observable, action, reaction } from 'mobx';
import pathval from 'pathval';
import { consumeApi, interfaceApi } from 'api';
import uiStore from '../ui';
import moment from 'moment';
class ConsumeStore {
  constructor() {
    reaction(
      () => this.consumption.mothFilter,
      () => {
        document.body.scrollTop = 0;
        // interfaceStore.getInterfaceList();
        this.handleTime('consumption');
      }
    );
    reaction(
      () => this.recharge.mothFilter,
      () => {
        document.body.scrollTop = 0;
        this.handleTime('recharge');
        // interfaceStore.getInterfaceList();
      }
    );
  }
  @observable consumption = {
    consumptionList: {},
    selectInputTarget: 'id',
    mothFilter: '',
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
    mothFilter: '',
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

  @action.bound handleTime(type) {
    const mothFilter = pathval.getPathValue(this, `${type}.mothFilter`);
    const today = new Date();
    let end = moment(today).format('YYYY-MM-DD');
    let start;
    switch (mothFilter) {
      case 'all':
        start = '';
        end = '';
        break;
      case 'year':
        start = moment(new Date(today.getTime() - 365 * 24 * 3600 * 1000)).format('YYYY-MM-DD');
        break;
      case 'six':
        start = moment(new Date(today.getTime() - 183 * 24 * 3600 * 1000)).format('YYYY-MM-DD');
        break;
      case 'three':
        start = moment(new Date(today.getTime() - 90 * 24 * 3600 * 1000)).format('YYYY-MM-DD');
        break;
      case 'two':
        start = moment(new Date(today.getTime() - 60 * 24 * 3600 * 1000)).format('YYYY-MM-DD');
        break;
      case 'one':
        start = moment(new Date(today.getTime() - 30 * 24 * 3600 * 1000)).format('YYYY-MM-DD');
        break;
      default:
        start = '';
        end = '';
    }
    pathval.setPathValue(this, `${type}.filter.createdTsBegin`, start);
    pathval.setPathValue(this, `${type}.filter.createdTsEnd`, end);
    if (type === 'consumption') {
      // this.getConsumptionList();
      if (uiStore.uiState.consumptionPager.index === 1) {
        this.getConsumptionList();
      } else {
        uiStore.updateUiStore('consumptionPager.index', 1);
      }
    } else {
      if (uiStore.uiState.rechargePager.index === 1) {
        this.getRechargeList();
      } else {
        uiStore.updateUiStore('rechargePager.index', 1);
      }
    }
  }
}

export default new ConsumeStore();
