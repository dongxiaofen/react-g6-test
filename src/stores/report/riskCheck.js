import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';

class RiskCheckStore {
  @observable isMount = false;
  @observable checkData = {};
  @observable abnormalData ={};
  @observable punishData ={};

  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule('risk/check', params)
      .then(action('get risk tax', resp => {
        const noData = {content: [], error: {message: '暂无信息'}};
        const checkNoData = !resp.data || !resp.data.checkMessage || resp.data.checkMessage.length === 0;
        const abnormalNoData = !resp.data || !resp.data.abnormalOperation || resp.data.abnormalOperation.length === 0;
        const punishNoData = !resp.data || !resp.data.punishList || resp.data.punishList.length === 0;
        this.checkData = checkNoData ? noData : {content: resp.data.checkMessage};
        this.abnormalData = abnormalNoData ? noData : {content: resp.data.abnormalOperation};
        this.punishData = punishNoData ? noData : {content: resp.data.punishList};
      }))
      .catch(action('get risk tax', err => {
        console.log(err);
        const errorData = {content: [], error: {message: '暂无信息'}};
        this.checkData = errorData;
        this.abnormalData = errorData;
        this.punishData = errorData;
      }));
  }
  resetStore() {
    this.isMount = false;
    this.checkData = {};
    this.abnormalData = {};
    this.punishData = {};
  }
}

export default new RiskCheckStore();
