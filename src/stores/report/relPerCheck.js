import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import uiStore from '../ui';
import pathval from 'pathval';

class RelPerCheckStore {
  @observable personCheckInfoData = [];
  showId = observable.map({});
  idCard = observable.map({});
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
  @action.bound getIdCard({monitorId, reportId, personCheckId}) {
    companyHomeApi.getIdCard({monitorId, reportId, personCheckId})
      .then( action( (response) => {
        pathval.setPathValue(this, `showId.${personCheckId}`, true);
        pathval.setPathValue(this, `idCard.${personCheckId}`, response.data);
      }))
      .catch( action( (err) => {
        console.log(err.response.data);
      }));
  }
}
export default new RelPerCheckStore();
