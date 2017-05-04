import { observable, action } from 'mobx';
import { collectionApi } from 'api';
import uiStore from './ui';
class CollectionStore {
  @observable resultContent = [];
  @observable isLoading = false;
  @observable searchValue = '';

  // 获取收藏列表
  @action.bound getCollectionPage(params) {
    this.isLoading = true;
    collectionApi.getCollectionPage(params)
      .then(action('get collection page', (resp) => {
        this.resultContent = resp.data.content;
        uiStore.uiState.collection.totalElements = resp.data.totalElements;
        this.isLoading = false;
      }))
      .catch((err) => {
        console.log(err.response);
        this.isLoading = false;
      });
  }

  // 取消收藏
  @action.bound cancelCollection(id, productType) {
    collectionApi.cancelCollection(id, productType)
      .then(action('cancel collection', () => {
        const collection = uiStore.uiState.collection;
        this.getCollectionPage({
          companyName: collection.companyName,
          index: collection.index,
          size: collection.size
        });
      }))
      .catch((err) => {
        console.log(err.response);
      });
  }

  // 设置searchValue
  @action.bound setSearchValue(value) {
    this.searchValue = value;
    uiStore.uiState.collection.companyName = value;
  }
}
export default new CollectionStore();
