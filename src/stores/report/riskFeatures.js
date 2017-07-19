import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;
class RiskFeaturesStore {
  // reportId
  @observable reportId = '';
  // 结果loading
  @observable riskLoading = true;
  // 列表loading
  @observable riskListLoading = [];
  // 是否可扫描
  @observable canScan = false;
  // 分析状态
  @observable status = 'FIRST_TIME';
  // 结果
  @observable result = '';
  // 风险数据列表
  @observable listData = [];
  // 是否接口失败
  @observable apiIsResult = false;

  // 点击开始扫描按钮时先发送请求数据接口,再发送请求状态接口
  @action.bound getScanStatusClick() {
    const source = CancelToken.source();
    this.riskLoading = true;
    // 发送数据接口
    companyHomeApi.getEventAnalysis(this.reportId, source)
      .then(action('eventAnalysis', resp => {
        this.result = resp.data;
        this.getScanStatus(this.reportId);
      }))
      .catch(action('eventAnalysis', err => {
        if (err.response.data.errorCode === 404203 || err.response.data.errorCode === '404203') {
          this.getScanStatus(this.reportId);
        }
        // 接口失败
        this.apiIsResult = true;
      }));
  }

  // 请求分析状态:开始进入路由时发送此接口
  // 返回状态为"FIRST_TIME"时,不做任何操作,点击按钮后再次发送此接口,每隔10s发送一次,直到返回结果为"FINISH"
  // 返回状态为"PROCESSING"时,每隔10s发送一次,直到返回结果为"FINISH"
  // 返回状态为"FINISH"时,发送：scan/eventAnalysis接口,并获取结果数据
  @action.bound getScanStatus(reportId) {
    const source = CancelToken.source();
    this.reportId = reportId;
    this.riskLoading = true;
    companyHomeApi.getEventAnalysisStatus(this.reportId, source)
      .then(action('eventAnalysisStatus', resp => {
        // 是否可扫描
        this.canScan = resp.data.canScan;
        // 分析状态
        this.status = resp.data.status;
        // 分析状态
        if (this.status === 'FIRST_TIME') {
          this.riskLoading = false;
        }
        if (this.status === 'PROCESSING') {
          setTimeout(() => {
            this.getScanStatus(this.reportId);
          }, 30000);
        }
        if (resp.data.status === 'FINISH') {
          // 请求风险结果
          this.getScanResult();
        }
      }))
      .catch(action('eventAnalysisStatus', err => {
        // 接口失败
        this.apiIsResult = true;
        console.log(err);
      }));
  }
  // 请求风险结果
  @action.bound getScanResult() {
    const source = CancelToken.source();
    companyHomeApi.getEventAnalysis(this.reportId, source)
      .then(action('eventAnalysis', resp => {
        // 分析状态
        if (this.status === 'FINISH') {
          this.riskLoading = false;
        }
        this.result = resp.data;
      }))
      .catch(action('eventAnalysis', err => {
        console.log(err);
        // 接口失败
        this.apiIsResult = true;
      }));
  }
  // 请求风险数据详情列表
  @action.bound getScanList(recordIds, index) {
    // 判断是否已经有数据,有数据改变显示状态,无数据则请求数据
    // console.log(index, '=====index');
    let flag = true;
    if (this.listData.length > 0) {
      this.listData.map((obj, idx)=>{
        if (obj.index === index) {
          this.listData[idx].status = !this.listData[idx].status;
          flag = false;
          // console.log('1111====');
        }
      });
    }
    // console.log(flag, '====flag');
    if (flag) {
      // console.log('2222====');
      this.getScanListDetail(recordIds, index);
    }
    // console.log(this.listData, '===data');
  }
  // 请求风险数据详情列表
  @action.bound getScanListDetail(recordIds, index) {
    const source = CancelToken.source();
    this.riskListLoading.push(index);
    companyHomeApi.getEventAnalysisList(this.reportId, recordIds, source)
      .then(action('eventAnalysisList', resp => {
        this.listData.push(
          {
            index: index,
            status: true,
            data: resp.data
          }
        );
        if (this.riskListLoading.length > 0) {
          this.riskListLoading.splice(this.riskListLoading.indexOf(index), 1);
        }
        // console.log(this.riskListLoading, '====this.riskListLoading');
      }))
      .catch(action('eventAnalysisList', err => {
        console.log(err);
      }));
  }
  // reset
  @action.bound resetStore() {
    // loading
    this.riskLoading = false;
    // 分析状态
    this.status = '';
    // 结果
    this.result = '';
    // 风险数据列表
    this.listData = '';
  }
}
export default new RiskFeaturesStore();
