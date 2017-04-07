import { observable, action } from 'mobx';
import {companyHomeApi} from 'api';
class CompanyHomeStore {
  @observable companyName = '';
  @action.bound getBannerInfo(monitorId, reportId, companyName, companyType) {
    companyHomeApi.getBannerInfo(monitorId, reportId, companyName, companyType)
      .then(action('get banner info...', (resp) => {
        console.log('banner结果', resp);
        this.companyName = resp.data.name;
      }))
      .catch((err) => {
        console.log('banner出错', err.response);
      });
  }
}
export default new CompanyHomeStore();
