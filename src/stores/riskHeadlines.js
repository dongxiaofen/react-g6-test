import { observable, action, computed} from 'mobx';
import {riskHeadlinesApi} from 'api';
import pathval from 'pathval';
import moment from 'moment';
const currentdate = moment().format('YYYY-MM-DD');
const initState = {
  filterParams: {
    from: currentdate,
    to: currentdate,
    companyName: '',
  },
  filterConfig: [
    {name: '工商', enumKey: 'CORP', checked: 1},
    {name: '法务', enumKey: 'LEGAL', checked: 1},
    {name: '新闻', enumKey: 'NEWS', checked: 1},
    {name: '经营', enumKey: 'OPERATION', checked: 1},
    {name: '团队', enumKey: 'TEAM', checked: 1},
    {name: '上市', enumKey: 'STOCK', checked: 1},
  ],
  events: {
    info: {},
    data: [],
    companyType: 'MAIN',
    params: {
      index: 1,
      size: 10,
      dimGroupType: '',
    },
    loading: {},
  },
  companyList: {
    loading: true,
    // extend: {},
    data: [],
    // subCompany: {},
    active: '',
  },
  subCompany: {
    extend: {},
    subCompanyList: {},
  }
};
class RiskHeadlinesStore {
  @observable filterParams = Object.assign({}, initState.filterParams);
  @observable filterConfig = initState.filterConfig.slice(0);
  @observable companyList = Object.assign({}, initState.companyList);
  @observable events = Object.assign({}, initState.events);
  subCompanyList = observable.map({});

  @computed get dimGroupType() {
    const output = [];
    this.filterConfig.forEach((fiterItem)=>{
      if (fiterItem.checked === 1) {
        output.push(fiterItem.enumKey);
      }
    });
    return output;
  }
  @computed get dimGroupTypeStr() {
    return 'dimGroupType=' + this.dimGroupType.join('&dimGroupType=');
  }

  getDefulComInfo(params, data) {
    const monitorId = data.monitorId;
    const newParams = {};
    newParams.to = params.to;
    newParams.from = params.from;
    this.getCompanyInfo(monitorId, newParams);
  }
  @action.bound getCompanyList(dimGroupTypeStr, params) {
    riskHeadlinesApi.getCompanyList(dimGroupTypeStr, params)
    .then(action('getCompanyList', (resp)=> {
      this.resetModuleData('companyList');
      this.resetModuleData('events');
      this.setCompanyList(resp.data);
      this.riskUpdateValue('companyList', 'active', resp.data[0].monitorId);
      this.getDefulComInfo(params, resp.data[0]);
    }))
    .catch(() => {
      this.setErrorMsg('setCompanyList', '未发现符合条件企业');
    });
  }
  @action.bound getSubCompanyList(monitorId, params) {
    const dimGroupTypeStr = this.dimGroupTypeStr;
    riskHeadlinesApi.getSubCompanyList(dimGroupTypeStr, monitorId, params)
    .then(action('getSubCompanyList', (resp)=> {
      this.subCompanyList.set(monitorId, resp.data);
    }))
    .catch((error)=>{
      console.log('getSubCompanyList', error);
    });
  }
  @action.bound getCompanyInfo(monitorId, params) {
    riskHeadlinesApi.getCompanyInfo(monitorId, params)
    .then(action('companyInfo', (resp)=>{
      this.setCompanyInfo(resp.data);
      this.getDefultEvent(params, resp.data);
    }))
    .catch((error)=>{
      console.log('getCompanyInfo', error);
    });
  }
  @action.bound getDefultEvent(params, data) {
    const monitorId = data.monitorId;
    const config = ['corp', 'legal', 'news', 'operation', 'team', 'stock'];
    let dimGroupType = '';
    for (const item of config) {
      if (data[`${item}Count`] > 0) {
        dimGroupType = item.toUpperCase();
        break;
      }
    }
    this.events.params.dimGroupType = dimGroupType;
    params.dimGroupType = dimGroupType;
    this.getCompanyEvents(monitorId, params);
  }
  @action.bound getCompanyEvents(monitorId, params) {
    riskHeadlinesApi.getCompanyEvents(monitorId, params)
    .then(action('companyEvents', (resp)=>{
      this.setCompanyEvents(resp.data);
    }))
    .catch(()=>{
    });
  }
  @action.bound getMonitorMap(id) {
    riskHeadlinesApi.getMonitorMap(id)
    .then((resp)=>{
      location.href = `/companyHome?monitorId=${resp.data.monitorId}&companyType=${resp.data.companyType}`;
    })
    .catch((error)=> {
      console.log(error, 'risk getMonitorMap');
    });
  }
  @action.bound riskUpdateValue(objName, keyPath, value) {
    pathval.setPathValue(this[objName], keyPath, value);
  }
  @action.bound setMapValue(objName, keyPath, value) {
    this[objName].set(keyPath, value);
  }
  @action.bound setCompanyList(data) {
    this.riskUpdateValue('companyList', 'data', data);
  }
  @action.bound setCompanyInfo(data) {
    this.riskUpdateValue('events', 'info', data);
  }
  @action.bound setCompanyEvents(data) {
    this.riskUpdateValue('events', 'data', data);
  }
  @action.bound setErrorMsg(handle, errMessage) {
    this[handle]({error: errMessage});
  }
  @action.bound resetModuleData(objName) {
    this[objName] = initState[objName];
  }
}
export default new RiskHeadlinesStore();
