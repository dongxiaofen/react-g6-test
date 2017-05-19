import { observable, action } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import { bidMarketApi } from 'api';
import uiStore from './ui';
import messageStore from './message';
import areaLanLon from 'helpers/areaLanLon';
import bidMarketMapColor from 'helpers/bidMarketMapColor';

class BidMarketStore {
  constructor() {
    this.cancels = [];
  }
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

  // 处理一级城市坐标
  dealWithCountyLanLon(item) {
    for (let idx = 0; idx < areaLanLon.length; idx++) {
      if (item.shortName === areaLanLon[idx].shortName) {
        return [
          areaLanLon[idx].lon,
          areaLanLon[idx].lat,
          item.count,
          item.amount,
          areaLanLon[idx].layer
        ];
      }
    }
  }

  // 处理二级城市坐标
  dealWithAreaLanLon(province, item) {
    let subRegion;
    for (let idx = 0; idx < areaLanLon.length; idx++) {
      if (areaLanLon[idx].shortName === province) {
        subRegion = areaLanLon[idx].subRegion;
        break;
      }
    }
    for (let idx = 0; idx < subRegion.length; idx++) {
      if (subRegion[idx].name === item.city) {
        return [
          subRegion[idx].lon,
          subRegion[idx].lat,
          item.count,
          item.amount,
          subRegion[idx].layer
        ];
      }
    }
  }

  // 处理地图分组
  dealWithGroup(arr) {
    // 处理分组增量
    const dealWithGroupIncrement = (groupNum, maxData) => {
      let increment = parseInt(maxData / groupNum, 10);
      const incrementDigit = increment % 10;
      if (incrementDigit < 5) {
        increment = increment + 5 - incrementDigit;
      } else if (incrementDigit >= 5) {
        increment = increment + 10 - incrementDigit;
      }
      return increment;
    };

    // 处理分组区间
    const dealWithGroupInterval = (groupNum, groupIncrement) => {
      const outputInterval = [];
      let increment = 0;
      outputInterval.push(increment);
      outputInterval.push(increment + groupIncrement);
      increment += groupIncrement;
      for (let idx = 2; idx <= groupNum; idx++) {
        outputInterval.push(increment + 1);
        outputInterval.push(increment + groupIncrement);
        increment += groupIncrement;
      }
      return outputInterval;
    };

    let groupNum = 1;
    let groupIncrement = 0;
    let interval;

    // 取出最大的值
    const arrSort = arr.sort((prev, next) => { return next.count - prev.count; });
    let maxData;
    if (arrSort.length > 1) {
      maxData = arrSort[0].shortName !== '省级'
            && arrSort[0].shortName !== '市级' ?
                arrSort[0].count :
                arrSort[1].count;
    } else {
      maxData = arrSort[0].count;
    }

    // 根据最大值来设置要分几个组
    if (maxData > 30 && maxData <= 100) {
      groupNum = 3;
    } else if (maxData > 100) {
      groupNum = 5;
    }

    // 计算分组的增量
    if (groupNum !== 1) {
      groupIncrement = dealWithGroupIncrement(groupNum, maxData);
      interval = dealWithGroupInterval(groupNum, groupIncrement);
    } else {
      interval = [0, maxData + (10 - maxData % 10)];
    }
    return interval;
  }

  // 处理地图圆圈大小和颜色
  dealWithSymbol(itemCount, groupInterval, type) {
    const size = [20, 25, 30, 35, 40];
    const length = groupInterval.length / 2;
    let index = 0;
    for (let idx = 0; idx < length; idx++) {
      index = idx * 2;
      if (itemCount >= groupInterval[index]
        && itemCount <= groupInterval[index + 1] ) {
        return type === 'size' ? size[idx] : bidMarketMapColor[idx];
      }
    }
  }

  @observable params = { province: '' };
  @observable areaLoading = false;
  @observable trendLoading = false;
  @observable rankLoading = false;
  @observable infoLoading = false;

  @observable area = { data: [] };
  @observable groupInterval = [];
  @observable mapName = 'china';
  @observable subText = '';

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

  // 设置全国请求
  @action.bound setParams(params) {
    params.index = 1;
    this.params = params;
    this.getDistribution(params);
    this.getTrend(params);
    this.getRank(params);

    const infoIndex = uiStore.uiState.bidMarketInfo.index;
    if (infoIndex === 1) {
      this.getInfo(params);
    } else {
      uiStore.uiState.bidMarketInfo.index = 1;
    }
  }

  // 设置二级城市或地区请求
  @action.bound setParamsCity(params) {
    params.index = 1;
    this.params = params;
    this.getTrend(params);
    this.getRank(params);

    const infoIndex = uiStore.uiState.bidMarketInfo.index;
    if (infoIndex === 1) {
      this.getInfo(params);
    } else {
      uiStore.uiState.bidMarketInfo.index = 1;
    }
  }

