import { observable, action, runInAction } from 'mobx';
import { getPathValue } from 'pathval';
import axios from 'axios';
import moment from 'moment';
import 'moment-range';
import geoCoordMap from 'helpers/geoCoordMap';
import provinceCityName from 'helpers/provinceCityName';
import { monitorStatisticsApi } from 'api';
class MonitorStatisticsStore {
  constructor() {
    this.cancel = [];
  }

  isEmptyObject(obj, key) {
    const result = getPathValue(this[obj], key);
    if (Object.keys(result).length) {
      return false;
    }
    return true;
  }

  // area颜色
  dealWithAreaColor(value) {
    let obj = {};
    if (value >= 1 && value <= 10) {
      obj = {
        normal: {
          color: '#c4ebad',
          borderColor: '#c4ebad',
          borderWidth: 1,
          opacity: 0.5,
        },
        emphasis: {
          color: '#c4ebad',
          borderColor: '#c4ebad',
          borderWidth: 1,
          opacity: 0.7,
        }
      };
    } else if (value >= 11 && value <= 20) {
      obj = {
        normal: {
          color: '#3fb1e3',
          borderColor: '#3fb1e3',
          borderWidth: 1,
          opacity: 0.5,
        },
        emphasis: {
          color: '#3fb1e3',
          borderColor: '#3fb1e3',
          borderWidth: 1,
          opacity: 0.7,
        }
      };
    } else if (value >= 21 && value <= 50) {
      obj = {
        normal: {
          color: '#a0a7e6',
          borderColor: '#a0a7e6',
          borderWidth: 1,
          opacity: 0.5,
        },
        emphasis: {
          color: '#a0a7e6',
          borderColor: '#a0a7e6',
          borderWidth: 1,
          opacity: 0.7,
        }
      };
    } else if (value > 50) {
      obj = {
        normal: {
          color: '#626c91',
          borderColor: '#626c91',
          borderWidth: 1,
          opacity: 0.5,
        },
        emphasis: {
          color: '#626c91',
          borderColor: '#626c91',
          borderWidth: 1,
          opacity: 0.7,
        }
      };
    }
    return obj;
  }

  // 补全时间
  dealWithDate(begin, end, result) {
    const compliteDate = [];
    const rangeMomentDate = moment.range(moment(begin), moment(end)).toArray('days');
    // 默认封装所有数据为0
    rangeMomentDate.forEach((item) => {
      compliteDate.push({
        eventCount: 0,
        companyCount: 0,
        date: item.format('YYYY-MM-DD'),
      });
    });
    // 匹配有的数据，然后赋值进去
    compliteDate.forEach((item) => {
      result.forEach((detail) => {
        if (detail.date === item.date) {
          item.eventCount = detail.eventCount;
          item.companyCount = detail.companyCount;
        }
      });
      item.date = moment(item.date).format('YYYY年MM月DD日');
    });
    return compliteDate;
  }

  // 补全头条趋势分析时间
  dealWithDate2(begin, end, result) {
    const compliteDate = [];
    const rangeMomentDate = moment.range(moment(begin), moment(end)).toArray('days');
    // 默认封装所有数据为0
    rangeMomentDate.forEach((item) => {
      compliteDate.push({
        date: item.format('YYYY-MM-DD'),
        all: 0,
        corp: 0,
        legal: 0,
        news: 0,
        operation: 0,
        stock: 0,
        team: 0
      });
    });
    // 匹配有的数据，然后赋值进去
    compliteDate.forEach((item) => {
      result.forEach((detail) => {
        if (detail.date === item.date) {
          item.all = detail.countMap.ALL;
          item.corp = detail.countMap.CORP;
          item.legal = detail.countMap.LEGAL;
          item.news = detail.countMap.NEWS;
          item.operation = detail.countMap.OPERATION;
          item.stock = detail.countMap.STOCK;
          item.team = detail.countMap.TEAM;
        }
      });
      item.date = moment(item.date).format('YYYY年MM月DD日');
    });
    return compliteDate;
  }

