import React from 'react';
import { observer } from 'mobx-react';
import Chart from 'components/common/echarts/ResizeChart';
import styles from './index.less';
function NewBusiness() {
  const options = {
    dataZoom: [
      {
        type: 'slider',
        dataBackground: {
          areaStyle: {
            color: '#eee'
          },
        },
        fillerColor: 'rgba(230, 230, 230, 0.4)',
        handleStyle: {
          color: '#ddd'
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
        <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
          <p style="text-align: center; padding-bottom: 10px;">
            <a style="color:#999999;">
              ${ticket[0].name}
            </a>
          </p>
          <p style="text-align: center; padding-bottom: 6px;">
            <a style="color:#3483e9;">
              <span style="padding-right: 15px">${ticket[0].seriesName}</span>
              <span>${ticket[0].value}</span>家
            </a>
          </p>
          <p style="text-align: center;">
            <a style="color:#43bf77;">
              <span style="padding-right: 15px">${ticket[1].seriesName}</span>
              <span>${ticket[1].value}</span>家
            </a>
          </p>
        </div>`;
        return str;
      },
    },
    grid: {
      left: '20',
      right: '100',
      bottom: '45',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
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
        name: '新增报告企业',
        type: 'line',
        stack: '总量1',
        lineStyle: {
          normal: {
            color: '#3483e9',
            width: 3,
          }
        },
        itemStyle: {
          normal: {
            color: '#3483e9',
          }
        },
        data: [],
      },
      {
        name: '新增监控企业',
        type: 'line',
        stack: '总量2',
        lineStyle: {
          normal: {
            color: '#43bf77',
            width: 3,
          }
        },
        itemStyle: {
          normal: {
            color: '#43bf77'
          }
        },
        data: []
      },
    ]
  };
  return (
    <div className={styles.wrapper}>
      <Chart
        chartId="areaRanking"
        height="500"
        option={options} />
    </div>
  );
}
export default observer(NewBusiness);
