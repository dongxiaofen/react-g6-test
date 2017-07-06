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
  @action.bound cancelCollection(companyName) {
    collectionApi.toggleCollection({ companyName, collection: false })
                 .then(action('cancel collection', () => {
                   const collection = uiStore.uiState.collection;
                   const resultContent = this.resultContent;
                   const pageConfig = {
                     companyName: collection.companyName,
                     index: collection.index,
                     size: collection.size
                   };
                   if (resultContent.length === 1 && collection.totalElements !== 1) {
                     collection.index = collection.index - 1;
                   } else {
                     this.getCollectionPage(pageConfig);
                   }
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