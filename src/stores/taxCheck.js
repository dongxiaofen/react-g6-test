import { observable, action } from 'mobx';
import pathval from 'pathval';
import {companyHomeApi} from 'api';
import axios from 'axios';
const CancelToken = axios.CancelToken;
import uiStore from './ui';
import modalStore from './modal';
import messageStore from './message';
class TaxCheckStore {

  @observable isLockCompanyName = false;
  @observable companyName = '';

  @observable selectConf = [
    {year: '2015', taxIndex: 'R001', input: '', msg: ''},
  ];
  // 核查列表数据 假数据
  @observable taxListData = [];
  @observable taxState = false;
  // loading
  @observable loading = false;
  // monitorId
  // @observable monitorId = '';

  @observable taxCheckInfo = {};
  @observable taxCheckInfoCompany = '';
  @observable isMount = false;

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
  @action.bound postSelectInfo() {
    const selectConf = [];
    this.selectConf.forEach((item) => {
      const obj = {};
      obj.input = item.input;
      obj.taxIndex = item.taxIndex;
      obj.year = item.year;
      selectConf.push(obj);
    });
    // const params = this.selectConf;
    const sendParams = {
      companyName: this.companyName,
      detailRequests: selectConf
    };
    companyHomeApi.addTaxCheck(sendParams)
      .then(action('addTaxCheck', () => {
        modalStore.confirmLoading = false;
        modalStore.visible = false;
        this.resetSelectModal();
        messageStore.openMessage({
          type: 'info',
          content: '添加成功'
        });
        this.getTaxCheckList();
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
  @action.bound getReportModule() {
    this.taxState = true;
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    const source = CancelToken.source();
    window.reportSourceCancel.push(source.cancel);
    this.isMount = true;
    // 打开loading
    this.loading = true;
    const params = {
      index: uiStore.uiState.taxCheckPager.index,
      size: uiStore.uiState.taxCheckPager.size,
    };
    // if (monitorId) {
    //   this.monitorId = monitorId;
    // }
    // 获取列表数据
    companyHomeApi.getTaxCheckList(params, source)
      .then(action('taxList list', (resp) => {
        this.taxListData = resp.data.content;
        // 关闭loading
        this.loading = false;
        uiStore.uiState.taxCheckPager.totalElements = resp.data.totalElements;
      }))
      .catch(action('taxList error', (err) => {
        // 关闭loading
        this.loading = false;
        // this.taxListData = {error: err.response.data};
        console.log(err.response, '=====taxList error');
      }));
  }

  @action.bound getTaxCheckInfo(companyId, companyName) {
    companyHomeApi.getTaxInfo(companyId)
      .then(action('taxCheckInfo', (resp) => {
        this.taxCheckInfo = resp.data;
        this.taxCheckInfoCompany = companyName || '';
      }))
      .catch(action('taxCheckInfo error', (err) => {
        console.log(err.response, '=====taxList error');
      }));
  }

  // 重置数据
  @action.bound resetStore() {
    this.taxListData = [];
    this.loading = false;
    this.taxState = false;
    this.monitorId = '';
    this.isMount = false;
  }
}
export default new TaxCheckStore();
