import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Chart from 'components/common/Charts/BaseChart';
import styles from './index.less';

function CompanyScoreChart({ sixStarData }) {
  const data = sixStarData.data;
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
          color: '#9e9e9e',
        },
      },
      indicator: [
        { name: '行业相关', max: 100 },
        { name: '经营状况', max: 100 },
        { name: '团队相关', max: 100 },
        { name: '社会影响力', max: 100 },
        { name: '创新能力', max: 100 },
        { name: '合规程度', max: 100 }
      ],
      axisLine: {
        lineStyle: {
          color: ['#e0e0e0'],
        },
      },
      splitLine: {
        lineStyle: {
          color: ['#e0e0e0'],
        },
      },
      splitArea: {
        areaStyle: {
          // color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
          opacity: 0.6,
        },
      },
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
          value: [
            data && data.result && data.result.industry ? data.result.industry.score : 0,
            data && data.result && data.result.operation ? data.result.operation.score : 0,
            data && data.result && data.result.team ? data.result.team.score : 0,
            data && data.result && data.result.influence ? data.result.influence.score : 0,
            data && data.result && data.result.creativity ? data.result.creativity.score : 0,
            data && data.result && data.result.law ? data.result.law.score : 0
          ],
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
        height="380px"
        option={createOption()} />
    </div>
  );
}

CompanyScoreChart.propTypes = {
  alertAnalysisStore: PropTypes.object,
};
export default observer(CompanyScoreChart);
