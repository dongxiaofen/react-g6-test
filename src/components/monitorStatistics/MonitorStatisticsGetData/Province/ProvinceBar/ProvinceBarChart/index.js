import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function ProvinceBarChart({ msStore }) {
  return (
    <BaseChart
      chartId="ProvinceBarChart"
      height="400px"
      option={msStore.provinceBar.chartOption}
     />
  );
}

ProvinceBarChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.provinceAll,
    category: 0,
    height: 400,
    error: !props.msStore.isEmptyObject('errorBody', 'provinceAll') || !props.msStore.provinceAll.result.length,
    errCategory: 1,
  })
})(observer(ProvinceBarChart));
