import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
function HeadlinesTrendChart({ msStore }) {
  return (
    <BaseChart
      chartId="HeadlinesTrendChart"
      option={msStore.headlinesTrend.chartOption}
      height="450px" />
  );
}

HeadlinesTrendChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.headlines,
    category: 0,
    error: !props.msStore.isEmptyObject('errorBody', 'headlines') || !props.msStore.headlinesTrend.result.length,
    errCategory: 1,
  })
})(observer(HeadlinesTrendChart));
