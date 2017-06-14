import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import BaseChart from 'components/common/Charts/BaseChart';

function ChangeTrendChart({ changeTrendData, setChangeTable }) {
  const dateOnClick = (params) => {
    const mutual = {
      nowData: params.data.nowData,
      beforeData: params.data.beforeData,
    };
    setChangeTable(mutual);
  };
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
      data: toJS(changeTrendData.axis)
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
        data: toJS(changeTrendData.companyData),
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
        data: toJS(changeTrendData.eventData)
      },
    ]
  };

  return (
    <div>
      <BaseChart
        chartId="changeTrend"
        height="363px"
        option={option}
        clickAction={dateOnClick}/>
    </div>
  );
}

ChangeTrendChart.propTypes = {
  changeTrendData: PropTypes.object,
};
export default observer(ChangeTrendChart);
