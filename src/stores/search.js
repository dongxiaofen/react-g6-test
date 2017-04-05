import { observable, action } from 'mobx';
import axios from 'axios';
// import { browserHistory } from 'react-router';
import * as apis from 'helpers/api';
class SearchStore {
  @observable searchKey = '';
  @observable searchRes = [];
  @observable loading = false;
  // searchRes = observable([]);
  // constructor() {
  //   when(
  //     () => this.isLogin,
  //     () => location.href = 'http://www.baidu.com'
  //   );
  // }
  @observable cancel = []; // 存储axios撤销token

  @action.bound getCompanyList() {
    if (this.loading) {
      this.cancel[this.cancel.length - 1]();
    }
    const params = {
      params: {
        keyWord: this.searchKey,
        type: 'COMPANY_NAME'
      },
      cancelToken: new axios.CancelToken((cancel) => {
        this.cancel.push(cancel);
      })
    };
    this.toggleLoading();
    apis.getCompanyList(params)
      .then(action('searching company...', (resp) => {
        console.log('搜索结果', resp);
        this.searchRes = resp.data.data;
        this.toggleLoading();
      }))
      .catch((err) => {
        this.toggleLoading();
        console.log('搜索出错', err.response);
        // browserHistory.push('/');
      });
  }
  @action.bound combineServerData(data) {
    this.searchKey = data.searchKey;
    this.searchRes = data.searchRes;
  }
  @action.bound toggleLoading() {
    this.loading = !this.loading;
  }
}
export default new SearchStore();