  // 全国分布和地区分布
  @action.bound getDistribution(params) {
    const source = axios.CancelToken.source();
    const { from, to, province, city } = params;
    const mapItemConfig = (color) => {
      return {
        itemStyle: {
          normal: {
            color: color,
            borderColor: color,
            borderWidth: 1,
            opacity: 0.5,
          },
          emphasis: {
            color: color,
            borderColor: color,
            borderWidth: 1,
            opacity: 0.7,
          }
        }
      };
    };
    this.subText = '';
    this.areaLoading = true;
    if (province) {
      bidMarketApi.getArea({ params: { from, to, province, city }, cancelToken: source.token })
        .then(action('get area', (resp) => {
          let areaGroupInterval = [];
          let subText = '';
          const mapData = [];
          const result = resp.data.result;
          if (result.length > 0) {
            areaGroupInterval = this.dealWithGroup(result);
            result.forEach((item) => {
              const color = this.dealWithSymbol(item.count, areaGroupInterval, 'color');
              if (item.shortName !== '市级' && item.shortName !== '省级') {
                mapData.push({
                  name: item.shortName,
                  value: this.dealWithAreaLanLon(province, item),
                  symbolSize: this.dealWithSymbol(item.count, areaGroupInterval, 'size'),
                  ...mapItemConfig(color)
                });
              } else {
                subText = '，其中' + item.shortName + item.count + '家';
              }
            });
            this.groupInterval = areaGroupInterval;
            this.mapName = province;
            this.area.data = mapData;
            this.subText = subText;
          }
          this.areaLoading = false;
        }))
        .catch(action('get area catch', (err) => {
          console.log(err);
          if (!axios.isCancel(err)) {
            this.areaLoading = false;
          }
        }));
    } else {
      bidMarketApi.getCountry({ params: { from: from, to: to }, cancelToken: source.token })
        .then(action('get all', (resp) => {
          const result = resp.data.result;
          if (result && result.length > 0) {
            let allGroupInterval = [];
            const mapData = [];
            allGroupInterval = this.dealWithGroup(result);
            result.forEach((item) => {
              const color = this.dealWithSymbol(item.count, allGroupInterval, 'color');
              mapData.push({
                name: item.shortName,
                value: this.dealWithCountyLanLon(item),
                symbolSize: this.dealWithSymbol(item.count, allGroupInterval, 'size'),
                ...mapItemConfig(color)
              });
            });
            this.mapName = 'china';
            this.groupInterval = allGroupInterval;
            this.area.data = mapData;
          }
          this.areaLoading = false;
        }))
        .catch(action('get all catch', (err) => {
          console.log(err.response);
          if (!axios.isCancel(err)) {
            this.areaLoading = false;
          }
        }));
    }
    this.cancels.push(source.cancel);
  }

  // 变化趋势
  @action.bound getTrend(params) {
    const source = axios.CancelToken.source();
    const { from, to, province, city } = params;
    this.trendLoading = true;
    bidMarketApi.getTrend({ params: { from, to, province, city }, cancelToken: source.token })
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
        if (!axios.isCancel(err)) {
          this.trendLoading = false;
        }
      }));
    this.cancels.push(source.cancel);
  }

  // 设置中标金额总量排行switch
  @action.bound setSwitchTab(key) {
    this.tabSwitchIndex = key;
    this.rank.axis = this.rank[key].axis;
    this.rank.data = this.rank[key].data;
  }

  // 中标金额总量排行
  @action.bound getRank(params) {
    const source = axios.CancelToken.source();
    const { from, to, province, city } = params;
    this.rankLoading = true;
    bidMarketApi.getRank({ params: { from, to, province, city }, cancelToken: source.token })
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
        if (!axios.isCancel(err)) {
          this.rankLoading = false;
        }
      }));
    this.cancels.push(source.cancel);
  }

  // 中标信息
  @action.bound getInfo(params) {
    const source = axios.CancelToken.source();
    this.infoLoading = true;
    bidMarketApi.getInfo({ params: params, cancelToken: source.token })
      .then(action('get info', (resp) => {
        this.areaInfo = resp.data.content;
        uiStore.uiState.bidMarketInfo.totalElements = resp.data.totalElements;
        this.infoLoading = false;
      }))
      .catch(action('get info catch', (err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.infoLoading = false;
        }
      }));
    this.cancels.push(source.cancel);
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
    this.cancels = [];

    uiStore.uiState.bidMarketInfo.index = 1;
    uiStore.uiState.bidMarketInfo.totalElements = 0;

    this.params = { province: '' };
    this.areaLoading = false;
    this.trendLoading = false;
    this.rankLoading = false;
    this.infoLoading = false;

    this.area = { data: [] };
    this.groupInterval = [];
    this.mapName = 'china';
    this.subText = '';

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
