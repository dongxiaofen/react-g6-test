import { observable, action } from 'mobx';
class LoaningStore {
  @observable isLoading = true;
  @observable isMount = false;
  @action.bound getReportModule() {
    this.isMount = true;
  }
}
export default new LoaningStore();
