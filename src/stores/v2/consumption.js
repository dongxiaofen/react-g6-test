import { observable, action } from 'mobx';
import pathval from 'pathval';
import uiStore from '../ui';
import { comsumptionApi, apiTestApi } from 'api';
// import moment from 'moment';
class ConsumptionStore {
  @observable filter = {
    start: '',
    end: '',
  };
  @observable consumptionList = {};
  @observable interfaceType = {
    c1: {
      isLoading: false,
      current: null,
      list: [],
    },
    c2: {
      isLoading: false,
      current: null,
      list: [],
    }
  };
  @observable filterData = {
    type: 'date',
    begin: '',
    end: ''
  }

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }
  @action.bound getAssortmentC1() {
    this.interfaceType.c1.isLoading = true;
    apiTestApi.getAssortmentC1()
      .then(action('get consumptionList', ({data}) => {
        this.interfaceType.c1.isLoading = false;
        if (data && data.length > 0) {
          // this.interfaceType.c1.current = data[1];
          this.interfaceType.c1.list = data;
        }
      }))
      .catch(action('get consumptionList err', (err) => {
        this.interfaceType.c1.isLoading = false;
        console.log(err, '====err====');
      }));
  }
  @action.bound getAssortmentC2(assortmentId) {
    this.interfaceType.c2.isLoading = true;
    const params = {classificationId: assortmentId};
    apiTestApi.getAssortmentC2(params)
      .then(action('get consumptionListc2', ({data}) => {
        this.interfaceType.c2.isLoading = false;
        if (data && data.length > 0) {
          this.interfaceType.c2.list = data;
        }
      }))
      .catch(action('get consumptionListc2 err', (err) => {
        this.interfaceType.c2.isLoading = false;
        console.log(err, '====err====');
      }));
  }
  @action.bound getConsumptionList() {
    this.consumptionList = {};
    const {index, size} = uiStore.uiState.consumptionV2Pager;
    // const params = Object.assign({index, size}, this.filter);
    const params = {index, size};
    if (this.interfaceType.c1.current) {
      params.parentCategoryId = this.interfaceType.c1.current;
    }
    if (this.interfaceType.c2.current) {
      params.categoryId = this.interfaceType.c2.current;
    }
    if (this.filterData.end) {
      params.begin = this.filterData.begin;
      params.end = this.filterData.end;
    }
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
    this.filterData = {
      type: 'date',
      begin: '',
      end: ''
    };
    this.interfaceType.c1.current = '';
    this.interfaceType.c2.current = '';
  }
}
export default new ConsumptionStore();
