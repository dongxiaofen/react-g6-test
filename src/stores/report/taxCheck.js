import { observable, action } from 'mobx';
import axios from 'axios';
const CancelToken = axios.CancelToken;
class TaxCheckStore {
  // 核查列表数据
  @observable taxListData = [
    {
      'checkTs': '2017-01-14 23:11:33',
      'input': 201632,
      'match': true,
      'taxIndex': 'A类主营业务收入',
      'year': '2016'
    },
    {
      'checkTs': '2017-01-14 23:11:33',
      'input': 201632,
      'match': true,
      'taxIndex': 'v类主营业务收入',
      'year': '2016'
    },
    {
      'checkTs': '2017-01-14 23:11:33',
      'input': 201632,
      'match': true,
      'taxIndex': 's类主营业务收入',
      'year': '2016'
    },
  ];
  // 获取列表数据
  @action.bound getTaxCheckList() {
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    const source = CancelToken.source();
    window.reportSourceCancel.push(source.cancel);
  }
  // 重置数据
  @action.bound resetStore() {
    this.taxListData = [];
  }
}
export default new TaxCheckStore();
