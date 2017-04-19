import { observable, action } from 'mobx';
import { getPathValue } from 'pathval';
import moment from 'moment';
import 'moment-range';
// import pathval from 'pathval';
import { monitorStatisticsApi } from 'api';
class MonitorStatisticsStore {
  isEmptyObject(obj, key) {
    const result = getPathValue(this[obj], key);
    for (const name in result) {
      if (obj.hasOwnProperty(name)) {
        return false;
      }
    }
    return true;
  }

  @observable loadingGroup = {
    statistic: false,
    changeTrend: false,
    province: false,
    provinceAll: false,
    industryTrend: false,
    industryStatistics: false,
    source: false,
  };
  @observable errorBody = {
    changeTrend: {},
    province: {},
    provinceAll: {},
    industryTrend: {},
    industryStatistics: {},
    source: {},
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
  // 地区分布store
  @observable provinceAll = {
    result: {},
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
    result: {},
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
          right: '4%',
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
    result: {},
    chartOption: {
      dataZoom: [
        {
          type: 'slider',
          bottom: 0,
          dataBackground: {
            areaStyle: {
              color: '#dddddd'
            },
          }
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
    result: {},
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
  @observable industryRankLength = '';
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
  };

  /**
   * 头条相关store
   */
  @observable typeAll = '';
  @observable typeDefault = '工商更新';
  // 头条趋势分析store
  @observable headlinesTrend = {
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
    result: {},
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

  // 设置数据
  @action.bound setParams(params) {
    this.params = params;
  }

  // 选择指定时间和类别请求数据
  @action.bound getChangeData(params) {
    this.getStatistic(params);
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
    monitorStatisticsApi.getStatistic(params)
      .then(action('get statistic', (resp) => {
        this.statistic = resp.data;
        this.setLoading('statistic');
      }))
      .catch((err) => {
        this.setErrorBody('statistic', err.response.data);
        this.setLoading('statistic');
      });
  }

  // 变化趋势
  @action.bound getChangeTrend(params) {
    this.setLoading('changeTrend', true);
    monitorStatisticsApi.getChangeTrend(params)
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
        this.setErrorBody('changeTrend', err.response.data);
        this.setLoading('changeTrend');
      });
  }

  @action.boudn setChangeTable(params) {
    this.changeTrend.mutual = params;
  }

  // 获取所有地区分布
  // @action.bound getProvinceAll(params) {
  //   this.setLoading('provinceAll', true);
  //   monitorStatisticsApi.getProvinceAll(params)
  //     .then(action('get province all'), (resp) => {
  //       this.provinceAll = resp.data;
  //       this.setLoading('provinceAll');
  //       const newParams = getState().getIn(['headTrend', 'params']).toJS();
  //       const provinceName = getState().getIn(['headTrend', 'province', 'provinceName']);
  //       getProvince(newParams, provinceName)(dispatch);
  //     })
  //     .catch((err) => {
  //       this.setErrorBody('provinceAll', err.response.data);
  //       this.setLoading('provinceAll');
  //     });
  // }
}
export default new MonitorStatisticsStore();
