import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';

function Chart({ trend }) {
  const option = {
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
            <p style="text-align: center;">
              <a style="color:#000;">
                ${ticket[0].name}
              </a>
            </p>
            <p style="text-align: center; padding-bottom: 3px;">
              <a style="color: #c23531;">
                <span style="padding-right: 15px">${ticket[0].seriesName}</span>
                <span>${ticket[0].value}</span>万元
              </a>
            </p>
            <p style="text-align: center;">
              <a style="color: #55979F;">
                <span style="padding-right: 15px">${ticket[1].seriesName}</span>
                <span>${ticket[1].value}</span>笔
              </a>
            </p>
          </div>`;
        return str;
      },
    },
    grid: {
      top: '70',
      left: '3%',
      right: '6%',
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
      data: toJS(trend.axis)
    },
    yAxis: [
      {
        type: 'value',
        position: 'left',
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
      {
        type: 'value',
        position: 'right',
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
    ],
    series: [
      {
        name: '中标金额',
        type: 'line',
        yAxisIndex: 0,
        stack: '总量1',
        lineStyle: {
          normal: {
            color: '#c23531',
            width: 2,
          }
        },
        itemStyle: {
          normal: {
            color: '#c23531',
          }
        },
        data: toJS(trend.amountData),
      },
      {
        name: '中标笔数',
        type: 'line',
        yAxisIndex: 1,
        stack: '总量2',
        lineStyle: {
          normal: {
            color: '#55979F',
            width: 2,
          }
        },
        itemStyle: {
          normal: {
            color: '#55979F'
          }
        },
        data: toJS(trend.countData)
      },
    ]
  };
  return (
    <div className={styles}>
      <BaseChart chartId="bidMarketTrend" height="500px" option={option} />
    </div>
  );
}

Chart.propTypes = {
  trend: PropTypes.object,
};
export default observer(Chart);
