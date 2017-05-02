import { observable, action } from 'mobx';
import { personReportApi } from 'api';

class PersonReportStore {
  @observable reportData = {};
  @observable idCard = ''; // 明文身份证
  @observable executed = [];
  @observable blacklistData =[];
  @observable dishonestyList =[];
  @observable isLoading = true;
  @action.bound getCardId(params) {
    let url;
    if (params.reportType === 'monitor') {
      url = `/api/monitor/${params.companyId}/person/cardId`;
    } else {
      url = `/api/report/${params.companyId}/person/cardId`;
    }
    personReportApi.getCardId(url, params)
      .then( action( (response) => {
        this.idCard = response.data;
      }))
      .catch(action( (error) => {
        console.log(error.response.data);
      }));
  }
  @action.bound getDetailInfo(params) {
    let url;
    if (params.reportType === 'monitor') {
      url = `/api/monitor/${params.companyId}/person`;
    } else {
      url = `/api/monitor/${params.companyId}/person`;
    }
    personReportApi.getDetailInfo(url, params)
      .then(action( (response) => {
        this.blacklistData = response.data.blacklistResponses;
        this.executed = response.data.executedResponses;
        this.dishonestyList = response.data.dishonestyResponses;
        this.reportData = response.data;
        this.isLoading = false;
      }))
      .catch(action(() => {
        this.isLoading = false;
      }));
  }
}
export default new PersonReportStore();
