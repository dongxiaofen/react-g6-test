import React from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import loadingBoxHoc from '../common/loadingBoxHoc';
import Chart from 'components/common/Charts/ResizeChart';
import styles from './index.less';
function IndustryDistribute({highRiskCorpStore}) {
  const moduleData = highRiskCorpStore.industryDistribute.data.indus_dist_list;
  const countNum = highRiskCorpStore.industryDistribute.data.total_cnt_indus;
  const formatData = () => {
    return moduleData.map(obj => ({value: obj.count, name: obj.industry}));
  };
  const chartOption = {
    series: [
      {
        name: '高风险企业行业分布',
        type: 'pie',
        label: {
          normal: {
            formatter: '{b}: {c}家（占{d}%）',
            textStyle: {
              color: '#999',
              fontSize: '13px'
            },
          },
          emphasis: {
            formatter: '{b}: {c}家（占{d}%）',
            textStyle: {
              color: '#999',
              fontSize: '13px'
            },
          }
        },
        labelLine: {
          normal: {
            length: 5,
            length2: 5,
          }
        },
        radius: ['45%', '60%'],
        center: ['45%', '50%'],
        data: formatData(),
      },
    ],
  };
  return (
    <div className={styles.chartBox}>
      <Chart
        chartId="industryDistribute"
        height="434"
        option={chartOption} />
      <div className={styles.countLayer}>
        <div className={styles.num}>{countNum}</div>
        <span className={styles.numLabel}>高风险企业</span>
      </div>
    </div>
  );
}
export default inject('highRiskCorpStore')(
  loadingBoxHoc('industryDistribute')(
    loadingComp({
      mapDataToProps: props => ({
        loading: props.highRiskCorpStore.industryDistribute.data.indus_dist_list === undefined ? true : false,
        error: props.highRiskCorpStore.industryDistribute.data.error,
        height: 434,
        errCategory: 1,
        category: 0,
      }),
    })(observer(IndustryDistribute))
  )
);
