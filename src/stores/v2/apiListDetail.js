import { observable, action } from 'mobx';
import pathval from 'pathval';
// import axios from 'axios';
import { apiListDetailApi } from 'api';
class ApiListDetailStore {
  @observable c1Name = ''; // 一级分类name
  @observable classificationId = ''; // 二级分类id
  @observable classificationName = ''; // 二级分类name
  @observable apiList = [];
  @observable isApiListLoading = true;
  @observable activeApiDetail = {}; //当前展示的api
  @observable apiDoc = {};
  @observable isDocLoading = true;
  @observable errorCode = {};

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }
  @action.bound getApiList(apiId) {
    this.isApiListLoading = true;
    apiListDetailApi.getApiList(this.classificationId)
      .then(action('list', ({data}) => {
        this.isApiListLoading = false;
        if (data.length > 0) {
          this.apiList = data;
          if (apiId) {
            const idx = data.findIndex(item => item.id === apiId);
            this.activeApiDetail = data[idx];
          } else {
            this.activeApiDetail = data[0];
          }
          this.getApiDoc();
        } else {
          this.isDocLoading = false;
          this.apiDoc = {content: null, error: {message: '暂无接口文档, 请等待接口完善'}};
        }
      }))
      .catch(action('err', () => {
        this.isApiListLoading = false;
        this.isDocLoading = false;
        this.apiDoc = {content: null, error: {message: '暂无接口文档, 请等待接口完善'}};
      }));
  }
  @action.bound getApiDoc() {
    this.isDocLoading = true;
    const docName = this.activeApiDetail.docName;
    apiListDetailApi.getApiDoc(docName)
      .then(action('doc', ({data}) => {
        this.apiDoc = {content: data};
        this.isDocLoading = false;
      }))
      .catch(action('doc-err', (err) => {
        console.log(err, 'err-获取文档');
        this.isDocLoading = false;
        this.apiDoc = {content: null, error: {message: '暂未获取到接口文档'}};
      }));
  }
  @action.bound getErrorCode() {
    apiListDetailApi.getErrorCode()
      .then(action('code', ({data}) => {
        this.errorCode = {content: data};
      }))
      .catch(action('code-err', () => {
        this.errorCode = {error: {message: '暂无错误码列表'}};
      }));
  }
  @action.bound resetData() {
    this.classificationId = '';
    this.classificationName = '';
    this.apiList = [];
    this.isApiListLoading = true;
    this.activeApiDetail = {};
    this.apiDoc = {};
    this.isDocLoading = true;
    this.errorCode = {};
  }
}
export default new ApiListDetailStore();
