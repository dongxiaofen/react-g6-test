import { observable, action, computed } from 'mobx';
import { companyHomeApi } from 'api';
// import bannerStore from './banner';
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
  @observable detailData = {
    activeIndex: 0,
    page: 1,
    tabTop: computed(function tabTop() {
      return 0 - (this.page - 1) * 8 * 60;
    }),
    info: {},
    detail: {},
    html: '',
    orgData: {},
  }

  @action.bound getReportModule() {
    this.isMount = true;
  }

  // 获取营收能力信息
  @action.bound getProfitEvalList() {
    companyHomeApi.getProfitEvalList(companyHomeStore.reportInfo.analysisReportId).then((response) => {
      if (response.code === '') {
        this.profitDataList = response;
      }
    }).catch((err) => {
      console.log('getProfitEvalList.....errr = ' + err);
      this.loading = false;
    });
  }

  // 营运能力指标数据
  @action.bound getOperationDataList() {
    companyHomeApi.getProfitEvalList(companyHomeStore.reportInfo.analysisReportId).then((response) => {
      if (response.code === '') {
        this.getOperationDataList = response;
      }
    }).catch((err) => {
      console.log('getProfitEvalList.....errr = ' + err);
      this.loading = false;
    });
  }

  // 成长能力指标数据
  @action.bound getUpDataList() {
    this.loading = true;
    companyHomeApi.getUpDataList(companyHomeStore.reportInfo.analysisReportId).then((response) => {
      if (response.code === '') {
        this.upDataList = response;
      }
    }).catch((err) => {
      console.log('getUpDataList.....errr = ' + err);
      this.loading = false;
    });
  }

  // 获取六芒星Data
  @action.bound getCompanyScore() {
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    // 打开loading
    this.loading = true;
    // 获取列表数据
    companyHomeApi.getCompanyScore(companyHomeStore.reportInfo.analysisReportId).then(action('six list', (resp) => {
      this.sixStarData = resp;
      // 关闭loading
      this.loading = false;
    })).catch(action('six error', (err) => {
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
