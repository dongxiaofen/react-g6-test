import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Chart from 'components/common/Charts/ResizeChart';
import styles from './index.less';
function IndustryDist({accountSettingStore}) {
  const data = accountSettingStore.tabs.business.industry.content;
  const sortData = data.sort((prev, next) => next.industryCount - prev.industryCount);
  const industry = sortData.map(item => item.industryName);
  const seriesData = sortData.map(item => {
    return {
      value: item.industryCount,
      reportCount: item.reportCount,
      analysisReportCount: item.analysisReportCount,
      monitorCount: item.monitorCount,
    };
  });
  const industryDistOption = {
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
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const str = `
        <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
          <p style="text-align: center; padding-bottom: 10px;">
            <a style="color:#999999;">
              ${ticket.name} ${ticket.value}
            </a>
          </p>
          <p style="text-align: left; padding-bottom: 6px;">
            <a style="color:#3483e9;">
              <span style="padding-right: 15px">高级报告</span>
              <span>${ticket.data.reportCount || 0}</span>
            </a>
          </p>
          <p style="text-align: left; padding-bottom: 6px;">
            <a style="color:#3483e9;">
              <span style="padding-right: 15px">深度报告</span>
              <span>${ticket.data.analysisReportCount || 0}</span>
            </a>
          </p>
          <p style="text-align: left;">
            <a style="color:#3483e9;">
              <span style="padding-right: 15px">监控报告</span>
              <span>${ticket.data.monitorCount || 0}</span>
            </a>
          </p>
        </div>`;
        return str;
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '45',
      containLabel: true
    },
    barMaxWidth: 20,
    xAxis: {
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
        },
      },
      axisLabel: {
        textStyle: {
          color: '#999999',
        },
      },
      data: industry,
    },
    yAxis: {
      type: 'value',
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
        textStyle: {
          color: '#999999',
        },
      },
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#3483e9',
          },
        },
        data: seriesData,
      }
    ]
  };
  return (
    <div className={styles.wrapper}>
      <Chart
        chartId="industryDist"
        height="500"
        option={industryDistOption} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.business.industry.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.business.industry.error,
    height: 500,
    errCategory: 1,
    category: 0,
  }),
})(observer(IndustryDist));
