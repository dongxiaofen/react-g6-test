import { observable, action } from 'mobx';
import { highRiskCorpApi } from 'api';
import pathval from 'pathval';
class HighRiskCorpStore {
  @observable statistic = {};
  @observable industryDistribute = {
    params: {
      area: '全部',
      regCap: '全部',
      timeRange: '近一个月',
    },
    data: {},
  };
  @observable latestEnterprise = {
    params: {
      area: '全部',
    },
    data: {},
  };
  @observable enterpriseIncrement = {
    params: {
      industry: '全部',
      area: '全部',
      regCap: '全部',
      year: '2017',
    },
    data: {},
  };
  @observable areaDistribute = {
    params: {
      industry: '全部',
      regCap: '全部',
      timeRange: '近一个月',
    },
    data: {},
  };
  @action.bound changeValue(path, value) {
    pathval.setPathValue(this, path, value);
  }
  @action.bound getStatistic() {
    highRiskCorpApi.getStatistic()
      .then(action('getStatistic', resp => {
        console.log(resp);
      }))
      .catch('getStatistic', err => {
        console.log(err);
      });
  }
  @action.bound getIndustry() {
    const params = this.industryDistribute.params;
    highRiskCorpApi.getIndustry(params)
      .then(action('getIndustry', resp => {
        console.log(resp);
      }))
      .catch('getIndustry', err => {
        console.log(err);
      });
  }
  @action.bound getRecent() {
    const params = this.latestEnterprise.params;
    highRiskCorpApi.getRecent(params)
      .then(action('getRecent', resp => {
        console.log(resp);
      }))
      .catch('getRecent', err => {
        console.log(err);
      });
  }
  @action.bound getIncrement() {
    const params = this.enterpriseIncrement.params;
    highRiskCorpApi.getIncrement(params)
      .then(action('getIncrement', resp => {
        console.log(resp);
      }))
      .catch('getIncrement', err => {
        console.log(err);
      });
  }
  @action.bound getArea() {
    const params = this.areaDistribute.params;
    highRiskCorpApi.getArea(params)
      .then(action('getArea', resp => {
        console.log(resp);
      }))
      .catch('getArea', err => {
        console.log(err);
      });
  }
}

export default new HighRiskCorpStore();
