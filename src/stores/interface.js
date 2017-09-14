import { observable, action } from 'mobx';
import pathval from 'pathval';
import axios from 'axios';
import { interfaceApi } from 'api';
import uiStore from './ui';
// import messageStore from './message';

class InterfaceStore {
  // constructor() {
  //   reaction(
  //     () => this.filterInfo.type,
  //     () => {
  //       document.body.scrollTop = 0;
  //       this.getInterfaceList();
  //     }
  //   );
  // }

  @observable interfaceList = {}; // 接口套餐列表
  @observable interfaceListCancel = null;

  @observable myInterface = {}; // 已有的套餐列表
  @observable interfaceType = {}; // 接口套餐分类
  @observable isTypeLoading = false; // 接口套餐分类加载中
  @observable filterInfo = {
    type: '',
    name: '',
  };

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }

  @action.bound getInterfaceList() {
    this.interfaceList = {};
    const params = Object.assign({}, uiStore.uiState.interfacePager, this.filterInfo);
    if (this.interfaceListCancel) {
      this.interfaceListCancel();
      this.interfaceListCancel = null;
    }
    const source = axios.CancelToken.source();
    interfaceApi.getInterfaceList({params: params, cancelToken: source.token})
      .then(action('获取接口成功', ({data}) => {
        if (data.content.length > 0) {
          uiStore.uiState.interfacePager.totalElements = data.totalElements;
          this.interfaceList = data;
        } else {
          this.interfaceList = {
            content: [],
            error: {message: '暂无接口信息'}
          };
        }
      }))
      .catch(action('获取接口出错', () => {
        this.interfaceList = {
          content: [],
          error: {message: '暂无接口信息'}
        };
      }));
    this.interfaceListCancel = source.cancel;
  }
  @action.bound getInterfaceType() {
    if (!this.isTypeLoading) {
      this.isTypeLoading = true;
    }
    interfaceApi.getInterfaceType()
      .then(action('type-success', ({data}) => {
        // this.getInterfaceList();
        this.interfaceType = {data};
        this.isTypeLoading = false;
      }))
      .catch(action('type-err', () => {
        // this.getInterfaceList();
        this.isTypeLoading = false;
        this.interfaceType = {
          data: {},
          error: {messge: '暂无接口分类'}
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

  @action.bound resetData() {
    this.interfaceList = {};
    this.filterInfo = {
      type: '',
      name: '',
    };
    // this.errorDoc = {};
  }
}
export default new InterfaceStore();
