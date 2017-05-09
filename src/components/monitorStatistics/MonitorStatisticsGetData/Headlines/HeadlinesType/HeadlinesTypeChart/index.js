import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
function HeadlinesTypeChart({ msStore }) {
  return (
    <BaseChart
      chartId="HeadlinesTypeChart"
      option={msStore.headlinesType.chartOption}
      height="450px" />
  );
}

HeadlinesTypeChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.headlines,
    category: 0,
    height: 450,
    error: !props.msStore.isEmptyObject('errorBody', 'headlines') || props.msStore.isEmptyObject('headlinesType', 'result'),
    errCategory: 1,
  })
})(observer(HeadlinesTypeChart));
