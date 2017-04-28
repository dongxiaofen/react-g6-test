import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import uiStore from '../ui';

class RelPerCheckStore {
  @observable personCheckInfoData = [];
  @observable showId = {};
  @observable idCard = {};
  // 弹窗
  @observable showCheckModal = false;
  @observable isLoading = false;
  // 关联关系
  @observable relatedType = '';
  // 关联关系下拉列表状态
  @observable relatedTypeModelStatus = false;
  // 姓名
  @observable relatedName = '';
  // 姓名下拉列表状态
  @observable relatedNameModelStatus = false;
  // 姓名下拉列表数据
  @observable relatedNameData = [];
  // 身份证号
  @observable relatedIdCard = '';
  // 是否提交
  @observable relatedSubmit = false;

  @observable isMount = false;
  @action.bound getReportModule(module, monitorId) {
    companyHomeApi.getPersonCheckInfo({monitorId, 'params': uiStore.uiState.relPerCheck})
      .then(action( (response) => {
        this.personCheckInfoData = response.data.content;
      }))
      .catch(action( (error) => {
        console.log(error);
      }));
  }
  @action.bound submitRelated(url, params) {
    this.isLoading = true;
    companyHomeApi.checkPersonInfo(url, params)
      .then( action( (response) => {
        this.isLoading = false;
        console.log(response);
      }))
      .catch(action( (error) => {
        console.log(error);
        this.isLoading = false;
      }));
  }
}
export default new RelPerCheckStore();
