import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
function HeadlinesTrendChart({ msStore }) {
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
        option={msStore.headlinesTrend.chartOption}
        height="450px" />
    </div>
  );
}

HeadlinesTrendChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.headlines,
    category: 0,
    height: 450,
    error: !props.msStore.isEmptyObject('errorBody', 'headlines') || !props.msStore.headlinesTrend.result.length,
    errCategory: 1,
  })
})(observer(HeadlinesTrendChart));
