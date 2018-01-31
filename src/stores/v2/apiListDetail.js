import { observable, action } from 'mobx';
import pathval from 'pathval';
// import axios from 'axios';
import { apiListDetailApi } from 'api';
class ApiListDetailStore {
  @observable classificationId = ''; // 分类id
  @observable classificationName = ''; // 分类name
  @observable apiList = [];
  @observable isApiListLoading = true;
  @observable activeApiDetail = {}; //当前展示的api
  @observable apiDoc = {};
  @observable isDocLoading = true;

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }
  @action.bound getApiList() {
    this.isApiListLoading = true;
    apiListDetailApi.getApiList(this.classificationId)
      .then(action('list', ({data}) => {
        console.log(data);
        // this.apiList = data;
        const list = [
          {
            'applied': 0,
            'chargesType': 'BY_CHARGE',
            'classification': '法务',
            'description': '企业工商数据查询,在该接口中，通过企业关键字精确获取详细信息这个方法，我们区分了三个等级 Basic/Master/Full ，具体差异请查看SDK文档',
            'id': '132456',
            'docName': 'getCourtAnnouncementUsingGET',
            'method': 'get',
            'name': '企业判决文书数据查询1',
            'summary': '企业工商数据查询,在该接口中，通过企业关键字精确获取详细信息这个方法，我们区分了三个等级 Basic/Master/Full ，具体差异请查看SDK文档。'
          }, {
            'applied': 2,
            'chargesType': 'MONTH_CHARGE',
            'classification': '法务',
            'description': '企业工商数据查询,在该接口中，通过企业关键字精确获取详细信息这个方法',
            'id': '56879',
            'docName': 'getCourtAnnouncementUsingGET',
            'method': 'get',
            'name': '企业判决文书数据查询2',
            'summary': '企业工商数据查询, Basic/Master/Full ，具体差异请查看SDK文档。'
          }
        ];
        this.apiList = list;
        this.activeApiDetail = list[0];
        this.isApiListLoading = false;
      }))
      .catch(action('err', () => {
        this.isApiListLoading = false;
      }));
  }
  @action.bound getApiDoc(docName) {
    this.isDocLoading = true;
    apiListDetailApi.getApiDoc(docName)
      .then(action('doc', ({data}) => {
        this.apiDoc = {content: data};
        this.isDocLoading = false;
      }))
      .catch(action('doc-err', () => {
        this.isDocLoading = false;
        this.apiDoc = {content: null, error: {message: '暂未获取到接口文档'}};
      }));
  }
  @action.bound resetData() {
    this.classificationId = '';
    this.apiList = [];
    this.isApiListLoading = true;
  }
}
export default new ApiListDetailStore();
