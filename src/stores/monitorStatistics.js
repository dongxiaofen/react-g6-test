import { observable, action } from 'mobx';
import * as apis from 'helpers/api';
class MonitorStatisticsStore {
  @observable params = {};
  @observable statistic = {};
  @observable changeTrend = {
    result: {},
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
}
export default new MonitorStatisticsStore();