  @observable loadingGroup = {
    statistic: true,
    changeTrend: true,
    province: true,
    provinceAll: true,
    industryTrend: true,
    industryStatistics: true,
    headlines: true,
  };

  @observable errorBody = {
    changeTrend: {},
    province: {},
    provinceAll: {},
    industryTrend: {},
    industryStatistics: {},
    headlines: {},
  };

  @observable params = {};

  // 顶部四个板块store
  @observable statistic = {};

  // 变化趋势store
  @observable changeTrend = {
    result: [],
    mutual: {
      nowData: {},
      beforeData: {},
    }
  };
  @observable changeTrendData = {
    axis: [],
    companyData: [],
    eventData: []
  }

  /**
   * 地区相关store
   */
  @observable provinceName = '';
  @observable provinceAllSize;
  // 地区分布store
  @observable provinceAll = [];
  // 地区排行store
  @observable provinceBar = { axis: [], data: [] };
  // 地区变化趋势store
  @observable provinceLine = { axis: [], event: [], company: [] };
  // 企业地区分布store
  @observable provinceMap = {
    provinceRank: [],
    mapOption: { mapType: '', data: [] },
  };

  /**
   * 行业统计store
   */
  // 行业统计显示区块数store，最多显示10个
  @observable industryRankLength = 0;
  @observable industryId = '';
  @observable industryName = '';
  // 行业统计store
  @observable industryStatistics = [];
  // 行业统计变化趋势store
  @observable industryTrend = { axis: [], event: [], company: [] };

  /**
   * 头条相关store
   */
  @observable typeAll = '';
  @observable typeDefault = '工商更新';
  // 头条趋势分析store
  @observable headlinesTrend = {
    axis: [],
    all: [],
    corp: [],
    legal: [],
    news: [],
    operation: [],
    stock: [],
    team: []
  };
  // 头条类型分析store
  @observable headlinesType = [];

  // 设置数据
  @action.bound setParams(params) {
    this.params = params;
  }

  // 选择指定时间和类别请求数据
  @action.bound getChangeData(params) {
    // this.getStatistic(params);
    this.getChangeTrend(params);
    this.getProvinceAll(params);
    this.getIndustryStatistics(params);
    this.getHeadlines(params);
  }

  // 设置loading
  @action.bound setLoading(key, status = false) {
    this.loadingGroup[key] = status;
  }

  // 设置errorBody
  @action.bound setErrorBody(key, body = {}) {
    this.errorBody[key] = body;
  }

  // 头顶的四个板块
  @action.bound getStatistic(params) {
    this.setLoading('statistic', true);
    const source = axios.CancelToken.source();
    monitorStatisticsApi.getStatistic({ params: params, cancelToken: source.token})
      .then(action('get statistic', (resp) => {
        this.statistic = resp.data;
        this.setLoading('statistic');
      }))
      .catch((err) => {
        if (!axios.isCancel(err)) {
          runInAction(() => {
            this.setErrorBody('statistic', err.response.data);
            this.setLoading('statistic');
          });
        }
      });
    this.cancel.push(source.cancel);
  }

