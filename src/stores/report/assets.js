import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import uiStore from '../ui';

class AssetsStore {
  @observable trademarkData = [];
  @observable patentData = [];
  @observable biddingData = [];
  @observable isMount = false ;

  @observable trLoading = true;
  @observable patentLoading = true;
  @observable biddingLoading = true;

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    const apiArr = [
      {api: 'patent', module: ''},
      {api: 'trademark', module: 'trademarkLists'},
      {api: 'bidding', module: ''}
    ];
    apiArr.map( (apiModule) => {
      companyHomeApi.getReportModule(apiModule.api, monitorId, reportId, companyName, companyType, uiStore.uiState[apiModule.module] ? uiStore.uiState[apiModule.module] : {index: 1, size: 10})
        .then(action(`get ${apiModule.api} Data`, (response) => {
          switch (apiModule.api) {
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
    });
  }
}
export default new AssetsStore();
