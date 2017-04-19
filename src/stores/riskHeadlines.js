import { observable, action, computed} from 'mobx';
import {riskHeadlinesApi} from 'api';
import pathval from 'pathval';
import moment from 'moment';
import detailModalStore from './detailModal';
const axiosCancel = {};
const currentdate = moment().format('YYYY-MM-DD');
import axios from 'axios';
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
    data: [],
    active: '',
  },
  detailModalData: {
    info: {},
    content: {},
    source: '',
    url: '',
  },
  detailLoading: {},
};
class RiskHeadlinesStore {
  @observable filterParams = Object.assign({}, initState.filterParams);
  @observable filterConfig = initState.filterConfig.slice(0);
  @observable companyList = Object.assign({}, initState.companyList);
  @observable events = Object.assign({}, initState.events);
  subCompanyList = observable.map({});
  @observable detailModalData = Object.assign({}, initState.detailModalData);
  detailLoading = observable.map({});

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
  cancelRiskApi() {
    console.log(axiosCancel);
    if (axiosCancel.companyListCancel) {
      axiosCancel.companyListCancel();
    }
    if (axiosCancel.companySubListCancel) {
      axiosCancel.companySubListCancel();
    }
    if (axiosCancel.companyInfoCancel) {
      axiosCancel.companyInfoCancel();
    }
    if (axiosCancel.companyEventsCancel) {
      axiosCancel.companyEventsCancel();
    }
  }
  getDefulComInfo(params, data) {
    const keys = ['corpCount', 'legalCount', 'newsCount', 'operationCount', 'teamCount', 'stockCount'];
    let hasEvents = false;
    for (const key of keys) {
      if (data[key] > 0) {
        hasEvents = true;
        break;
      }
    }
    const monitorId = data.monitorId;
    const newParams = {};
    newParams.to = params.to;
    newParams.from = params.from;
    if (hasEvents) {
      this.riskUpdateValue('companyList', 'active', monitorId);
      this.getCompanyInfo(monitorId, newParams);
    } else {
      this.riskUpdateValue('events', 'companyType', 'SUB');
      this.getSubCompanyList(monitorId, newParams, 'default');
    }
  }
  @action.bound getCompanyList(dimGroupTypeStr, params, flag = 'other') {
    this.resetModuleData('events');
    this.resetModuleData('companyList');

    this.cancelRiskApi('list');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axiosCancel.companyListCancel = source.cancel;

    riskHeadlinesApi.getCompanyList(dimGroupTypeStr, params, source)
    .then(action('getCompanyList', (resp)=> {
      this.setCompanyList(resp.data);
      this.getDefulComInfo(params, resp.data[0]);
      axiosCancel.companyListCancel = null;
    }))
    .catch((error) => {
      console.log('companyList', error);
      console.log(axios.isCancel(error), error);
      if (!axios.isCancel(error)) {
        if (flag === 'today') {
          this.setCompanyList({errorToday: '今日监控企业未发现信息，您可以选择其他时间段监控信息'});
        } else {
          this.setErrorMsg('setCompanyList', '未发现符合条件企业');
        }
        this.setErrorMsg('setCompanyInfo', ' ');
        this.setErrorMsg('setCompanyEvents', '暂无信息');
        axiosCancel.companyListCancel = null;
      }
    });
  }
  @action.bound getSubCompanyList(monitorId, params, type = 'normal') {
    const dimGroupTypeStr = this.dimGroupTypeStr;

    this.cancelRiskApi('subList');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axiosCancel.companySubListCancel = source.cancel;

    riskHeadlinesApi.getSubCompanyList(dimGroupTypeStr, monitorId, params, source)
    .then(action('getSubCompanyList', (resp)=> {
      this.subCompanyList.set(monitorId, resp.data);
      axiosCancel.companySubListCancel = null;
      if (type === 'default') { // 默认获取第一个关联公司的事件
        this.getCompanyInfo(resp.data[0].monitorId, params);
        this.riskUpdateValue('companyList', 'active', resp.data[0].monitorId);
      }
    }))
    .catch((error)=>{
      console.log('getSubCompanyList', error);
      if (!axios.isCancel(error)) {
        axiosCancel.companySubListCancel = null;
      }
    });
  }
  @action.bound getCompanyInfo(monitorId, params) {
    this.resetCompanyInfo();
    this.resetCompanyEvents();

    this.cancelRiskApi('info');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axiosCancel.companyInfoCancel = source.cancel;

    riskHeadlinesApi.getCompanyInfo(monitorId, params, source)
    .then(action('companyInfo', (resp)=>{
      this.setCompanyInfo(resp.data);
      this.getDefultEvent(params, resp.data);
      axiosCancel.companyInfoCancel = null;
    }))
    .catch((error)=>{
      console.log('getCompanyInfo', error);
      if (!axios.isCancel(error)) {
        this.setErrorMsg('setCompanyInfo', '');
        axiosCancel.companyInfoCancel = null;
      }
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
    this.resetCompanyEvents();

    this.cancelRiskApi('events');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axiosCancel.companyEventsCancel = source.cancel;

    riskHeadlinesApi.getCompanyEvents(monitorId, params, source)
    .then(action('companyEvents', (resp)=>{
      this.setCompanyEvents(resp.data);
      axiosCancel.companyEventsCancel = null;
    }))
    .catch((error)=>{
      if (!axios.isCancel(error)) {
        axiosCancel.companyEventsCancel = null;
        this.setErrorMsg('setCompanyEvents', '暂无信息');
      }
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
  @action.bound getDetail(api, monitorId, params, info, type = 'other') {
    this.detailLoading.set(info.eventId, true);
    riskHeadlinesApi[api](monitorId, params)
    .then(action('detail', (resp)=>{
      this.detailModalData.info = info;
      if (type === 'bidding') {
        this.detailModalData.content = resp.data.result;
        this.detailModalData.source = info.content.website;
        this.detailModalData.url = info.content.url;
      }else if (type === 'news') {
        this.detailModalData.content = resp.data.html;
        this.detailModalData.source = info.content.source;
        this.detailModalData.url = info.content.url;
      } else {
        this.detailModalData.content = resp.data.detail;
      }
      this.detailLoading.set(info.eventId, false);
      detailModalStore.openDetailModal((cp)=>{
        require.ensure([], (require)=>{
          if (type === 'news' || type === 'bidding') {
            cp(
              require('components/riskHeadlines/RiskMessage/DetailCom/Info'),
              require('components/riskHeadlines/RiskMessage/DetailCom/Content'),
              require('components/riskHeadlines/RiskMessage/DetailCom/Footer')
            );
          } else {
            cp(
              require('components/riskHeadlines/RiskMessage/DetailCom/Info'),
              require('components/riskHeadlines/RiskMessage/DetailCom/Content')
            );
          }
        });
      });
    }))
    .catch(action('detail error', (error)=> {
      console.log(error, 'risk Detail');
      this.detailLoading.set(info.eventId, false);
    }));
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
    this[handle]({error: {message: errMessage}});
  }
  @action.bound resetModuleData(objName) {
    this[objName] = initState[objName];
  }
  @action.bound resetCompanyInfo() {
    this.setCompanyInfo({});
  }
  @action.bound resetCompanyEvents() {
    this.setCompanyEvents([]);
  }
}
export default new RiskHeadlinesStore();