  // 变化趋势
  @action.bound getChangeTrend(params) {
    this.setLoading('changeTrend', true);
    const source = axios.CancelToken.source();
    monitorStatisticsApi.getChangeTrend({ params: params, cancelToken: source.token })
      .then(action('get change trend', (resp) => {
        const xAxisDate = [];
        const companyData = [];
        const eventData = [];
        let changeTrendData = [];
        if (resp.data && resp.data.length > 0) {
          changeTrendData = resp.data;
          for (let idx = 1; idx < changeTrendData.length; idx++) {
            xAxisDate.push(moment(changeTrendData[idx].date).format('YYYY年MM月DD日'));
            companyData.push({
              value: changeTrendData[idx].companyCount,
              companyChange: changeTrendData[idx].companyChange,
              nowData: changeTrendData[idx],
              beforeData: changeTrendData[idx - 1],
            });
            eventData.push({
              value: changeTrendData[idx].eventCount,
              eventChange: changeTrendData[idx].eventChange,
              nowData: changeTrendData[idx],
              beforeData: changeTrendData[idx - 1],
            });
          }
        }
        this.changeTrendData.axis = xAxisDate;
        this.changeTrendData.companyData = companyData;
        this.changeTrendData.eventData = eventData;
        // 设置右边table框的数据，默认是今天和今天的昨天，反正就是最后的两个
        this.changeTrend.mutual.nowData = changeTrendData[changeTrendData.length - 1];
        this.changeTrend.mutual.beforeData = changeTrendData[changeTrendData.length - 2];
        this.setLoading('changeTrend');
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          runInAction(() => {
            this.setErrorBody('changeTrend', err.response.data);
            this.setLoading('changeTrend');
          });
        }
      });
    this.cancel.push(source.cancel);
  }

  @action.bound setChangeTable(params) {
    this.changeTrend.mutual = params;
  }

  // 获取所有地区分布
  @action.bound getProvinceAll(params) {
    this.setLoading('provinceAll', true);
    const source = axios.CancelToken.source();
    monitorStatisticsApi.getProvinceAll({ params: params, cancelToken: source.token })
      .then(action('get province all', (resp) => {
        const provinceAllMapData = [];
        const provinceBarSeriesData = [];
        const provinceBarYAxisData = [];
        let provinceAllData = resp.data;
        let provinceName = '';
        if (provinceAllData.length) {
          provinceAllData = provinceAllData.sort((prev, next) => {
            return prev.companyCount - next.companyCount;
          });
          if (provinceAllData.length <= 2) {
            provinceAllData.map((item) => {
              if (item.area !== '未知' && item.area !== '其他') {
                provinceName = item.area;
              }
            });
          } else {
            provinceName = provinceAllData[provinceAllData.length - 1].area;
            if (provinceName === '未知'
              || provinceName === '其他') {
              provinceName = provinceAllData[provinceAllData.length - 2].area;
              if (provinceName === '未知'
                || provinceName === '其他') {
                provinceName = provinceAllData[provinceAllData.length - 3].area;
              }
            }
          }
          provinceAllData.forEach((item, idx) => {
            // 地图数据
            if (item.area !== '未知' && item.area !== '其他') {
              provinceAllMapData.push({
                name: item.area,
                value: [
                  geoCoordMap[item.area][0],
                  geoCoordMap[item.area][1],
                  item.companyCount
                ],
                itemStyle: this.dealWithAreaColor(item.companyCount)
              });
            } else {
              provinceAllMapData.push({
                name: item.area,
                value: item.companyCount,
                itemStyle: this.dealWithAreaColor(item.companyCount)
              });
            }

            // 右边柱状图数据
            provinceBarYAxisData.push(`${provinceAllData.length - idx}.${item.area}`);
            provinceBarSeriesData.push(item.companyCount);
          });
        }
        this.provinceAll = provinceAllMapData;
        this.provinceAllSize = provinceAllData.length;
        this.provinceBar.axis = provinceBarYAxisData;
        this.provinceBar.data = provinceBarSeriesData;
        this.provinceName = provinceName;
        this.setLoading('provinceAll');
        this.getProvince({ params: { ...params, province: provinceName } });
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          runInAction(() => {
            this.setErrorBody('provinceAll', err.response.data);
            this.setLoading('provinceAll');
          });
        }
      });
    this.cancel.push(source.cancel);
  }

