import { observable, action } from 'mobx';
import pathval from 'pathval';
import axios from 'axios';
import { introduceApi } from 'api';
import uiStore from '../ui';
// import messageStore from './message';

class IntroduceStore {
  @observable assortment = {};
  @observable isAssortmentLoading = true;
  @observable list = {};
  @observable isListLoading = true;
  @observable listCancel = null;
  @observable filterInfo = {
    id: '',
    keyword: '',
    applied: 'ALL',
  };

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }

  @action.bound getAssortment() {
    this.isAssortmentLoading = true;
    introduceApi.getAssortment()
      .then(action('Assortment', ({data}) => {
        this.isAssortmentLoading = false;
        this.assortment = {content: data};
      }))
      .catch(action('assortment-err', () => {
        this.isAssortmentLoading = false;
        this.assortment = {content: [], error: {message: '暂无分类列表'}};
      }));
  }
  @action.bound getAssortmentC2() {
    const {index, size} = uiStore.uiState.introducePager;
    const params = Object.assign({index, size}, this.filterInfo);
    this.list = {};
    this.isListLoading = true;
    if (this.listCancel) {
      this.listCancel();
      this.listCancel = null;
    }
    const source = axios.CancelToken.source();
    introduceApi.getAssortmentC2({params: params, cancelToken: source.token})
      .then(action('list', ({data}) => {
        if (data.content.length > 0) {
          this.list = data;
          uiStore.uiState.introducePager.totalElements = data.totalElements;
        } else {
          this.list = {
            content: [],
            error: {message: '暂无分类信息!'},
          };
        }
        this.isListLoading = false;
      }))
      .catch(action('list-err', () => {
        this.list = {
          content: [],
          error: {message: '暂未获取到分类信息'}
        };
        this.isListLoading = false;
      }));
    this.listCancel = source.cancel;
  }

  @action.bound resetData() {
    this.assortment = {};
    this.isAssortmentLoading = true;
    this.list = {};
    this.isListLoading = true;
    this.listCancel = null;
    this.filterInfo = {
      id: '',
      keyword: '',
      applied: 'ALL',
    };
  }
}
export default new IntroduceStore();
