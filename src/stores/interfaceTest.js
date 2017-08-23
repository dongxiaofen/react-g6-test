import { observable, action } from 'mobx';
import pathval from 'pathval';
import { interfaceApi } from 'api';
const crypto = require('crypto');

class InterfaceTestStore {
  // 重庆誉存大数据科技有限公司
  @observable id = '';
  @observable interfaceInfo = {}; // 接口套餐列表
  @observable interfaceType = {};
  @observable apiKey = {};
  @observable isOpenApikey = false;
  @observable apiParams = {};
  @observable testResult = {};
  @observable isResultLoading = false;

  @action.bound updateValue(changeItem, value) {
    pathval.setPathValue(this, changeItem, value);
  }

  @action.bound getInfoDetail(id) {
    interfaceApi.getInfoDetail(id)
      .then(action('info-success', ({data}) => {
        this.interfaceInfo = {data};
        const params = {};
        data.apiParams.map((key) => {
          params[key] = '';
        });
        this.apiParams = params;
        // this.getInterfaceDoc(data.docName);
      }))
      .catch(action('info-err', () => {
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
    this.isResultLoading = true;
    const {method, uriReg} = this.interfaceInfo.data;
    const {apikey, sharedSecret} = this.apiKey;
    const timestamp = new Date().getTime();
    const paramsStr = this.dealParams();
    const apiToken = method.toLowerCase() + sharedSecret + timestamp + uriReg + paramsStr;
    const hashApiToken = crypto.createHash('sha256')
                          .update(encodeURI(apiToken))
                          .digest('hex');
    const headerConfig = {
      'Content-Type': 'application/json',
      'sc-apikey': apikey,
      'sc-timestamp': timestamp,
      'sc-api-token': hashApiToken
    };
    interfaceApi.interfaceTest(uriReg, method.toLowerCase(), this.apiParams, headerConfig)
      .then(action('result-su', ({data}) => {
        this.testResult = {data};
        // this.testResult = {data: JSON.stringify(data)};
        this.isResultLoading = false;
      }))
      .catch(action('result-err', (err) => {
        console.log(err);
        this.testResult = {
          data: {},
          error: {message: '暂未获取到内容'}
        };
        this.isResultLoading = false;
      }));
  }

  @action.bound dealParams() {
    let paramsStr = '';
    const paramsArr = Object.keys(this.apiParams);
    if (paramsArr.length > 0) {
      paramsArr.map((item, idx) => {
        if (idx === 0) {
          paramsStr += item + '=' + this.apiParams[item];
        } else {
          paramsStr += '&' + item + '=' + this.apiParams[item];
        }
      });
    }
    return paramsStr;
  }
  // @action.bound getMyInterface() {
  //   interfaceApi.getMyInterface()
  //     .then(action('myInterface-success', ({data}) => {
  //       this.myInterface = data;
  //     }))
  //     .catch((err) => {
  //       console.log(err);
  //       // messageStore.openMessage({type: 'warning', content: '', duration: 5000});
  //     });
  // }
  // @action.bound getInterfaceDoc(urlName) {
  //   if (!this.isDocLoading) {
  //     this.isDocLoading = true;
  //   }
  //   interfaceApi.getInterfaceDoc(urlName)
  //     .then(action('doc-success', ({data}) => {
  //       this.interfaceDoc = {data};
  //       this.isDocLoading = false;
  //     }))
  //     .catch(action('doc-err', () => {
  //       this.isDocLoading = false;
  //       this.interfaceDoc = {data: '', error: {message: '未获取到该接口的相关文档'}};
  //     }));
  // }
}
export default new InterfaceTestStore();
