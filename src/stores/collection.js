import { observable, action } from 'mobx';
import { collectionApi } from 'api';
class CollectionStore {
  @observable resultContent = [];
  @observable isLoading = false;

  // 获取收藏列表
  @action.bound getCollectionPage() {
    this.isLoading = true;
    collectionApi.getCollectionPage()
      .then(action('get collection page', (resp) => {
        this.resultContent = resp.data.content;
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
        this.getCollectionPage();
      }))
      .catch((err) => {
        console.log(err.response);
      });
  }
}
export default new CollectionStore();
