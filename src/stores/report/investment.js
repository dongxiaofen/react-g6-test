import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
// import axios from 'axios';

class InvestmentStore {
  @observable isMount = false;
  @observable entData = {};
  @observable frData = {};
  @observable manageData = {};
  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule('investment', params)
      .then(action('get investment', resp => {
        this.entData = {content: resp.data.ent.entinvItemList};
        this.frData = {
          frPositionList: resp.data.fr.frPositionList,
          frinvList: resp.data.fr.frinvList,
        };
        this.manageData = resp.data.managements;
      }))
      .catch(action('get investment', err => {
        this.entData = {error: err.response.data, content: []};
        this.frData = {error: err.response.data, frPositionList: [], frinvList: []};
        this.manageData = {error: err.response.data, content: []};
      }));
  }
}

export default new InvestmentStore();
