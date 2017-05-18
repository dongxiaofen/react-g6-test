import { observable, action } from 'mobx';
import pathval from 'pathval';
import {companyHomeApi} from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;
import uiStore from '../ui';
import modalStore from '../modal';
import messageStore from '../message';
class TaxCheckStore {
  @observable selectConf = [
    {year: '2015', taxIndex: 'R001', input: '', msg: ''},
  ];
  // 核查列表数据 假数据
  @observable taxListData = {};
  @observable taxState = false;
  // loading
  @observable loading = false;

  @action.bound addSelectItem() {
    this.selectConf.push({
      year: '2015',
      taxIndex: 'R001',
      input: '',
      msg: '',
    });
  }
  @action.bound deleteSelectItem(index) {
    this.selectConf = this.selectConf.filter((item, idx) => {
      console.log(index, idx);
      return idx !== index;
    });
  }
  @action.bound changeValue(path, value) {
    pathval.setPathValue(this, path, value);
  }
  @action.bound resetSelectModal() {
    this.selectConf = [
      {year: '2015', taxIndex: 'R001', input: '', msg: ''},
    ];
  }
  @action.bound postSelectInfo(monitorId, analysisReportId) {
    const params = this.selectConf;
    companyHomeApi.addTaxCheck(monitorId, analysisReportId, params)
      .then(action('addTaxCheck', () => {
        modalStore.confirmLoading = false;
        modalStore.visible = false;
        this.resetSelectModal();
        messageStore.openMessage({
          type: 'info',
          content: '添加成功'
        });
        this.getTaxCheckList(monitorId);
      }))
      .catch(action('addTaxCheck', err => {
        console.log(err);
        modalStore.confirmLoading = false;
        messageStore.openMessage({
          type: 'error',
          content: pathval.getPathValue(err, 'response.data.message') || '添加失败'
        });
      }));
  }
  // 获取列表数据
  @action.bound getTaxCheckList(monitorId) {
    this.taxState = true;
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
    companyHomeApi.getTaxCheckList(monitorId, params, source)
      .then(action('taxList list', (resp) => {
        this.taxListData = resp.data;
        // 关闭loading
        this.loading = false;
        uiStore.uiState.taxCheckPager.totalElements = resp.data.totalElements;
      }))
      .catch(action('taxList error', (err) => {
        // 关闭loading
        this.loading = false;
        this.taxListData = {error: err.response.data};
        console.log(err.response, '=====taxList error');
      }));
  }

  // 重置数据
  @action.bound resetStore() {
    this.taxListData = {};
    this.loading = false;
    this.taxState = false;
  }
}
export default new TaxCheckStore();
