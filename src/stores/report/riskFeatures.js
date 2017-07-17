import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;
class RiskFeaturesStore {
  // loading
  @observable loading = false;
  // 分析状态
  @observable status = 'FINISH';
  // 结果
  @observable result = '';
  // 风险数据列表
  @observable listData = '';
  // 请求分析状态:开始进入路由时发送此接口
  // 返回状态为"FIRST_TIME"时,不做任何操作,点击按钮后再次发送此接口,每隔30s发送一次,直到返回结果为"FINISH"
  // 返回状态为"PROCESSING"时,每隔30s发送一次,直到返回结果为"FINISH"
  // 返回状态为"FINISH"时,发送：scan/eventAnalysis接口,并获取结果数据
  @action.bound getScanStatus(reportId) {
    const source = CancelToken.source();
    companyHomeApi.getEventAnalysisStatus(reportId, source)
      .then(action('eventAnalysisStatus', resp => {
        // 分析状态
        // if (this.status === 'PROCESSING') {
        //   setTimeout(() => {
        //     this.getScanStatus(reportId);
        //   }, 30000);
        // }
        if (resp.data.status === 'FINISH') {
          // 分析状态
          this.status = 'FINISH';
          // 请求风险结果
          this.getScanResult(reportId);
        }
        console.log(resp, '====resp');
      }))
      .catch(action('eventAnalysisStatus', err => {
        console.log(err);
      }));
  }
  // 请求风险结果
  @action.bound getScanResult(reportId) {
    const source = CancelToken.source();
    companyHomeApi.getEventAnalysis(reportId, source)
      .then(action('eventAnalysis', resp => {
        this.result = resp.data;
        console.log(resp, '====resp result');
      }))
      .catch(action('eventAnalysis', err => {
        console.log(err);
      }));
  }
  // 请求风险数据列表
  @action.bound getScanList(reportId) {
    const source = CancelToken.source();
    companyHomeApi.getEventAnalysisList(reportId, source)
      .then(action('eventAnalysisList', resp => {
        this.listData = resp.data;
        console.log(resp, '====resp');
      }))
      .catch(action('eventAnalysisList', err => {
        console.log(err);
      }));
  }
  // reset
  @action.bound resetStore() {
    // loading
    this.loading = false;
    // 分析状态
    this.status = '';
    // 结果
    this.result = '';
    // 风险数据列表
    this.listData = '';
  }
}
export default new RiskFeaturesStore();
