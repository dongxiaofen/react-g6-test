import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

// import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
function IndustryTrendChart({ msStore }) {
  return (
    <div>
      <BaseChart
        chartId="IndustryTrendChart"
        option={msStore.industryTrend.chartOption}
        height="363px"/>
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
    error: !props.msStore.isEmptyObject('errorBody', 'industryTrend') || !props.msStore.industryTrend.result.length,
    errCategory: 1,
  })
})(observer(IndustryTrendChart));
