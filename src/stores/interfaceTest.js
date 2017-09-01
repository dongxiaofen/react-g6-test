import { observable, action } from 'mobx';
import pathval from 'pathval';
import axios from 'axios';
import { interfaceApi } from 'api';
const crypto = require('crypto');
import __trim from 'lodash/trim';
import messageStore from './message';

class InterfaceTestStore {
  // 重庆誉存大数据科技有限公司
  @observable id = '';
  @observable interfaceInfo = {};
  @observable interfaceType = {};
  @observable apiKey = {};
  @observable isOpenApikey = false;
  @observable apiParams = {}; // {[key]: {value: '', attribute: 'required'}}
  @observable testResult = {};
  @observable isResultLoading = false;
  @observable interfaceTestCancel = null;

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }

  @action.bound getInfoDetail(id) {
    interfaceApi.getInfoDetail(id)
      .then(action('info-success', ({data}) => {
        this.interfaceInfo = {data};
        if (data.apiParams) {
          const params = {};
          data.apiParams.map((key) => {
            const newCont = key.split(':');
            params[__trim(newCont[0])] = {value: '', attribute: __trim(newCont[1])};
          });
          this.apiParams = params;
        } else {
          this.apiParams = {};
        }
      }))
      .catch(action('info-err', (err) => {
        console.log(err, 'info-err');
        this.interfaceInfo = {data: {}, error: {message: '未获取到该接口的相关信息'}};
      }));
  }
  @action.bound getInterfaceType() {
    interfaceApi.getInterfaceType()
      .then(action('type-success', ({data}) => {
        this.interfaceType = data;
      }))
      .catch(action('type-err', () => {
        this.interfaceType = {
          error: {message: '暂无接口分类'}
        };
      }));
  }
  @action.bound getApiKey() {
    interfaceApi.getApiKey()
      .then(action('apiKey', ({data}) => {
        this.apiKey = data;
      }))
      .catch((err) => {
        console.log(err, 'err');
      });
  }
  @action.bound interfaceTest() {
    if (this.interfaceTestCancel) {
      this.interfaceTestCancel();
      this.interfaceTestCancel = null;
    }
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    const getParams = this.getParams();
    console.log(getParams, 'getParams');
    if (!getParams.isSubmit) {
      return false;
    }
    this.isResultLoading = true;
    const {method, uriReg} = this.interfaceInfo.data;
    const headerConfig = this.dealHeaderConfig();
    interfaceApi.interfaceTest(uriReg, method.toLowerCase(), getParams.params, headerConfig, cancelToken)
      .then(action('result-su', ({data}) => {
        this.testResult = {data};
        this.isResultLoading = false;
      }))
      .catch(action('result-err', (err) => {
        // console.log(err.response.data);
        this.testResult = {
          data: err.response.data,
          // error: {message: '暂未获取到内容'}
        };
        this.isResultLoading = false;
      }));
    this.interfaceTestCancel = source.cancel;
  }
  @action.bound dealHeaderConfig() {
    const {method, uriReg} = this.interfaceInfo.data;
    const {apikey, sharedSecret} = this.apiKey;
    const timestamp = new Date().getTime();
    const paramsStr = this.dealParams();
    // const apiToken = method.toLowerCase() + sharedSecret + timestamp + uriReg + paramsStr;
    const encodeApiToken = method.toLowerCase() + sharedSecret + timestamp + uriReg + encodeURI(paramsStr);
    const hashApiToken = crypto.createHash('sha256')
                          .update(encodeApiToken)
                          .digest('hex');
    return {
      'Content-Type': 'application/json',
      'sc-apikey': apikey,
      'sc-timestamp': timestamp,
      'sc-api-token': hashApiToken
    };
  }
  @action.bound dealParams() {
    let paramsStr = '';
    const method = this.interfaceInfo.data.method;
    if (method === 'GET') {
      const paramsArr = Object.keys(this.apiParams);
      if (paramsArr.length > 0) {
        paramsArr.map((item, idx) => {
          if (idx === 0) {
            paramsStr += item + '=' + this.apiParams[item].value;
          } else {
            paramsStr += '&' + item + '=' + this.apiParams[item].value;
          }
        });
      }
    }
    return paramsStr;
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
    this.id = '';
    this.interfaceInfo = {};
    // this.interfaceType = {};
    // this.apiKey = {};
    this.isOpenApikey = false;
    this.apiParams = {};
    this.testResult = {};
    this.isResultLoading = false;
    if (this.interfaceTestCancel) {
      this.interfaceTestCancel();
      this.interfaceTestCancel = null;
    }
  }
}
export default new InterfaceTestStore();
