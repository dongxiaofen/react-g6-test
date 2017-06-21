import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
function IndustryTrendChart({ msStore }) {
  const industryTrend = msStore.industryTrend;
  const axis = toJS(industryTrend.axis);
  const event = toJS(industryTrend.event);
  const company = toJS(industryTrend.company);

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
        data: event,
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
        data: company
      },
    ]
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.tip}>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt1}></div>
          <div className={styles.tipText}>信息</div>
        </div>
        <div className={`clearfix`}>
          <div className={styles.wdt2}></div>
          <div className={styles.tipText}>企业</div>
        </div>
      </div>
      <BaseChart
        chartId="IndustryTrendChart"
        option={option}
        height="300px"/>
    </div>
  );
}

IndustryTrendChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => {
    const msStore = props.msStore;
    const industryTrend = msStore.industryTrend;
    const isErr = industryTrend.event.length === 0 && industryTrend.company.length === 0;
    return {
      loading: msStore.loadingGroup.industryTrend,
      category: 0,
      height: 300,
      error: isErr,
      errCategory: 1,
    };
  }
})(observer(IndustryTrendChart));
