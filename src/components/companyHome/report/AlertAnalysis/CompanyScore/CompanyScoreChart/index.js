import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Chart from 'components/common/echarts/ResizeChart';
import styles from './index.less';

function CompanyScoreChart({alertAnalysisStore}) {
  const data = alertAnalysisStore.sixStarData;
  const createOption = () => ({
    title: {
      text: ''
    },
    tooltip: {
      show: false
    },
    legend: {
      data: ['企业综合评分（Actual Spending）']
    },
    radar: {
      name: {
        textStyle: {
          fontSize: 14,
        },
      },
      indicator: [
         { name: '行业状况', max: 100},
         { name: '经营状况', max: 100},
         { name: '团队相关', max: 100},
         { name: '社会影响力', max: 100},
         { name: '创新能力', max: 100},
         { name: '负面相关', max: 100}
      ]
    },
    series: [{
      name: '企业综合评分',
      type: 'radar',
      itemStyle: {
        normal: {
          color: 'rgba(66, 164, 245, 1)'
        },
      },
      lineStyle: {
        normal: {
          color: 'rgba(66, 164, 245, 1)'
        },
      },
      data: [
        {
          value: [78, 88, 65, 84, 91, 69],
          name: '企业综合评分',
          label: {
            normal: {
              show: true,
              formatter: (params) => {
                return params.value;
              },
              textStyle: {
                color: 'rgba(66, 164, 245, 1)'
              },
            },
          },
          areaStyle: {
            normal: {
              color: 'rgba(66, 164, 245, 0.50)'
            }
          }
        }
      ]
    }]
  });
  return (
    <div className={styles.box}>
      <Chart
        chartId="leida"
        height="450"
        option={createOption()} />
    </div>
  );
}

CompanyScoreChart.propTypes = {
  alertAnalysisStore: PropTypes.object,
};
export default observer(CompanyScoreChart);
