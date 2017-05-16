import { observable, action } from 'mobx';
import axios from 'axios';
const CancelToken = axios.CancelToken;
class TaxStore {
  // 盈利能力指标数据
  @observable profitDataList = [];
  // 营运能力指标数据
  @observable operationDataList = [];
  // 成长能力指标数据
  @observable upDataList = [];
  // 获取税务信息
  @action.bound getTaxList() {
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    const source = CancelToken.source();
    window.reportSourceCancel.push(source.cancel);
  }
  // 重置数据
  @action.bound resetStore() {
    this.profitDataList = [];
    this.operationDataList = [];
    this.upDataList = [];
  }
}
export default new TaxStore();
