import { observable, action } from 'mobx';
import moment from 'moment';
import { bidMarketApi } from 'api';
import uiStore from './ui';
import messageStore from './message';

class BidMarketStore {
  // 补全时间
  dealWithDate(_from, to, result) {
    const compliteDate = [];
    const rangeMomentDate = moment.range(moment(_from), moment(to)).toArray('days');
    // 默认封装所有数据为0
    rangeMomentDate.forEach((item) => {
      compliteDate.push({
        amount: 0,
        count: 0,
        publishDay: item.format('YYYY-MM-DD'),
      });
    });
    // 匹配有的数据，然后赋值进去
    compliteDate.forEach((item) => {
      result.forEach((detail) => {
        if (detail.publishDay === item.publishDay) {
          item.amount = detail.amount;
          item.count = detail.count;
        }
      });
    });
    return compliteDate;
  }

  @observable params = { province: '' };
  @observable mapLoading = false;
  @observable trendLoading = false;
  @observable rankLoading = false;
  @observable infoLoading = false;

  @observable trend = { axis: [], amountData: [], countData: [] };

  @observable tabSwitchIndex = 'winners';
  @observable rank = {
    axis: [],
    data: [],
    winners: { axis: [], data: [] },
    purchasers: { axis: [], data: [] },
    agents: { axis: [], data: [] },
  }

  @observable areaInfo = [];
  @observable detailTitleData = {};
  @observable detailContent = '';

  @action.bound setParams(params) {
    params.index = 1;
    // uiStore.uiState.bidMarketInfo.index = 1;
    this.params = params;
    this.getAll(params);
    this.getTrend(params);
    this.getRank(params);
    this.getInfo(params);
  }

  // 全国分布
  @action.bound getAll(params) {
    bidMarketApi.getAll(params)
      .then(action('get all', (resp) => {
        console.log(resp.data, '--------getAll');
        this.mapLoading = false;
      }))
      .catch(action('get all catch', (err) => {
        console.log(err.response);
        this.mapLoading = false;
      }));
  }

  // 变化趋势
  @action.bound getTrend(params) {
    this.trendLoading = true;
    bidMarketApi.getTrend(params)
      .then(action('get trend', (resp) => {
        const result = resp.data.result;
        if (result.length > 0) {
          const trendXAxis = [];
          const trendAmountData = [];
          const trendCountData = [];
          const compliteDate = this.dealWithDate(this.params.from, this.params.to, result);
          compliteDate.forEach((item) => {
            trendXAxis.push(item.publishDay);
            trendAmountData.push(item.amount);
            trendCountData.push(item.count);
          });
          this.trend.axis = trendXAxis;
          this.trend.amountData = trendAmountData;
          this.trend.countData = trendCountData;
        }
        this.trendLoading = false;
      }))
      .catch(action('get trend err', (err) => {
        console.log(err);
        this.trendLoading = false;
      }));
  }

  // 设置中标金额总量排行switch
  @action.bound setSwitchTab(key) {
    this.tabSwitchIndex = key;
    this.rank.axis = this.rank[key].axis;
    this.rank.data = this.rank[key].data;
  }

  // 中标金额总量排行
  @action.bound getRank(params) {
    this.rankLoading = true;
    bidMarketApi.getRank(params)
      .then(action('get rank', (resp) => {
        const rank = resp.data;
        const topWinners = rank.topWinners;
        const topPurchasers = rank.topPurchasers;
        const topAgents = rank.topAgents;
        if (topWinners && topWinners.length > 0) {
          const axis = [];
          const data = [];
          topWinners.reverse().forEach((item) => {
            axis.push(item.amount + '万元');
            data.push({
              name: item.winner,
              value: item.amount,
            });
          });
          this.rank.axis = axis;
          this.rank.data = data;
          this.rank.winners = { axis: axis, data: data };
        }
        if (topPurchasers && topPurchasers.length > 0) {
          const axis = [];
          const data = [];
          topPurchasers.reverse().forEach((item) => {
            axis.push(item.amount + '万元');
            data.push({
              name: item.purchaser,
              value: item.amount,
            });
          });
          this.rank.purchasers = { axis: axis, data: data };
        }
        if (topAgents && topAgents.length > 0) {
          const axis = [];
          const data = [];
          topAgents.reverse().forEach((item) => {
            axis.push(item.amount + '万元');
            data.push({
              name: item.agent,
              value: item.amount,
            });
          });
          this.rank.agents = { axis: axis, data: data };
        }
        this.rankLoading = false;
      }))
      .catch(action('get rank catch', (err) => {
        console.log(err, '-------------------------err');
        this.rankLoading = false;
      }));
  }

  // 中标信息
  @action.bound getInfo(params) {
    this.infoLoading = true;
    bidMarketApi.getInfo(params)
      .then(action('get info', (resp) => {
        this.areaInfo = resp.data.content;
        uiStore.uiState.bidMarketInfo.totalElements = resp.data.totalElements;
        this.infoLoading = false;
      }))
      .catch(action('get info catch', (err) => {
        console.log(err);
        this.infoLoading = false;
      }));
  }

  // 招投标信息详情
  @action.bound getBidMarketDetail(announceId, key, openModal) {
    this.detailLoading = true;
    bidMarketApi.getBidMarketDetail(announceId)
      .then(action('get bidMarket detail', (resp) => {
        this.detailTitleData = this.areaInfo[key];
        this.detailContent = resp.data.result;
        this.detailLoading = false;
        openModal();
      }))
      .catch(action('get bidMarket detail err', (err) => {
        console.log(err);
        messageStore.openMessage({ type: 'warning', content: '获取招投标详情失败' });
        this.detailLoading = false;
      }));
  }

  // 重置数据
  @action.bound resetStore() {
    uiStore.uiState.bidMarketInfo.index = 1;
    uiStore.uiState.bidMarketInfo.totalElements = 0;

    this.params = { province: '' };
    this.mapLoading = false;
    this.trendLoading = false;
    this.rankLoading = false;
    this.infoLoading = false;

    this.trend = { axis: [], amountData: [], countData: [] };

    this.tabSwitchIndex = 'winners';
    this.rank = {
      axis: [],
      data: [],
      winners: { axis: [], data: [] },
      purchasers: { axis: [], data: [] },
      agents: { axis: [], data: [] },
    };
    this.areaInfo = [];
    this.detailTitleData = {};
    this.detailContent = '';
  }
}
export default new BidMarketStore();
