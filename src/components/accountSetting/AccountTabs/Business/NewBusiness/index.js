import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Chart from 'components/common/echarts/ResizeChart';
import styles from './index.less';
function NewBusiness({accountSettingStore}) {
  const data = accountSettingStore.tabs.business.reportAndMonitor.data;
  const reportData = data.reportStatisic || [];
  const analysisReportData = data.analysisReportSatisic || [];
  const monitorData = data.monitorSatisic || [];
  const reportDate = reportData.map(item => item.date);
  const analysisReportDate = analysisReportData.map(item => item.date);
  const monitorDate = monitorData.map(item => item.date);
  const allDate = Array.from(new Set(reportDate.concat(analysisReportDate).concat(monitorDate)));
  const allReportData = allDate.map(date => {
    const matchData = reportData.find(item => {
      return item.date === date;
    });
    return (matchData && matchData.count) || 0;
  });
  const allAnalysisReportData = allDate.map(date => {
    const matchData = analysisReportData.find(item => {
      return item.date === date;
    });
    return (matchData && matchData.count) || 0;
  });
  const allMonitorData = allDate.map(date => {
    const matchData = monitorData.find(item => {
      return item.date === date;
    });
    return (matchData && matchData.count) || 0;
  });
  const createOption = () => ({
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
        <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
          <p style="text-align: center; padding-bottom: 10px;">
            <a style="color:#999999;">
              ${ticket[0].name}
            </a>
          </p>
          <p style="text-align: left; padding-bottom: 6px;">
            <a style="color:#3483e9;">
              <span style="padding-right: 15px">${ticket[0].seriesName}</span>
              <span>${ticket[0].value || 0}</span>家
            </a>
          </p>
          <p style="text-align: left; padding-bottom: 6px;">
            <a style="color:#e08632;">
              <span style="padding-right: 15px">${ticket[1].seriesName}</span>
              <span>${ticket[1].value || 0}</span>家
            </a>
          </p>
          <p style="text-align: left;">
            <a style="color:#43bf77;">
              <span style="padding-right: 15px">${ticket[2].seriesName}</span>
              <span>${ticket[2].value || 0}</span>家
            </a>
          </p>
        </div>`;
        return str;
      },
    },
    grid: {
      top: '60',
      right: '80',
      bottom: '40',
      left: '50',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
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
      data: allDate
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
        name: '新增报告企业',
        type: 'line',
        stack: '总量1',
        lineStyle: {
          normal: {
            color: '#3483e9',
            width: 3,
          }
        },
        itemStyle: {
          normal: {
            color: '#3483e9',
          }
        },
        data: allReportData,
      },
      {
        name: '新增评估企业',
        type: 'line',
        stack: '总量2',
        lineStyle: {
          normal: {
            color: '#e08632',
            width: 3,
          }
        },
        itemStyle: {
          normal: {
            color: '#e08632',
          }
        },
        data: allAnalysisReportData,
      },
      {
        name: '新增监控企业',
        type: 'line',
        stack: '总量3',
        lineStyle: {
          normal: {
            color: '#43bf77',
            width: 3,
          }
        },
        itemStyle: {
          normal: {
            color: '#43bf77'
          }
        },
        data: allMonitorData
      },
    ]
  });
  return (
    <div className={styles.wrapper}>
      <Chart
        chartId="newBusiness"
        height="500"
        option={createOption()} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.business.reportAndMonitor.data === undefined ? true : false,
    error: props.accountSettingStore.tabs.business.reportAndMonitor.error,
    height: 500,
    errCategory: 1,
    category: 0,
  }),
})(observer(NewBusiness));
