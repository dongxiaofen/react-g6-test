import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function ProvinceBarChart({ msStore }) {
  const provinceBar = msStore.provinceBar;
  const axis = toJS(provinceBar.axis);
  const data = toJS(provinceBar.data);

  const option = {
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
      data: axis
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
        data: data
      }
    ]
  };

  return (
    <BaseChart
      chartId="ProvinceBarChart"
      height="400px"
      option={option}
     />
  );
}

ProvinceBarChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.provinceAll,
    category: 0,
    height: 400,
    error: props.msStore.provinceAll.length === 0,
    errCategory: 1,
  })
})(observer(ProvinceBarChart));