  // 获取选定区域
  @action.bound getProvince({params}) {
    this.setLoading('province', true);
    const source = axios.CancelToken.source();
    monitorStatisticsApi.getProvince({ params, cancelToken: source.token })
      .then(action('get province', (resp) => {
        const provinceDate = [];
        const provinceEvent = [];
        const provinceCompany = [];
        const provinceMapData = [];
        let provinceAreaName = '';
        const paramsDate = params;
        let provinceData = resp.data;
        let provinceTrendData = provinceData.trend;
        let provinceRank = provinceData.rank;
        if (provinceTrendData.length && provinceRank.length) {
          let isRealm = false;
          const compliteDate2 = this.dealWithDate(paramsDate.begin, paramsDate.end, provinceTrendData);
          provinceAreaName = paramsDate.province;
          compliteDate2.map((item) => {
            provinceDate.push(item.date);
            provinceEvent.push(item.eventCount);
            provinceCompany.push(item.companyCount);
          });
          provinceRank = provinceRank.sort((prev, next) => {
            return next.companyCount - prev.companyCount;
          });
          for (let idx = 0; idx < provinceCityName.length; idx++) {
            if (provinceCityName[idx].indexOf(paramsDate.province) !== -1) {
              isRealm = true;
              break;
            }
          }
          if (isRealm) {
            provinceRank.forEach((item) => {
              if (item.area.indexOf('市') === -1
                && item.area.indexOf('区') === -1
                && item.area.indexOf('县') === -1
                && item.area.indexOf('自治州') === -1) {
                provinceMapData.push({
                  name: item.area + '市',
                  value: item.companyCount,
                  itemStyle: {
                    normal: {
                      areaColor: '#a5d6a7'
                    },
                    emphasis: {
                      areaColor: '#a5d6a7'
                    },
                  }
                });
              } else {
                provinceMapData.push({
                  name: item.area,
                  value: item.companyCount,
                  itemStyle: {
                    normal: {
                      areaColor: '#a5d6a7'
                    },
                    emphasis: {
                      areaColor: '#a5d6a7'
                    },
                  }
                });
              }
            });
          } else {
            provinceRank.forEach((item) => {
              provinceMapData.push({
                name: item.area,
                value: item.companyCount,
                itemStyle: {
                  normal: {
                    areaColor: '#a5d6a7'
                  },
                  emphasis: {
                    areaColor: '#a5d6a7'
                  },
                }
              });
            });
          }
        } else {
          provinceData = provinceTrendData = provinceRank = [];
        }
        this.provinceLine.axis = provinceDate;
        this.provinceLine.event = provinceEvent;
        this.provinceLine.company = provinceCompany;
        this.provinceMap.mapOption.data = provinceMapData;
        this.provinceMap.mapOption.mapType = provinceAreaName;
        this.provinceMap.provinceRank = provinceRank;
        this.setLoading('province');
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          runInAction(() => {
            this.setErrorBody('province', err.response.data);
            this.setLoading('province');
          });
        }
      });
    this.cancel.push(source.cancel);
  }

  // 设置选定区域名称
  @action.bound setProvinceName(provinceName) {
    this.provinceName = provinceName;
  }

