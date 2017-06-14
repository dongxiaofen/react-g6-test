import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
// import axios from 'axios';

class MortageStore {
  @observable sharesFrostList = {};
  @observable sharesImpawnList = {};
  @observable sharesTransferList = {};
  @action.bound getReportModule(params) {
    companyHomeApi.getReportModule('risk/pledge', params)
      .then(action('get pledge', resp => {
        const noData = {error: {message: '暂无信息'}, content: []};
        const sharesFrostListNoData = !resp.data || !resp.data.shares || !resp.data.shares.sharesFrostList || resp.data.shares.sharesFrostList.length === 0;
        const sharesImpawnListNoDate = !resp.data || !resp.data.shares || !resp.data.shares.sharesImpawnList || resp.data.shares.sharesImpawnList.length === 0;
        const sharesTransferListNoData = !resp.data || !resp.data.shares || !resp.data.shares.sharesTransferList || resp.data.shares.sharesTransferList.length === 0;
        this.sharesFrostList = sharesFrostListNoData ? noData : {content: resp.data.shares.sharesFrostList};
        this.sharesImpawnList = sharesImpawnListNoDate ? noData : {content: resp.data.shares.sharesImpawnList};
        this.sharesTransferList = sharesTransferListNoData ? noData : {content: resp.data.shares.sharesTransferList};
      }))
      .catch(action('get pledge error', err => {
        const errorData = {error: err.response.data, content: []};
        this.sharesFrostList = errorData;
        this.sharesImpawnList = errorData;
        this.sharesTransferList = errorData;
      }));
  }
}

export default new MortageStore();
