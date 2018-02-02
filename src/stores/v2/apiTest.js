import { observable, action } from 'mobx';
import pathval from 'pathval';
import { apiTestApi } from 'api';
import __trim from 'lodash/trim';
import messageStore from '../message';

class ApiTestStore {
  @observable c1Name = ''; // 一级分类name - from location
  @observable c2Id = ''; // 二级分类id - from location
  @observable classificationId = ''; // 接口id - from location

  @observable assortmentC1 = []; // 一级分类列表
  @observable activeC1Id = '';
  @observable assortmentC2 = []; // 二级分类列表
  @observable activeC2Id = '';
  @observable apiList = []; // 接口列表
  @observable activeApiId = '';
  @observable apiInfo = {}; // 接口详情
  @observable isInfoLoading = true;
  @observable apiParams = {}; // {params: {value: '', attribute: 'required'}}
  @observable apiKey = {};
  @observable isOpenApikey = false;
  @observable scToken = '';

  @observable testResult = {};
  @observable isResultLoading = false;

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }
  @action.bound getAssortmentC1() {
    apiTestApi.getAssortmentC1()
      .then(action(({data}) => {
        this.assortmentC1 = data;
        let activeC1;
        if (this.c1Name) {
          data.map(item => {
            if (item.name === this.c1Name) {
              activeC1 = item;
            }
          });
        } else {
          activeC1 = data[0];
        }
        this.activeC1Id = activeC1.id;
        this.getAssortmentC2();
      }))
      .catch();
  }
  @action.bound getAssortmentC2() {
    apiTestApi.getAssortmentC2({classificationId: this.activeC1Id})
      .then(action(({data}) => {
        this.assortmentC2 = data;
        if (!this.c2Id) {
          this.activeC2Id = data[0].id;
          this.getApiList();
        }
      }))
      .catch();
  }
  @action.bound getApiList() {
    apiTestApi.getApiList(this.activeC2Id)
      .then(action(({data}) => {
        this.apiList = data;
        if (!this.classificationId) {
          this.activeApiId = data[0].id;
          this.getApiInfo();
        }
      }))
      .catch();
  }
  @action.bound getApiInfo() {
    this.isInfoLoading = true;
    apiTestApi.getApiInfo(this.activeApiId)
      .then(action(({data}) => {
        this.apiInfo = data;
        this.isInfoLoading = false;
        this.getApiParams(data.params);
      }))
      .catch(action(() => {
        this.isInfoLoading = false;
        this.apiInfo = {error: {message: '暂无接口信息'}};
      }));
  }
  @action.bound getApiParams(apiParams) {
    const params = {};
    apiParams.map((key) => {
      const newCont = key.split(':');
      params[__trim(newCont[0])] = {value: '', attribute: __trim(newCont[1])};
    });
    this.apiParams = params;
  }
  @action.bound getApiKey() {
    apiTestApi.getApiKey()
      .then(action(({data}) => {
        this.apiKey = data;
        this.getScToken({apikey: data.apikey, searedSecret: data.sharedSecret});
      }))
      .catch();
  }
  @action.bound getScToken = (params) => {
    apiTestApi.getScToken(params)
      .then(action(({data}) => {
        this.scToken = data.data['sc-api-token'];
      }))
      .catch();
  }
  @action.bound handleTestApi() {
    if (this.isResultLoading) {
      return false;
    }
    const apiParams = this.getParams();
    if (apiParams.isSubmit) {
      const {method, url} = this.apiInfo;
      this.isResultLoading = true;
      apiTestApi.interfaceTest(url, method.toLowerCase(), apiParams.params, {'sc-api-token': this.scToken})
        .then(action(({data}) => {
          this.testResult = {data};
          this.isResultLoading = false;
        }))
        .catch(action((err) => {
          this.testResult = {data: err.response.data};
          this.isResultLoading = false;
        }));
    }
  }
  @action.bound getParams() {
    let isSubmit = true;
    const newParams = {};
    const apiParams = this.apiParams;
    const arrParams = Object.keys(apiParams);
    if (arrParams.length > 0) {
      arrParams.map((item) => {
        if (apiParams[item].attribute === 'required' && apiParams[item].value === '') {
          messageStore.openMessage({type: 'warning', content: `${item} 为必填参数`, duration: 3000});
          isSubmit = false;
          return {isSubmit};
        }
        newParams[item] = apiParams[item].value;
      });
    }
    return {params: newParams, isSubmit: isSubmit};
  }
  @action.bound resetData() {
    this.c1Name = '';
    this.c2Id = '';
    this.classificationId = '';
    this.assortmentC1 = [];
    this.activeC1Id = '';
    this.assortmentC2 = [];
    this.activeC2Id = '';
    this.apiList = [];
    this.activeApiId = '';
    this.apiInfo = {};
    this.isInfoLoading = true;
    this.apiParams = {};
    this.apiKey = {};
    this.isOpenApikey = false;
    this.scToken = '';
    this.testResult = {};
    this.isResultLoading = false;
  }
}
export default new ApiTestStore();