  // 获取行业统计
  @action.bound getIndustryStatistics(params) {
    this.setLoading('industryStatistics', true);
    const source = axios.CancelToken.source();
    monitorStatisticsApi.getIndustryStatistics({ params: params, cancelToken: source.token})
      .then(action('get industry statistics', (resp) => {
        const statisticSeriesData = [];
        let industryId = '';
        let industryName = '';
        let statisticDataSum = 0;
        const statisticDataPer = [];
        let statisticData = resp.data;
        if (statisticData.length) {
          const pieColor = [
            '#80cbc4',
            '#a5d6a7',
            '#c5e1a5',
            '#90caf9',
            '#7986cb',
            '#b0bec5',
            '#bcaaa4',
            '#ffe082',
            '#fff59d',
            '#e6ee9c',
          ];
          // 只取前10个，没有10个，直接赋值数组长度
          let dataLength = 0;
          if (statisticData.length >= 10) {
            dataLength = 10;
          } else {
            dataLength = statisticData.length;
          }
          // 算总数
          statisticData.forEach((item) => {
            statisticDataSum += item.monitorCount;
          });
          // 排序，从大到小
          statisticData = statisticData.sort((prev, next) => {
            return next.monitorCount - prev.monitorCount;
          });
          // 算百分比，最多保留两位小数
          statisticData.forEach((item) => {
            let per = item.monitorCount / statisticDataSum * 100;
            per = per.toFixed(2);
            statisticDataPer.push(per);
          });
          // 封装数据
          for (let idx = 0; idx < dataLength; idx++) {
            statisticSeriesData.push({
              value: statisticData[idx].monitorCount,
              name: statisticData[idx].industryName,
              industryId: statisticData[idx].industryId,
              per: statisticDataPer[idx],
              itemStyle: {
                normal: {
                  color: pieColor[idx]
                }
              },
            });
          }
          industryId = statisticData[0].industryId;
          industryName = statisticData[0].industryName;
        }
        this.industryStatistics = statisticSeriesData;
        this.industryId = industryId;
        this.industryName = industryName;
        this.industryRankLength = statisticData.length;
        this.setLoading('industryStatistics');
        this.getIndustryTrend({ params: { ...params, industryId: industryId } });
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          runInAction(() => {
            this.setErrorBody('industryStatistics', err.response.data);
            this.setLoading('industryStatistics');
          });
        }
      });
    this.cancel.push(source.cancel);
  }

  // 行业变化趋势
  @action.bound getIndustryTrend({params}) {
    this.setLoading('industryTrend', true);
    const source = axios.CancelToken.source();
    monitorStatisticsApi.getIndustryTrend({ params, cancelToken: source.token })
      .then(action('get industry trend', (resp) => {
        const statisticTrendDate = [];
        const statisticTrendEvent = [];
        const statisticTrendCompany = [];
        const statisticTrendData = resp.data;
        let compliteDate = [];
        if (statisticTrendData.length) {
          compliteDate = this.dealWithDate(params.begin, params.end, statisticTrendData);
          compliteDate.forEach((item) => {
            statisticTrendDate.push(item.date);
            statisticTrendEvent.push(item.eventCount);
            statisticTrendCompany.push(item.companyCount);
          });
        }
        this.industryTrend.axis = statisticTrendDate;
        this.industryTrend.event = statisticTrendEvent;
        this.industryTrend.company = statisticTrendCompany;
        this.setLoading('industryTrend');
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          runInAction(() => {
            this.setErrorBody('industryTrend', err.response.data);
            this.setLoading('industryTrend');
          });
        }
      });
    this.cancel.push(source.cancel);
  }

  // 设置选定行业名称
  @action.bound setIndustryName(industryName) {
    this.industryName = industryName;
  }

