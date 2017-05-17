import { observable, action } from 'mobx';
import {companyHomeApi} from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;
class TaxStore {
  // 盈利能力指标数据
  @observable profitDataList = [];
  // 营运能力指标数据
  @observable operationDataList = [];
  // 成长能力指标数据
  @observable upDataList = [];
  @observable loading = false;
  @observable monitorId = '';
  // 获取税务信息
  @action.bound getTaxList(monitorId) {
    this.loading = true;
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    const source = CancelToken.source();
    window.reportSourceCancel.push(source.cancel);
    // 获取公司id
    if (monitorId) {
      this.monitorId = monitorId;
    }
    companyHomeApi.getTaxList(this.monitorId, source)
      .then(action('taxList list', (resp) => {
        if (resp.data.result) {
          // console.log(resp.data.result);
          this.profitDataList = resp.data.result.operating_profit;
          this.operationDataList = resp.data.result.operating_capability;
          this.upDataList = resp.data.result.operating_progress;
        }
        // 关闭loading
        this.loading = false;
      }))
      .catch(action('taxList error', (err) => {
        // 关闭loading
        this.loading = false;
        console.log(err.response, '=====taxList error');
      }));
  }
  // 重置数据
  @action.bound resetStore() {
    this.profitDataList = [];
    this.operationDataList = [];
    this.upDataList = [];
  }
}
export default new TaxStore();
