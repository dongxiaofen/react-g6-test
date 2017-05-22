import { observable, action, runInAction } from 'mobx';
import { collectionApi } from 'api';
import messageStore from './message';
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
        runInAction(() => {
          this.isLoading = false;
        });
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
        messageStore.openMessage({ content: '取消收藏成功' });
      }))
      .catch(action('cancel collection err', (err) => {
        console.log(err.response);
        messageStore.openMessage({ type: 'warning', content: '取消收藏失败' });
      }));
  }

  // 设置searchValue
  @action.bound setSearchValue(value) {
    this.searchValue = value;
    uiStore.uiState.collection.companyName = value;
  }
}
export default new CollectionStore();
