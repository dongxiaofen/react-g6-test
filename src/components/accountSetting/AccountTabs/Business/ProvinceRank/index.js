import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Chart from 'components/common/echarts/ResizeChart';
import styles from './index.less';
function ProvinceRank({accountSettingStore}) {
  const data = accountSettingStore.tabs.business.province.content;
  const sortData = data.sort((prev, next) => prev.total - next.total);
  const area = sortData.map(item => item.area);
  const seriesData = sortData.map(item => {
    return {
      value: item.total,
      reportCount: item.reportCount,
      analysisReportCount: item.analysisReportCount,
      companyCount: item.companyCount,
    };
  });
  const areaRankingOption = {
    dataZoom: [
      {
        type: 'slider',
        yAxisIndex: 0,
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
        yAxisIndex: 0,
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
              ${ticket.name} ${ticket.value}家
            </a>
          </p>
          <p style="text-align: left; padding-bottom: 6px;">
            <a style="color:#ffbd3d;">
              <span style="padding-right: 15px">监控主体企业</span>
              <span>${ticket.data.companyCount || 0}</span>家
            </a>
          </p>
          <p style="text-align: left; padding-bottom: 6px;">
            <a style="color:#ffbd3d;">
              <span style="padding-right: 15px">评估报告企业</span>
              <span>${ticket.data.analysisReportCount || 0}</span>家
            </a>
          </p>
          <p style="text-align: left;">
            <a style="color:#ffbd3d;">
              <span style="padding-right: 15px">查询报告企业</span>
              <span>${ticket.data.reportCount || 0}</span>家
            </a>
          </p>
        </div>`;
        return str;
      },
    },
    grid: {
      left: '1%',
      right: '15%',
      bottom: '5%',
      containLabel: true
    },
    barMaxWidth: 20,
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
        textStyle: {
          color: '#999999',
        },
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
      data: area,
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#ffbd3d',
          },
        },
        data: seriesData,
      }
    ]
  };
  return (
    <div className={styles.wrapper}>
      <Chart
        chartId="provinceRank"
        height="500"
        option={areaRankingOption} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.business.province.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.business.province.error,
    height: 500,
    category: 0,
  }),
})(observer(ProvinceRank));
