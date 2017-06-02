import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Chart from 'components/common/Charts/ResizeChart';

function IndustryDist({myIndustryDist}) {
  const data = myIndustryDist;
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
    <div className={styles.box}>
      <span className={styles.titleText}>行业分布</span>
      <Chart
        chartId="myIndustryDist"
        height="440"
        option={industryDistOption} />
    </div>
  );
}

IndustryDist.propTypes = {
  myIndustryDist: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.myIndustryDist.length > 0 ? false : true,
    error: props.myIndustryDist.error,
    height: 500,
    errCategory: 1,
    category: 0,
  }),
})(observer(IndustryDist));
