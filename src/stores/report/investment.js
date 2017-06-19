import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
import pathval from 'pathval';
// import axios from 'axios';

class InvestmentStore {
  @observable isMount = false;
  @observable entData = {};
  @observable frPositionList = {};
  @observable frinvList = {};
  @observable manageData = {};
  @observable manageDataInfoIndex = -1;
  @action.bound getReportModule(params) {
    this.isMount = true;
    companyHomeApi.getReportModule('investment', params)
      .then(action('get investment', resp => {
        const noData = {error: {message: '暂无信息'}, content: []};
        const entNoData = !resp.data.ent || !resp.data.ent.entinvItemList || resp.data.ent.entinvItemList.length === 0;
        const frPositionNoData = !resp.data.fr || !resp.data.fr.frPositionList || resp.data.fr.frPositionList.length === 0;
        const frinvListNoData = !resp.data.fr || !resp.data.fr.frinvList || resp.data.fr.frinvList.length === 0;
        const manageDataNoData = !resp.data.managements || resp.data.managements.length === 0;
        this.entData = entNoData ? noData : {content: resp.data.ent.entinvItemList};
        this.frPositionList = frPositionNoData ? noData : {content: resp.data.fr.frPositionList};
        this.frinvList = frinvListNoData ? noData : {content: resp.data.fr.frinvList};
        this.manageData = manageDataNoData ? noData : resp.data.managements;
      }))
      .catch(action('get investment', err => {
        const errorData = {error: err.response.data, content: []};
        this.entData = errorData;
        this.frPositionList = errorData;
        this.frinvList = errorData;
        this.manageData = errorData;
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
