import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class AssetsStore {
  @observable trademarkData = [];
  @observable patentData = [];
  @observable biddingData = [];
  @observable isMount = false ;

  @observable trLoading = true;
  @observable patentLoading = true;
  @observable biddingLoading = true;

  @action.bound getReportModule(apiModule, monitorId, reportId, companyName, companyType, pagesInfo) {
    this.isMount = true;
    companyHomeApi.getReportModule(apiModule, monitorId, reportId, companyName, companyType, pagesInfo)
      .then(action(`get ${apiModule} Data`, (response) => {
        switch (apiModule) {
          case 'patent':
            this.patentData = response.data;
            break;
          case 'trademark':
            this.trLoading = false;
            this.trademarkData = response.data.content;
            break;
          case 'bidding':
            this.biddingData = response.data;
            break;
          default:
            break;
        }
      }))
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new AssetsStore();
