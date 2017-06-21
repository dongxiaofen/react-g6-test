import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function ProvinceLineChart({ msStore }) {
  const provinceLine = msStore.provinceLine;
  const axis = toJS(provinceLine.axis);
  const event = toJS(provinceLine.event);
  const company = toJS(provinceLine.company);

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
      data: axis
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
        data: event,
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
        data: company
      },
    ]
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.tip}>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt1}></div>
          <div className={styles.tipText}>头条更新信息</div>
        </div>
        <div className={`clearfix`}>
          <div className={styles.wdt2}></div>
          <div className={styles.tipText}>头条更新企业</div>
        </div>
      </div>
      <BaseChart
        chartId= "ProvinceLineChart"
        height="330px"
        option={option}/>
    </div>
  );
}

ProvinceLineChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => {
    const msStore = props.msStore;
    const isErr = msStore.provinceLine.event.length === 0 && msStore.provinceLine.company.length === 0;
    return {
      loading: msStore.loadingGroup.province,
      category: 0,
      height: 330,
      error: isErr,
      errCategory: 1,
    };
  }
})(observer(ProvinceLineChart));
