import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function Chart({ distributionBar }) {
  const _distributionBar = toJS(distributionBar);
  const option = {
    tooltip: {
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const name = ticket.name.split('.')[1];
        const str = `
        <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
          <p style="text-align: center;">
            <a style="color:#999999;">
              ${name}
            </a>
            <a style="color:#78A186;">
              <span style="padding-left: 15px">
                ${ticket.value}
              </span>${ticket.data.unit}
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
            color: '#eee',
          },
        },
        fillerColor: 'rgba(230, 230, 230, 0.4)',
        handleStyle: {
          color: '#ddd'
        },
      },
      {
        type: 'inside',
        yAxisIndex: 0,
      }
    ],
    grid: {
      top: '60px',
      left: '2%',
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
      data: _distributionBar.axis
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#78A186',
          },
        },
        label: {
          normal: {
            show: true,
            position: [5, 10]
          }
        },
        data: _distributionBar.data
      }
    ]
  };
  return (
    <div>
      <BaseChart
        chartId="distributionBar"
        height="400px"
        option={option} />
    </div>
  );
}

Chart.propTypes = {
  loading: PropTypes.bool,
  distributionBar: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.loading,
    category: 0,
    height: 400,
    error: props.distributionBar.data.length === 0,
    errCategory: 1,
  })
})(observer(Chart));
