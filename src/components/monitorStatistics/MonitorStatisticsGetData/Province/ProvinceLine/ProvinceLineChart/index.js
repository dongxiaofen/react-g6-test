import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function ProvinceLineChart({ msStore }) {
  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.tip}>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt1}></div>
          <div className={styles.tipText}>头条更新信息</div>
        </div>
        <div className={`clearfix`}>
          <div className={styles.wdt2}></div>
          <div className={styles.tipText}>头条更新企业</div>
        </div>
      </div>
      <BaseChart
        chartId= "ProvinceLineChart"
        height="330px"
        option={msStore.provinceLine.chartOption}/>
    </div>
  );
}

ProvinceLineChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.province,
    category: 0,
    error: !props.msStore.isEmptyObject('errorBody', 'province') || !props.msStore.provinceLine.result.length,
    errCategory: 1,
  })
})(observer(ProvinceLineChart));
