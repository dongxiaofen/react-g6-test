import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import uiStore from '../ui';
import messageStore from '../message';

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
  @observable reloadMonitorId = '';

  @observable isMount = false;
  @action.bound getReportModule(module, monitorId) {
    companyHomeApi.getPersonCheckInfo({monitorId, 'params': uiStore.uiState.relPerCheck})
      .then(action( (response) => {
        this.reloadMonitorId = monitorId;
        this.personCheckInfoData = response.data.content;
      }))
      .catch(action( (error) => {
        console.log(error);
      }));
  }
  @action.bound submitRelated(url, params) {
    this.isLoading = true;
    companyHomeApi.checkPersonInfo(url, params)
      .then( action( () => {
        this.isLoading = false;
        this.showCheckModal = false;
        messageStore.openMessage({type: 'info', content: '核查成功', duration: '1500'});
        this.getReportModule('', this.relatedIdCard);
      }))
      .catch(action( (error) => {
        this.isLoading = false;
        messageStore.openMessage({type: 'info', content: error.response.data, duration: '1500'});
      }));
  }
  @action.bound getIdCard({monitorId, reportId, personCheckId}) {
    let url;
    if (monitorId) {
      url = `/api/monitor/${monitorId}/person/cardId?personCheckId=${personCheckId}`;
    } else {
      url = `/api/report/${reportId}/person/cardId?personCheckId=${personCheckId}`;
    }
    companyHomeApi.getIdCard(url)
      .then( action( (response) => {
        this.showId.set(personCheckId, true);
        this.idCard.set(personCheckId, response.data);
      }))
      .catch( action( (err) => {
        console.log(err.response.data);
      }));
  }
  @action.bound toggleExpand(moudle, personCheckId, value) {
    // this[moudle][personCheckId] = value;
    if (moudle === 'showId') {
      this.showId.set(personCheckId, value);
    }
    this.idCard.set(personCheckId, value);
  }
}
export default new RelPerCheckStore();
