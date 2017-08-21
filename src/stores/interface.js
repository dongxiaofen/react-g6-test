import { observable, action, reaction } from 'mobx';
import pathval from 'pathval';
import { interfaceApi } from 'api';
import uiStore from './ui';
// import messageStore from './message';

class InterfaceStore {
  constructor() {
    reaction(
      () => this.filterInfo.type,
      () => {
        document.body.scrollTop = 0;
        this.getInterfaceList();
      }
    );
  }
  @observable interfaceList = {}; // 接口套餐列表
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
    interfaceApi.getInterfaceList(params)
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

  // @action.bound getInfoDetail(id) {
  //   interfaceApi.getInfoDetail(id)
  //     .then(action('info-success', ({data}) => {
  //
  //     }))
  //     .catch();
  // }
}
export default new InterfaceStore();
