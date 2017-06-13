import { observable, action } from 'mobx';
class OnLoanStore {
  @observable reportType = '';
  @observable growingReport = {};
  @observable operationReport = {};
  @observable profitabilityReport = {};

  @action.bound changeGrowingReport() {}

  @action.bound changeOperationReport() {}

  @action.bound changeProfitabilityReport() {}
}
export default new OnLoanStore();
