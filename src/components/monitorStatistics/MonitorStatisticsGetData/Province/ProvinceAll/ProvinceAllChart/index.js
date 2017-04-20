import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import MapChart from 'components/common/Charts/MapChart';
import { loadingComp } from 'components/hoc';

function ProvinceAllChart({ msStore }) {
  const dateOnClick = (chartData) => {
    if (chartData.componentSubType === 'scatter') {
      const params = msStore.params;
      params.province = chartData.name;
      msStore.getProvince({params});
      msStore.setProvinceName(chartData.name);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.tip2}>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.round1}></div>
          <div className={`fs7 ${styles.tipText}`}>大于50家</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.round2}></div>
          <div className={`fs7 ${styles.tipText}`}>21-50家</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.round3}></div>
          <div className={`fs7 ${styles.tipText}`}>11-20家</div>
        </div>
        <div className={`clearfix`}>
          <div className={styles.round4}></div>
          <div className={`fs7 ${styles.tipText}`}>1-10家</div>
        </div>
      </div>
      <MapChart
        chartId="ProvinceAllChart"
        option={msStore.provinceAll.chartOption}
        height="400px"
        clickAction={dateOnClick}
        />
    </div>
  );
}

ProvinceAllChart.propTypes = {
  chartOption: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.provinceAll,
    category: 0,
    error: !props.msStore.isEmptyObject('errorBody', 'provinceAll') || !props.msStore.provinceAll.result.length,
    errCategory: 1,
  })
})(observer(ProvinceAllChart));
