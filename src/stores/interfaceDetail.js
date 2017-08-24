import { observable, action } from 'mobx';
import pathval from 'pathval';
import { interfaceApi } from 'api';

class InterfaceDetailStore {
  @observable interfaceInfo = {}; // 接口套餐列表
  @observable interfaceType = {};
  @observable myInterface = {};
  @observable interfaceDoc = {};
  @observable isDocLoading = true;
  @observable errorDoc = {};

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }

  @action.bound getInfoDetail(id) {
    interfaceApi.getInfoDetail(id)
      .then(action('info-success', ({data}) => {
        this.interfaceInfo = {data};
        this.getInterfaceDoc(data.docName);
      }))
      .catch(action('info-err', () => {
        this.interfaceInfo = {data: {}, error: {message: '未获取到该接口的相关信息'}};
      }));
  }
  @action.bound getInterfaceType() {
    interfaceApi.getInterfaceType()
      .then(action('type-success', ({data}) => {
        // this.getInterfaceList();
        this.interfaceType = data;
      }))
      .catch(action('type-err', () => {
        // this.getInterfaceList();
        // this.isTypeLoading = false;
        this.interfaceType = {
          error: {message: '暂无接口分类'}
        };
      }));
  }
  @action.bound getMyInterface() {
    interfaceApi.getMyInterface()
      .then(action('myInterface-success', ({data}) => {
        this.myInterface = data;
      }))
      .catch((err) => {
        console.log(err);
        // messageStore.openMessage({type: 'warning', content: '', duration: 5000});
      });
  }
  @action.bound getInterfaceDoc(urlName) {
    if (!this.isDocLoading) {
      this.isDocLoading = true;
    }
    interfaceApi.getInterfaceDoc(urlName)
      .then(action('doc-success', ({data}) => {
        this.interfaceDoc = {data};
        this.isDocLoading = false;
      }))
      .catch(action('doc-err', () => {
        this.isDocLoading = false;
        this.interfaceDoc = {data: '', error: {message: '未获取到该接口的相关文档'}};
      }));
  }
  @action.bound getErrorDoc() {
    interfaceApi.getErrorDoc()
      .then(action('errDoc-su', ({data}) => {
        this.errorDoc = {data};
      }))
      .catch(action('errDoc-err', () => {
        this.errorDoc = {
          data: {},
          error: {message: '暂未获取到错误码'}
        };
      }));
  }
  @action.bound resetData() {
    this.interfaceInfo = {};
    // this.interfaceType = {};
    // this.myInterface = {};
    this.interfaceDoc = {};
    this.isDocLoading = true;
    // this.errorDoc = {};
  }
}
export default new InterfaceDetailStore();
