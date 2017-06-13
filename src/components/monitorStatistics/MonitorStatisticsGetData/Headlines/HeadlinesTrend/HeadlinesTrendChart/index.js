import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
function HeadlinesTrendChart({ msStore }) {
  const headlinesTrend = msStore.headlinesTrend;
  const initConfig = [
    { name: '全部更新', color: '#d87c7c', data: toJS(headlinesTrend.all) },
    { name: '工商更新', color: '#787464', data: toJS(headlinesTrend.corp) },
    { name: '法务更新', color: '#6ea0a7', data: toJS(headlinesTrend.legal) },
    { name: '舆情更新', color: '#909f8c', data: toJS(headlinesTrend.news) },
    { name: '经营更新', color: '#6e7074', data: toJS(headlinesTrend.operation) },
    { name: '上市公告', color: '#d7ab82', data: toJS(headlinesTrend.stock) },
    { name: '团队更新', color: '#efa18d', data: toJS(headlinesTrend.team) },
  ];
  const axis = toJS(headlinesTrend.axis);
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
    series: initConfig.map((item, idx) => {
      return {
        name: item.name,
        type: 'line',
        stack: `总量${idx}`,
        lineStyle: {
          normal: {
            color: item.color,
            width: 1,
          }
        },
        itemStyle: {
          normal: {
            color: item.color,
          }
        },
        data: item.data,
      };
    }),
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.tip}>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt1}></div>
          <div className={styles.tipText}>全部更新</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt2}></div>
          <div className={styles.tipText}>工商更新</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt3}></div>
          <div className={styles.tipText}>法务更新</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt4}></div>
          <div className={styles.tipText}>舆情更新</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt5}></div>
          <div className={styles.tipText}>经营更新</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt6}></div>
          <div className={styles.tipText}>上市公告</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt7}></div>
          <div className={styles.tipText}>团队更新</div>
        </div>
      </div>
      <BaseChart
        chartId="HeadlinesTrendChart"
        option={option}
        height="450px" />
    </div>
  );
}

HeadlinesTrendChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => {
    const headlinesTrend = props.msStore.headlinesTrend;
    const keys = Object.keys(headlinesTrend);
    const isErr = keys.every(item => headlinesTrend[item].length === 0);
    return {
      loading: props.msStore.loadingGroup.headlines,
      category: 0,
      height: 450,
      error: isErr,
      errCategory: 1,
    };
  }
})(observer(HeadlinesTrendChart));
