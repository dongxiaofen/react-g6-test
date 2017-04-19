import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function ProvinceLineChart({ msStore }) {
  return (
    <div className={styles}>
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
