import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
// import uiStore from './ui';
// import axios from 'axios';

class MortageStore {
  @observable isLoading = true;
  @observable sharesFrostList = {};
  @observable sharesImpawnList = {};
  @observable sharesTransferList = {};
  @observable sharesFrostListCount = 0;
  @observable sharesImpawnListCount = 0;
  @observable sharesTransferListCount = 0;
  @action.bound getReportModule(params) {
    companyHomeApi.getReportModule('risk/pledge', params)
      .then(action('get pledge', resp => {
        this.isLoading = false;
        const noData = {error: {message: '暂无信息'}, content: []};
        const sharesFrostListNoData = !resp.data || !resp.data.shares || !resp.data.shares.sharesFrostList || resp.data.shares.sharesFrostList.length === 0;
        const sharesImpawnListNoDate = !resp.data || !resp.data.shares || !resp.data.shares.sharesImpawnList || resp.data.shares.sharesImpawnList.length === 0;
        const sharesTransferListNoData = !resp.data || !resp.data.shares || !resp.data.shares.sharesTransferList || resp.data.shares.sharesTransferList.length === 0;
        this.sharesFrostList = sharesFrostListNoData ? noData : {content: resp.data.shares.sharesFrostList};
        this.sharesImpawnList = sharesImpawnListNoDate ? noData : {content: resp.data.shares.sharesImpawnList};
        this.sharesTransferList = sharesTransferListNoData ? noData : {content: resp.data.shares.sharesTransferList};
        this.sharesFrostListCount = sharesFrostListNoData ? 0 : resp.data.shares.sharesFrostList.length;
        this.sharesImpawnListCount = sharesImpawnListNoDate ? 0 : resp.data.shares.sharesImpawnList.length;
        this.sharesTransferListCount = sharesTransferListNoData ? 0 : resp.data.shares.sharesTransferList.length;
      }))
      .catch(action('get pledge error', err => {
        const errorData = {error: err.response.data, content: []};
        this.isLoading = false;
        this.sharesFrostList = errorData;
        this.sharesImpawnList = errorData;
        this.sharesTransferList = errorData;
      }));
  }
}

export default new MortageStore();
