import { observable, action, computed} from 'mobx';
import {riskHeadlinesApi} from 'api';
import pathval from 'pathval';
import moment from 'moment';
const currentdate = moment().format('YYYY-MM-DD');
class RiskHeadlinesStore {
  @observable filterParams = {
    from: currentdate,
    to: currentdate,
    companyName: '',
  };
  @observable filterConfig = [
      {name: '工商', enumKey: 'CORP', checked: 1},
      {name: '法务', enumKey: 'LEGAL', checked: 1},
      {name: '新闻', enumKey: 'NEWS', checked: 1},
      {name: '经营', enumKey: 'OPERATION', checked: 1},
      {name: '团队', enumKey: 'TEAM', checked: 1},
      {name: '上市', enumKey: 'STOCK', checked: 1},
  ];
  @observable companyList = {
    loading: true,
    extend: {},
    data: [],
    subCompany: {},
    active: '',
  };
  @observable events = {
    info: {},
    data: [],
    companyType: 'MAIN',
    params: {
      index: 1,
      size: 10,
      dimGroupType: '',
    },
    loading: {},
  };
  @computed get dimGroupTypeStr() {
    const output = [];
    this.filterConfig.forEach((fiterItem)=>{
      if (fiterItem.checked === 1) {
        output.push(fiterItem.enumKey);
      }
    });
    return 'dimGroupType=' + output.join('&dimGroupType=');
  }
  @action.bound getCompanyList(dimGroupTypeStr, params) {
    riskHeadlinesApi.getCompanyList(dimGroupTypeStr, params)
    .then(action('getCompanyList'), (resp)=> {
      this.initState.companyList.data = resp.data;
    })
    .catch((err) => {
      console.log('getCompanyList', err.response);
    });
  }
  @action.bound riskUpdateValue(objName, keyPath, value) {
    pathval.setPathValue(this[objName], keyPath, value);
  }
}
export default new RiskHeadlinesStore();
