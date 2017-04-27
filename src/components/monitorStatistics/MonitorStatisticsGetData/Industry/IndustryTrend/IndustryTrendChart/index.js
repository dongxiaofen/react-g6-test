import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
function IndustryTrendChart({ msStore }) {
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
        option={msStore.industryTrend.chartOption}
        height="300px"/>
    </div>
  );
}

IndustryTrendChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.industryTrend,
    category: 0,
    height: 300,
    error: !props.msStore.isEmptyObject('errorBody', 'industryTrend') || !props.msStore.industryTrend.result.length,
    errCategory: 1,
  })
})(observer(IndustryTrendChart));
