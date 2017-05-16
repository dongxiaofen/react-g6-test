import React, {Component, PropTypes} from 'react';
import { loadingComp } from 'components/hoc';
import ActionBox from '../common/ActionBox';
import Chart from 'components/common/Charts/ResizeChart';
import styles from './index.less';
function IndustryDistribute({highRiskCorpStore}) {
  const moduleData = highRiskCorpStore.industryDistribute.data.indus_dist_list;
  const countNum = highRiskCorpStore.industryDistribute.data.total_cnt_indus;
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
        data: formatData(moduleData),
      },
    ],
  };
  getIndustry = (params) => {
    highRiskCorpStore.getIndustry(params);
  };
  formatData = (data) => {
    return data.toArray().map(obj => ({value: obj.get('count'), name: obj.get('industry')}));
  };
  return (
    <ActionBox
      module="industryDistribute"
      onChange={getIndustry}
      >
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
    </ActionBox>
  );
}
export inject('highRiskCorpStore')(loadingComp({
  mapDataToProps: props => ({
    loading: props.highRiskCorpStore.industryDistribute.data.indus_dist_list === undefined ? true : false,
    error: props.highRiskCorpStore.industryDistribute.data.error,
    height: 500,
    errCategory: 1,
    category: 0,
  }),
})(observer(IndustryDistribute)));
