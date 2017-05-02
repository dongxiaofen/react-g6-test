import { observable, action } from 'mobx';
import { personReportApi } from 'api';

class PersonReportStore {
  @observable reportData = {};
  @observable idCard = ''; // 明文身份证
  @observable executed = [];
  @observable blacklistData =[];
  @observable dishonestyList =[];
  @observable isLoading = true;
  @action.bound getMonitorCardId() {

  }
  @action.bound getReportCardId() {

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
        this.isLoading = false;
      }))
      .catch(action(() => {
        this.isLoading = false;
      }));
  }
}
export default new PersonReportStore();
