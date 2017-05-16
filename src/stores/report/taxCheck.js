import { observable, action } from 'mobx';
import {companyHomeApi} from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;
import uiStore from '../ui';
class TaxCheckStore {
  // 核查列表数据 假数据
  @observable taxListData = [
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': true,
    //   'taxIndex': 'A类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': true,
    //   'taxIndex': 'v类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': false,
    //   'taxIndex': 's类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': true,
    //   'taxIndex': 'v类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': false,
    //   'taxIndex': 's类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': true,
    //   'taxIndex': 'v类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': false,
    //   'taxIndex': 's类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': true,
    //   'taxIndex': 'v类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': false,
    //   'taxIndex': 's类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': true,
    //   'taxIndex': 'v类主营业务收入',
    //   'year': '2016'
    // },
    // {
    //   'checkTs': '2017-01-14 23:11:33',
    //   'input': 201632,
    //   'match': false,
    //   'taxIndex': 's类主营业务收入',
    //   'year': '2016'
    // },
  ];
  // loading
  @observable loading = false;
  // monitorId
  @observable monitorId = '';

  // 获取列表数据
  @action.bound getTaxCheckList() {
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    const source = CancelToken.source();
    window.reportSourceCancel.push(source.cancel);
    // 打开loading
    this.loading = true;
    const params = {
      index: uiStore.uiState.taxCheckPager.index,
      size: uiStore.uiState.taxCheckPager.size,
    };
    // 获取列表数据
    companyHomeApi.getTaxCheckList(this.monitorId, params, source)
      .then(action('taxList list', (resp) => {
        this.taxListData = resp.data.content;
        // 关闭loading
        this.loading = false;
        uiStore.uiState.taxCheckPager.totalElements = resp.data.totalElements;
      }))
      .catch(action('taxList error', (err) => {
        // 关闭loading
        this.loading = false;
        console.log(err.response, '=====taxList error');
      }));
  }

  // 获取getMonitorId
  @action.bound getMonitorId(monitorId) {
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    const source = CancelToken.source();
    window.reportSourceCancel.push(source.cancel);
    this.monitorId = monitorId;
  }

  // 重置数据
  @action.bound resetStore() {
    this.taxListData = [];
    this.loading = false;
  }
}
export default new TaxCheckStore();
