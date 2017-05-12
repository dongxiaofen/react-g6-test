import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import MapChart from 'components/common/Charts/MapChart';
import { loadingComp } from 'components/hoc';
function IndustryStatisticsChart({ msStore }) {
  const dateOnClick = (chartData) => {
    const params = msStore.params;
    params.industryId = chartData.data.industryId;
    msStore.getIndustryTrend({ params });
    msStore.setIndustryName(chartData.name);
  };

  return (
    <MapChart
      chartId="IndustryStatisticsChart"
      option={msStore.industryStatistics.chartOption}
      height="363px"
      clickAction={dateOnClick} />
  );
}

IndustryStatisticsChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.industryStatistics,
    category: 0,
    height: 363,
    error: !props.msStore.isEmptyObject('errorBody', 'industryStatistics') || !props.msStore.industryStatistics.result.length,
    errCategory: 1,
  })
})(observer(IndustryStatisticsChart));
