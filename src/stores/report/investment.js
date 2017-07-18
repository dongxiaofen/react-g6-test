import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import pathval from 'pathval';
// import axios from 'axios';

class InvestmentStore {
  @observable isMount = false;
  @observable entData = {};
  @observable frPositionList = {};
  @observable frOtherPositionList = {};
  @observable frinvList = {};
  @observable manageData = {};
  @observable shareholders = {};
  @observable manageDataInfoIndex = -1;
  @observable shareholdInfoIdx = -1;
  @observable loading = false;
  @action.bound getReportModule(params) {
    this.isMount = true;
    this.loading = true;
    companyHomeApi.getReportModule('investment', params)
      .then(action('get investment', resp => {
        this.loading = false;
        const noData = {error: {message: '暂无信息'}, content: []};
        const entNoData = !resp.data.ent || !resp.data.ent.entinvItemList || resp.data.ent.entinvItemList.length === 0;
        const frPositionNoData = !resp.data.fr || !resp.data.fr.frPositionList || resp.data.fr.frPositionList.length === 0;
        const frOtherPositionNoData = !resp.data.fr || !resp.data.fr.frOtherPositionList || resp.data.fr.frOtherPositionList.length === 0;
        const frinvListNoData = !resp.data.fr || !resp.data.fr.frinvList || resp.data.fr.frinvList.length === 0;
        const manageDataNoData = !resp.data.managements || resp.data.managements.length === 0;
        const shareNoData = !resp.data.shareholders || resp.data.managements.length === 0;

        this.entData = entNoData ? noData : {content: resp.data.ent.entinvItemList};
        this.frPositionList = frPositionNoData ? noData : {content: resp.data.fr.frPositionList};
        this.frOtherPositionList = frOtherPositionNoData ? noData : {content: resp.data.fr.frOtherPositionList};
        this.frinvList = frinvListNoData ? noData : {content: resp.data.fr.frinvList};
        this.manageData = manageDataNoData ? noData : resp.data.managements;
        this.shareholders = shareNoData ? noData : resp.data.shareholders;
      }))
      .catch(action('get investment', err => {
        this.loading = false;
        const errorData = {error: err.response.data, content: []};
        this.entData = errorData;
        this.frPositionList = errorData;
        this.frOtherPositionList = errorData;
        this.frinvList = errorData;
        this.manageData = errorData;
        this.shareholders = errorData;
      }));
  }
  @action.bound resetStore() {
    this.isMount = false;
    this.entData = {};
    this.frPositionList = {};
    this.frinvList = {};
    this.manageData = {};
  }
  @action.bound changeValue(path, value) {
    pathval.setPathValue(this, path, value);
  }
}
export default new InvestmentStore();
