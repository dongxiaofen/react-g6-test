import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class AssetsStore {
  @observable trademarkData = [];
  @observable patentData = [];
  @observable biddingData = [];
  @observable isMount = false ;

  @action.bound getReportModule(apiModule, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    companyHomeApi.getReportModule(`operation/${apiModule}`, monitorId, reportId, companyName, companyType)
      .then(action(`get ${apiModule} Data`, (response) => {
        switch (apiModule) {
          case 'patent':
            this.patentData = response.data;
            break;
          case 'trademark':
            console.log(response.data.content);
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
