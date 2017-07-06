import { observable, action } from 'mobx';
import { relPerCheckApi } from 'api';
import uiStore from './ui';
import messageStore from './message';
// import axios from 'axios';

class RelPerCheckStore {
  @observable personCheckInfoData = [];
  // 输入框样式状态
  @observable idCardStatus = false;
  @observable relationship = false;
  @observable personName = false;
  @observable isMount = false;


  showId = observable.map({});
  idCard = observable.map({});
  // 弹窗
  @observable showCheckModal = false;
  @observable isLoading = false;
  @observable getDataLoading = true;
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
  @observable reloadMonitorId = {};
  @action.bound getReportModule({monitorId, reportId, analysisReportId}) {
    this.isMount = true;
    this.getDataLoading = true;
    // this.getPersonName(monitorId, reportId, analysisReportId);
    relPerCheckApi.getPersonCheckInfo({'params': {
      index: uiStore.uiState.relPerCheck.index,
      size: uiStore.uiState.relPerCheck.size,
    }})
      .then(action( (response) => {
        this.getDataLoading = false;
        this.reloadMonitorId = {monitorId: monitorId, reportId: reportId, analysisReportId: analysisReportId};
        this.personCheckInfoData = response.data.content;
        uiStore.uiState.relPerCheck.totalElements = response.data.totalElements;
      }))
      .catch(action( (error) => {
        this.getDataLoading = false;
        console.log(error);
      }));
  }
  @action.bound submitRelated(url, params) {
    this.isLoading = true;
    relPerCheckApi.checkPersonInfo(url, params)
      .then( action( () => {
        this.isLoading = false;
        this.showCheckModal = false;
        this.relatedIdCard = '';
        this.relatedName = '';
        // 清空数据
        this.idCardShow = false;
        this.relationshipShow = false;
        this.personNameShow = false;
        this.relatedSubmit = false;
        messageStore.openMessage({type: 'info', content: '核查成功', duration: '1500'});
        this.getReportModule(this.reloadMonitorId);
      }))
      .catch(action( (error) => {
        this.isLoading = false;
        this.relatedIdCard = '';
        this.relatedName = '';
        this.relatedSubmit = false;
        messageStore.openMessage({type: 'warning', content: error.response.data.message, duration: '1500'});
      }));
  }
  @action.bound getIdCard({personCheckId}) {
    relPerCheckApi.getIdCard(`/api/check/person/cardId?personCheckId=${personCheckId}`)
      .then( action( (response) => {
        this.showId.set(personCheckId, true);
        this.idCard.set(personCheckId, response.data);
      }))
      .catch( action( (err) => {
        console.log(err.response.data);
      }));
  }
  @action.bound toggleExpand(moudle, personCheckId, value) {
    if (moudle === 'showId') {
      this.showId.set(personCheckId, value);
    }
    this.idCard.set(personCheckId, value);
  }
  @action.bound getPersonName(monitorId, reportId, analysisReportId) {
    let url;
    if (monitorId) {
      url = `/api/monitor/${monitorId}/person/names`;
    }else if (reportId) {
      url = `/api/report/${reportId}/person/names`;
    }else if (analysisReportId) {
      url = `/api/analysisReport/${analysisReportId}/person/names`;
    }

    relPerCheckApi.getPersonName(url)
      .then(action((response) => {
        this.relatedNameData = response.data;
      }))
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  @action.bound resetStore() {
    this.personCheckInfoData = [];
    this.idCardStatus = false;
    this.relationship = false;
    this.personName = false;
    this.showId = observable.map({});
    this.idCard = observable.map({});
    this.showCheckModal = false;
    this.isLoading = false;
    this.relatedTypeModelStatus = false;
    this.relatedName = '';
    this.relatedNameModelStatus = false;
    this.relatedNameData = [];
    this.relatedIdCard = '';
    this.relatedSubmit = false;
    this.reloadMonitorId = '';
    this.idCardShow = false;
    this.relationshipShow = false;
    this.personNameShow = false;
    this.isMount = false;
    this.getDataLoading = false;
  }
}
export default new RelPerCheckStore();