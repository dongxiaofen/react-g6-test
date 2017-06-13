import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import companyHomeStore from './companyHome';

class LoaningStore {
  @observable isLoading = true;
  @observable isMount = false;
  // 盈利能力指标数据
  @observable profitDataList = {};
  // 营运能力指标数据
  @observable operationDataList = {};
  // 成长能力指标数据
  @observable upDataList = {};
  @observable loading = false;
  @observable loadingId = -1;
  @observable listData = [];
  // 六芒星data
  @observable sixStarData = {};

  @action.bound getReportModule() {
    this.isMount = true;
  }

  // 获取营收能力信息
  @action.bound getProfitEvalList() {
    companyHomeApi.getProfitEvalList(companyHomeStore.reportInfo.analysisReportId)
                  .then(action((response) => {
                    this.profitDataList = response.data;
                  }))
                  .catch(action((err) => {
                    console.log('getProfitEvalList.....errr = ' + err);
                    this.loading = false;
                  }));
  }

  // 营运能力指标数据
  @action.bound getOperationDataList() {
    companyHomeApi.getOperationDataList(companyHomeStore.reportInfo.analysisReportId)
                  .then(action((response) => {
                    this.operationDataList = response.data;
                  }))
                  .catch(action((err) => {
                    console.log('getProfitEvalList.....errr = ' + err);
                    this.loading = false;
                  }));
  }

  // 成长能力指标数据
  @action.bound getUpDataList() {
    this.loading = true;
    companyHomeApi.getUpDataList(companyHomeStore.reportInfo.analysisReportId)
                  .then(action((response) => {
                    this.upDataList = response.data;
                  }))
                  .catch(action((err) => {
                    console.log('getUpDataList.....errr = ' + err);
                    this.loading = false;
                  }));
  }

  // 获取六芒星Data
  @action.bound getCompanyScore() {
    // 打开loading
    this.loading = true;
    // 获取列表数据
    companyHomeApi.getCompanyScore(companyHomeStore.reportInfo.analysisReportId)
                  .then(action('six list', (response) => {
                    this.sixStarData = response.data;
                    console.log(response);
                    // 关闭loading
                    this.loading = false;
                  }))
                  .catch(action('six error', (err) => {
                    console.log(err + '=====six error');
                    // 关闭loading
                    this.loading = false;
                    this.sixStarData = { error: 'error' };
                  }));
  }

  // 重置营收能力数据
  @action.bound resetProfitEvalStore() {
    this.profitDatat = [];
  }

  // 重置营收能力数据
  @action.bound resetSixStarStore() {
    this.sixStarData = '';
  }
}
export default new LoaningStore();
