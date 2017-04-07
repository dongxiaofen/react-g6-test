import { observable, action } from 'mobx';
import * as apis from 'helpers/api';
class SearchCompanyStore {
  @observable searchKey = '';
  @observable searchResult = [];
  @observable loading = false;

  @action.bond getCompanyList() {
    const params = {
      keyWord: this.searchKey,
      type: 'COMPANY_NAME'
    };
    apis.getCompanyList(params)
      .then(action('searchCompany list', (resp) => {
        console.log(resp, '======searchCompany result');
        this.searchResult = resp.data.data;
      }))
      .catch((err) => {
        console.log(err.response, '=====searchCompany error');
      });
  }
}
export default new SearchCompanyStore();
