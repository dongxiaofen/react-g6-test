import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class RiskTaxStore {
  @observable isMount = false;
  @observable taxData ={};

  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule('taxation', params)
      .then(action('get risk tax', resp => {
        const noData = {content: [], error: {message: '暂无信息'}};
        const taxNoData = !resp.data || !resp.data.data || resp.data.data.length === 0;
        this.taxData = taxNoData ? noData : {content: resp.data.data};
      }))
      .catch(action('get risk tax', err => {
        console.log(err);
        this.taxData = {content: [], error: {message: '暂无信息'}};
      }));
  }
  resetStore() {
    this.isMount = false;
    this.taxData = {};
  }
}

export default new RiskTaxStore();