  // 获取头条数据
  @action.bound getHeadlines(params) {
    this.setLoading('headlines', true);
    const source = axios.CancelToken.source();
    monitorStatisticsApi.getHeadlines({ params: params, cancelToken: source.token })
      .then(action('get headlines', (resp) => {
        const sourceTrendDate = [];
        const sourceTrendAll = [];
        const sourceTrendCorp = [];
        const sourceTrendLegal = [];
        const sourceTrendNews = [];
        const sourceTrendOperation = [];
        const sourceTrendStock = [];
        const sourceTrendTeam = [];
        const pieSource = [];
        let compliteSourceDate = [];
        const sourceTrend = resp.data.sourceTrend;
        const sourceRatioMap = resp.data.sourceRatioMap;
        // 判断是否为空对象
        const sourceRatioMapIsEmpty = ((obj) => {
          for (const name in obj) {
            if (obj.hasOwnProperty(name)) {
              return false;
            }
          }
          return true;
        })(sourceRatioMap);
        let defaultText;
        if (sourceTrend.length && !sourceRatioMapIsEmpty) {
          compliteSourceDate = this.dealWithDate2(params.begin, params.end, sourceTrend);
          compliteSourceDate.forEach((item) => {
            sourceTrendDate.push(item.date);
            sourceTrendAll.push(item.all || 0);
            sourceTrendCorp.push(item.corp || 0);
            sourceTrendLegal.push(item.legal || 0);
            sourceTrendNews.push(item.news || 0);
            sourceTrendOperation.push(item.operation || 0);
            sourceTrendStock.push(item.stock || 0);
            sourceTrendTeam.push(item.team || 0);
          });
          // 南丁格尔玫瑰图 {value: 10, name: 'rose1'}
          // 各分类条目
          const optionsMap = {};
          Object.keys(sourceRatioMap).forEach((key) => {
            const thisOptions = [];
            Object.keys(sourceRatioMap[key].detailSource).forEach((key_) => {
              thisOptions.push({ key: key_, value: sourceRatioMap[key].detailSource[key_] });
            });
            optionsMap[key] = thisOptions;
          });
          const pieSourceCORP = {
            name: '工商更新',
            value: sourceRatioMap.CORP ? sourceRatioMap.CORP.total : 0,
            data: optionsMap.CORP ? optionsMap.CORP : [],
            itemStyle: { normal: { color: '#787464' } }
          };
          const pieSourceLEGAL = {
            name: '法务更新',
            value: sourceRatioMap.LEGAL ? sourceRatioMap.LEGAL.total : 0,
            data: optionsMap.LEGAL ? optionsMap.LEGAL : [],
            itemStyle: { normal: { color: '#6EA0A7' } }
          };
          const pieSourceNEWS = {
            name: '舆情更新',
            value: sourceRatioMap.NEWS ? sourceRatioMap.NEWS.total : 0,
            data: optionsMap.NEWS ? optionsMap.NEWS : [],
            itemStyle: { normal: { color: '#909F8C' } }
          };
          const pieSourceOPERATION = {
            name: '经营更新',
            value: sourceRatioMap.OPERATION ? sourceRatioMap.OPERATION.total : 0,
            data: optionsMap.OPERATION ? optionsMap.OPERATION : [],
            itemStyle: { normal: { color: '#6E7074' } }
          };
          const pieSourceSTOCK = {
            name: '上市公告',
            value: sourceRatioMap.STOCK ? sourceRatioMap.STOCK.total : 0,
            data: optionsMap.STOCK ? optionsMap.STOCK : [],
            itemStyle: { normal: { color: '#CEAC85' } }
          };
          const pieSourceTEAM = {
            name: '团队更新',
            value: sourceRatioMap.TEAM ? sourceRatioMap.TEAM.total : 0,
            data: optionsMap.TEAM ? optionsMap.TEAM : [],
            itemStyle: { normal: { color: '#E5A18F' } }
          };
          // set defaultText push options
          [pieSourceCORP, pieSourceLEGAL, pieSourceNEWS, pieSourceOPERATION, pieSourceSTOCK, pieSourceTEAM].forEach((item) => {
            if (item.value > 0) {
              pieSource.unshift(item);
              defaultText = !defaultText ? item.name : defaultText;
            }
          });
        }
        this.headlinesTrend.axis = sourceTrendDate;
        this.headlinesTrend.all = sourceTrendAll;
        this.headlinesTrend.corp = sourceTrendCorp;
        this.headlinesTrend.legal = sourceTrendLegal;
        this.headlinesTrend.news = sourceTrendNews;
        this.headlinesTrend.operation = sourceTrendOperation;
        this.headlinesTrend.stock = sourceTrendStock;
        this.headlinesTrend.team = sourceTrendTeam;

        this.headlinesType = pieSource;
        this.setLoading('headlines');
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          runInAction(() => {
            this.setErrorBody('headlines', err.response.data);
            this.setLoading('headlines');
          });
        }
      });
    this.cancel.push(source.cancel);
  }
}
export default new MonitorStatisticsStore();
