import { observable, action } from 'mobx';
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
    const analysisData = [];
    let pointer;
    const beginDate = moment(begin, 'YYYY-MM-DD');
    result.forEach((item, idx) => {
      const nowData = moment(item.date, 'YYYY-MM-DD');
      if (idx === 0 && begin !== item.date) {
        const startDay = Number(nowData.from(beginDate).split(' ')[1]);
        analysisData.push({ date: beginDate.format('YYYY年MM月DD日') });
        if (!isNaN(startDay)) {
          for (let num = 0; num < startDay - 1; num++) {
            analysisData.push({ date: beginDate.add(1, 'days').format('YYYY年MM月DD日') });
          }
        }
      }
      if (pointer) {
        const fromDay = Number(nowData.from(pointer).split(' ')[1]);
        if (!isNaN(fromDay)) {
          for (let num = 0; num < fromDay - 1; num++) {
            analysisData.push({ date: pointer.add(1, 'days').format('YYYY年MM月DD日') });
          }
        }
      }
      pointer = nowData;
      const analysisItem = { date: nowData.format('YYYY年MM月DD日') };
      Object.keys(item.countMap).forEach((key) => {
        analysisItem[key.toLowerCase()] = item.countMap[key] || 0;
      });
      analysisData.push(analysisItem);
      if (idx === result.length - 1 && analysisData.length < 30) {
        const days = 30 - analysisData.length;
        for (let num = 0; num < days; num++) {
          analysisData.push({ date: pointer.add(1, 'days').format('YYYY年MM月DD日') });
        }
      }
    });
    return analysisData;
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
    },
    chartOption: {
      dataZoom: [
        {
          type: 'slider',
          bottom: 0,
          dataBackground: {
            areaStyle: {
              color: '#eeeeee',
            },
          },
          fillerColor: 'rgba(230, 230, 230, 0.4)',
          handleStyle: {
            color: '#dddddd'
          },
        },
        {
          type: 'inside',
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        backgroundColor: '#ffffff',
        padding: [0, 0],
        formatter: (ticket) => {
          const str = `
          <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
            <p style="text-align: center; padding-bottom: 10px;">
              <a style="color: #999999;">
                ${ticket[0].name}
              </a>
            </p>
            <p style="text-align: center; padding-bottom: 6px;">
              <a style="color: #3483e9;">
                <span style="padding-right: 15px">${ticket[1].seriesName}</span>
                <span>${ticket[1].value}</span>条
              </a>
            </p>
            <p style="text-align: center;">
              <a style="color: #ffbd3d;">
                <span style="padding-right: 15px">${ticket[0].seriesName}</span>
                <span>${ticket[0].value}</span>家
              </a>
            </p>
          </div>`;
          return str;
        },
      },
      grid: {
        top: '10',
        left: '3%',
        right: '4%',
        bottom: '45',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#f5f5f5'
          }
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
        data: []
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: '头条更新企业',
          type: 'line',
          stack: '总量1',
          lineStyle: {
            normal: {
              color: '#ffbd3d',
              width: 3,
            }
          },
          itemStyle: {
            normal: {
              color: '#ffbd3d',
            }
          },
          data: [],
        },
        {
          name: '头条更新信息',
          type: 'line',
          stack: '总量2',
          lineStyle: {
            normal: {
              color: '#3483e9',
              width: 3,
            }
          },
          itemStyle: {
            normal: {
              color: '#3483e9'
            }
          },
          data: []
        },
      ]
    }
  };

  /**
   * 地区相关store
   */
  @observable provinceName = '';
  @observable provinceAllSize;
  // 地区分布store
  @observable provinceAll = {
    result: [],
    chartOption: {
      tooltip: {
        backgroundColor: '#ffffff',
        padding: [0, 0],
        textStyle: {
          color: '#4d4d4d',
        },
        formatter: (ticket) => {
          const str = `
            <div style="box-shadow: 0 0 4px #ccc; padding: 10px 20px;">
              <p style="text-align: center;">
                <a style="color:#999999;">
                  ${ticket.name}
                </a>
                <a style="color: ${ticket.color};">
                  <span style="padding-left: 15px">
                    ${ticket.value[2]}
                  </span>家
                </a>
              </p>
            </div>`;
          return str;
        }
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false,
          }
        },
        layoutCenter: ['50%', '50%'],
        layoutSize: '130%',
        itemStyle: {
          normal: {
            areaColor: '#E7E8EA',
            borderColor: '#ffffff',
          },
          emphasis: {
            areaColor: '#E7E8EA',
            borderColor: '#ffffff',
          },
        },
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: (data) => {
            const value = data[2];
            if (value >= 1 && value <= 10) {
              return 20;
            } else if (value >= 11 && value <= 20) {
              return 25;
            } else if (value >= 21 && value <= 50) {
              return 30;
            }
            return 40;
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'inside',
              show: true,
              textStyle: {
                color: '#333333',
              }
            },
          },
          data: []
        },
      ]
    },
  };
  // 地区排行store
  @observable provinceBar = {
    result: [],
    chartOption: {
      tooltip: {
        backgroundColor: '#ffffff',
        padding: [0, 0],
        formatter: (ticket) => {
          const name = ticket.name.split('.');
          const str = `
            <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
              <p style="text-align: center;">
                <a style="color:#999999;">
                  ${name[1]}
                </a>
                <a style="color:#81B3EE;">
                  <span style="padding-left: 15px">
                    ${ticket.value}
                  </span>家
                </a>
              </p>
            </div>`;
          return str;
        },
      },
      dataZoom: [
        {
          type: 'slider',
          yAxisIndex: 0,
          right: '2%',
          dataBackground: {
            areaStyle: {
              color: '#eeeeee',
            },
          },
          fillerColor: 'rgba(230, 230, 230, 0.4)',
          handleStyle: {
            color: '#dddddd'
          },
        },
        {
          type: 'inside',
          yAxisIndex: 0,
        }
      ],
      grid: {
        top: 0,
        left: '1%',
        right: '10%',
        bottom: 0,
        containLabel: true
      },
      barMaxWidth: 7,
      xAxis: {
        type: 'value',
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
        data: []
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#81B3EE',
            },
          },
          label: {
            normal: {
              show: true,
              position: 'right'
            }
          },
          data: []
        }
      ]
    }
  };
  // 地区变化趋势store
  @observable provinceLine = {
    result: [],
    chartOption: {
      dataZoom: [
        {
          type: 'slider',
          bottom: 0,
          dataBackground: {
            areaStyle: {
              color: '#eeeeee',
            },
          },
          fillerColor: 'rgba(230, 230, 230, 0.4)',
          handleStyle: {
            color: '#dddddd'
          },
        },
        {
          type: 'inside',
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        backgroundColor: '#ffffff',
        padding: [0, 0],
        formatter: (ticket) => {
          const str = `
            <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
              <p style="text-align: center; padding-bottom: 10px;">
                <a style="color:#999999;">
                  ${ticket[0].name}
                </a>
              </p>
              <p style="text-align: center; padding-bottom: 3px;">
                <a style="color: #80b3ef;">
                  <span style="padding-right: 15px">${ticket[0].seriesName}</span>
                  <span>${ticket[0].value}</span>条
                </a>
              </p>
              <p style="text-align: center;">
                <a style="color: #c4ebad;">
                  <span style="padding-right: 15px">${ticket[1].seriesName}</span>
                  <span>${ticket[1].value}</span>家
                </a>
              </p>
            </div>`;
          return str;
        },
      },
      grid: {
        top: '10',
        left: '4%',
        right: '120',
        bottom: '45',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: ['#f5f5f5']
          }
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
        data: []
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: '头条更新信息',
          type: 'line',
          stack: '总量1',
          areaStyle: { normal: {} },
          lineStyle: {
            normal: {
              color: '#80b3ef',
              width: 3,
            }
          },
          itemStyle: {
            normal: {
              color: '#80b3ef',
            }
          },
          data: [],
        },
        {
          name: '头条更新企业',
          type: 'line',
          stack: '总量2',
          areaStyle: { normal: {} },
          lineStyle: {
            normal: {
              color: '#c4ebad',
              width: 3,
            }
          },
          itemStyle: {
            normal: {
              color: '#c4ebad'
            }
          },
          data: []
        },
      ]
    },
  };
  // 企业地区分布store
  @observable provinceMap = {
    result: [],
    provinceRank: [],
    chartOption: {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        backgroundColor: '#ffffff',
        padding: [0, 0],
        formatter: (ticket) => {
          let str = '';
          if (ticket.value) {
            str = `
                <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
                  <p style="text-align: center;">
                    <a style="color:#999999;">
                      ${ticket.name}
                    </a>
                    <a style="color: #a5d6a7;">
                      <span style="padding-left: 15px">
                        ${ticket.value}
                      </span>家
                    </a>
                  </p>
                </div>`;
          }
          return str;
        },
      },
      series: [
        {
          type: 'map',
          mapType: '',
          label: {
            emphasis: {
              show: false,
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#E7E8EA',
              borderColor: '#ffffff',
            },
            emphasis: {
              areaColor: '#E7E8EA',
              borderColor: '#ffffff',
            },
          },
          data: [],
        }
      ]
    },
  };

  /**
   * 行业统计store
   */
  // 行业统计显示区块数store，最多显示10个
  @observable industryRankLength = 0;
  @observable industryId = '';
  @observable industryName = '';
  // 行业统计store
  @observable industryStatistics = {
    result: {},
    chartOption: {
      tooltip: {
        backgroundColor: '#ffffff',
        padding: [0, 0],
        formatter: (ticket) => {
          const str = `
          <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
            <p style="text-align: center; padding-bottom: 10px;">
              <a style="color:#999999;">
                ${ticket.name}
              </a>
            </p>
            <p style="text-align: center; padding-bottom: 3px;">
              <a style="color: #3483e9;">
                <span style="padding-right: 15px">企业数量</span>
                <span>${ticket.data.value}</span>家
              </a>
            </p>
            <p style="text-align: center;">
              <a style="color: #3483e9;">
                <span style="padding-right: 15px">所占比例</span>
                <span>${ticket.data.per}</span>%
              </a>
            </p>
          </div>`;
          return str;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['63%', '85%'],
          avoidLabelOverlap: true,
          labelLine: {
            normal: {
              length2: 30,
              lineStyle: {
                color: '#999999',
              }
            }
          },
          label: {
            normal: {
              textStyle: {
                color: '#999999',
              }
            }
          },
          data: [],
        }
      ]
    },
  };
  // 行业统计变化趋势store
  @observable industryTrend = {
    result: {},
    chartOption: {
      dataZoom: [
        {
          type: 'slider',
          bottom: 0,
          dataBackground: {
            areaStyle: {
              color: '#eeeeee',
            },
          },
          fillerColor: 'rgba(230, 230, 230, 0.4)',
          handleStyle: {
            color: '#dddddd'
          },
        },
        {
          type: 'inside',
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        backgroundColor: '#ffffff',
        padding: [0, 0],
        formatter: (ticket) => {
          const str = `
          <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
            <p style="text-align: center; padding-bottom: 10px;">
              <a style="color:#999999;">
                ${ticket[0].name}
              </a>
            </p>
            <p style="text-align: center; padding-bottom: 3px;">
              <a style="color: #b0bec5;">
                <span style="padding-right: 15px">${ticket[0].seriesName}</span>
                <span>${ticket[0].value}</span>条
              </a>
            </p>
            <p style="text-align: center;">
              <a style="color: #bcaaa4;">
                <span style="padding-right: 15px">${ticket[1].seriesName}</span>
                <span>${ticket[1].value}</span>家
              </a>
            </p>
          </div>`;
          return str;
        },
      },
      grid: {
        top: '10',
        left: '4%',
        right: '66',
        bottom: '45',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: ['#f5f5f5']
          }
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
        data: []
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: '信息',
          type: 'line',
          stack: '总量1',
          areaStyle: { normal: {} },
          lineStyle: {
            normal: {
              color: '#b0bec5',
              width: 3,
            }
          },
          itemStyle: {
            normal: {
              color: '#b0bec5',
            }
          },
          data: [],
        },
        {
          name: '企业',
          type: 'line',
          stack: '总量2',
          areaStyle: { normal: {} },
          lineStyle: {
            normal: {
              color: '#bcaaa4',
              width: 3,
            }
          },
          itemStyle: {
            normal: {
              color: '#bcaaa4'
            }
          },
          data: []
        },
      ]
    }
  };

  /**
   * 头条相关store
   */
  @observable typeAll = '';
  @observable typeDefault = '工商更新';
  // 头条趋势分析store
  @observable headlinesTrend = {
    result: [],
    chartOption: {
      dataZoom: [
        {
          type: 'slider',
          bottom: 0,
          dataBackground: {
            areaStyle: {
              color: '#eeeeee',
            },
          },
          fillerColor: 'rgba(230, 230, 230, 0.4)',
          handleStyle: {
            color: '#dddddd'
          },
        },
        {
          type: 'inside',
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        backgroundColor: '#ffffff',
        padding: [0, 0],
        formatter: (ticket) => {
          let itemStr = '';
          ticket.forEach((item) => {
            itemStr +=
              `<p style="text-align: center;">
               <a style="color: ${item.color};">
               <span style="padding-right: 15px">${item.seriesName}</span>
               <span>${item.value}</span>条
               </a>
             </p>`;
          });
          const str = `
          <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
            <p style="text-align: center; padding-bottom: 10px;">
              <a style="color:#999999;">
                ${ticket[0].name}
              </a>
            </p>
            ${itemStr}
          </div>`;
          return str;
        },
      },
      grid: {
        top: '10',
        left: '4%',
        right: '100',
        bottom: '45',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: ['#f5f5f5']
          }
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
        data: []
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: '全部更新',
          type: 'line',
          stack: '总量1',
          lineStyle: {
            normal: {
              color: '#d87c7c',
              width: 1,
            }
          },
          itemStyle: {
            normal: {
              color: '#d87c7c',
            }
          },
          data: [],
        },
        {
          name: '工商更新',
          type: 'line',
          stack: '总量2',
          lineStyle: {
            normal: {
              color: '#919e8b',
              width: 1,
            }
          },
          itemStyle: {
            normal: {
              color: '#919e8b'
            }
          },
          data: []
        },
        {
          name: '法务更新',
          type: 'line',
          stack: '总量3',
          lineStyle: {
            normal: {
              color: '#d7ab82',
              width: 1,
            }
          },
          itemStyle: {
            normal: {
              color: '#d7ab82'
            }
          },
          data: []
        },
        {
          name: '舆情更新',
          type: 'line',
          stack: '总量4',
          lineStyle: {
            normal: {
              color: '#6e7074',
              width: 1,
            }
          },
          itemStyle: {
            normal: {
              color: '#6e7074'
            }
          },
          data: []
        },
        {
          name: '经营更新',
          type: 'line',
          stack: '总量5',
          lineStyle: {
            normal: {
              color: '#61a0a8',
              width: 1,
            }
          },
          itemStyle: {
            normal: {
              color: '#61a0a8'
            }
          },
          data: []
        },
        {
          name: '上市公告',
          type: 'line',
          stack: '总量6',
          lineStyle: {
            normal: {
              color: '#d7ab82',
              width: 1,
            }
          },
          itemStyle: {
            normal: {
              color: '#d7ab82'
            }
          },
          data: []
        },
        {
          name: '团队更新',
          type: 'line',
          stack: '总量7',
          lineStyle: {
            normal: {
              color: '#efa18d',
              width: 1,
            }
          },
          itemStyle: {
            normal: {
              color: '#efa18d'
            }
          },
          data: []
        },
      ]
    }
  };
  // 头条类型分析store
  @observable headlinesType = {
    result: [],
    chartOption: {
      tooltip: {
        axisPointer: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        backgroundColor: '#ffffff',
        padding: [0, 0],
        formatter: (ticket) => {
          const hoverData = ticket.data.data ? ticket.data.data : [];
          let itemStr = '';
          hoverData.forEach((item) => {
            itemStr +=
              `<p style="text-align: center; padding-bottom: 3px;">
              <a style="color: #d87c7c;">
                <span style="padding-right: 15px">${item.key}</span>
                <span>${item.value}</span>条
              </a>
            </p>`;
          });
          const str = `
          <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
            <p style="text-align: center; padding-bottom: 10px;">
              <a style="color:#999999;">
                ${ticket.seriesName}
              </a>
            </p>
            ${itemStr}
          </div>`;
          return str;
        },
      },
      series: [
        {
          name: '头条类型分析',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: []
        }
      ]
    }
  };

  // 设置数据
  @action.bound setParams(params) {
    this.params = params;
  }

  // 选择指定时间和类别请求数据
  @action.bound getChangeData(params) {
    this.getStatistic(params);
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
          this.setErrorBody('statistic', err.response.data);
          this.setLoading('statistic');
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
        this.changeTrend.chartOption.xAxis.data = xAxisDate;
        this.changeTrend.chartOption.series[0].data = companyData;
        this.changeTrend.chartOption.series[1].data = eventData;
        // 设置右边table框的数据，默认是今天和今天的昨天，反正就是最后的两个
        this.changeTrend.mutual.nowData = changeTrendData[changeTrendData.length - 1];
        this.changeTrend.mutual.beforeData = changeTrendData[changeTrendData.length - 2];
        this.changeTrend.result = resp.data;
        this.setLoading('changeTrend');
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.setErrorBody('changeTrend', err.response.data);
          this.setLoading('changeTrend');
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
        this.provinceAll.chartOption.series[0].data = provinceAllMapData;
        this.provinceAllSize = provinceAllData.length;
        this.provinceBar.chartOption.yAxis.data = provinceBarYAxisData;
        this.provinceBar.chartOption.series[0].data = provinceBarSeriesData;
        this.provinceName = provinceName;
        this.provinceAll.result = provinceAllData;
        this.provinceBar.result = provinceAllData;
        this.setLoading('provinceAll');
        this.getProvince({ params: { ...params, province: provinceName } });
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.setErrorBody('provinceAll', err.response.data);
          this.setLoading('provinceAll');
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
        this.provinceLine.chartOption.xAxis.data = provinceDate;
        this.provinceLine.chartOption.series[0].data = provinceEvent;
        this.provinceLine.chartOption.series[1].data = provinceCompany;
        this.provinceMap.chartOption.series[0].data = provinceMapData;
        this.provinceMap.chartOption.series[0].mapType = provinceAreaName;
        this.provinceLine.result = provinceTrendData;
        this.provinceMap.provinceRank = provinceRank;
        this.provinceMap.result = provinceRank;
        this.setLoading('province');
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.setErrorBody('province', err.response.data);
          this.setLoading('province');
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
        this.industryStatistics.chartOption.series[0].data = statisticSeriesData;
        this.industryId = industryId;
        this.industryName = industryName;
        this.industryRankLength = statisticData.length;
        this.industryStatistics.result = statisticData;
        this.setLoading('industryStatistics');
        this.getIndustryTrend({ params: { ...params, industryId: industryId } });
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.setErrorBody('industryStatistics', err.response.data);
          this.setLoading('industryStatistics');
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
        this.industryTrend.chartOption.xAxis.data = statisticTrendDate;
        this.industryTrend.chartOption.series[0].data = statisticTrendEvent;
        this.industryTrend.chartOption.series[1].data = statisticTrendCompany;
        this.industryTrend.result = statisticTrendData;
        this.setLoading('industryTrend');
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.setErrorBody('industryTrend', err.response.data);
          this.setLoading('industryTrend');
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
        this.headlinesTrend.chartOption.xAxis.data = sourceTrendDate;
        this.headlinesTrend.chartOption.series[0].data = sourceTrendAll;
        this.headlinesTrend.chartOption.series[1].data = sourceTrendCorp;
        this.headlinesTrend.chartOption.series[2].data = sourceTrendLegal;
        this.headlinesTrend.chartOption.series[3].data = sourceTrendNews;
        this.headlinesTrend.chartOption.series[4].data = sourceTrendOperation;
        this.headlinesTrend.chartOption.series[5].data = sourceTrendStock;
        this.headlinesTrend.chartOption.series[6].data = sourceTrendTeam;

        this.headlinesType.chartOption.series[0].data = pieSource;

        this.headlinesTrend.result = sourceTrend;
        this.headlinesType.result = sourceRatioMap;
        this.setLoading('headlines');
      }))
      .catch((err) => {
        console.log(err);
        if (!axios.isCancel(err)) {
          this.setErrorBody('headlines', err.response.data);
          this.setLoading('headlines');
        }
      });
    this.cancel.push(source.cancel);
  }
}
export default new MonitorStatisticsStore();
