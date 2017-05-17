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
      timeRange: '2017',
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
    this.statistic = {};
    highRiskCorpApi.getStatistic()
      .then(action('getStatistic', resp => {
        this.statistic = resp.data;
      }))
      .catch('getStatistic', err => {
        console.log(err);
        this.statistic = {latest_month_num: 0, total_num: 0};
      });
  }
  @action.bound getIndustry() {
    this.industryDistribute.data = {};
    const params = this.industryDistribute.params;
    highRiskCorpApi.getIndustry(params)
      .then(action('getIndustry', resp => {
        const noData = !resp.data || !resp.data.indus_dist_list || resp.data.indus_dist_list.length === 0;
        this.industryDistribute.data = noData ? {error: {message: '暂无信息'}, indus_dist_list: []} : resp.data;
      }))
      .catch('getIndustry', err => {
        console.log(err);
        this.industryDistribute.data = {error: err.response.data, indus_dist_list: []};
      });
  }
  @action.bound getRecent() {
    this.latestEnterprise.data = {};
    const params = this.latestEnterprise.params;
    highRiskCorpApi.getRecent(params)
      .then(action('getRecent', resp => {
        const noData = !resp.data || !resp.data.indus_comp_list || resp.data.indus_comp_list.length === 0;
        this.latestEnterprise.data = noData ? {error: {message: '暂无信息'}, indus_comp_list: []} : resp.data;
      }))
      .catch('getRecent', err => {
        console.log(err);
        this.latestEnterprise.data = {error: err.response.data, indus_comp_list: []};
      });
  }
  @action.bound getIncrement() {
    this.enterpriseIncrement.data = {};
    const params = Object.assign({}, this.enterpriseIncrement.params, {year: this.enterpriseIncrement.params.timeRange});
    delete params.timeRange;
    highRiskCorpApi.getIncrement(params)
      .then(action('getIncrement', resp => {
        const noData = !resp.data || !resp.data.blacklist_dist_list || Object.keys(resp.data.blacklist_dist_list).every(item => item.count === 0) || resp.data.blacklist_dist_list.length === 0;
        this.enterpriseIncrement.data = noData ? {error: {message: '暂无信息'}, blacklist_dist_list: []} : resp.data;
      }))
      .catch('getIncrement', err => {
        console.log(err);
        this.enterpriseIncrement.data = {error: err.response.data, blacklist_dist_list: []};
      });
  }
  @action.bound getArea() {
    this.areaDistribute.data = {};
    const params = this.areaDistribute.params;
    highRiskCorpApi.getArea(params)
      .then(action('getArea', resp => {
        const noData = !resp.data || !resp.data.results || resp.data.results.length === 0;
        this.areaDistribute.data = noData ? {error: {message: '暂无信息'}, results: []} : resp.data;
      }))
      .catch('getArea', err => {
        console.log(err);
        this.areaDistribute.data = {error: err.response.data, results: []};
      });
  }
}

export default new HighRiskCorpStore();
