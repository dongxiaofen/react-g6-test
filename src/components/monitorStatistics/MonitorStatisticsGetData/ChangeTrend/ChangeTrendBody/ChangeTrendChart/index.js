import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import BaseChart from 'components/common/Charts/BaseChart';

function ChangeTrendChart({ chartOption }) {
  return (
    <div>
      <BaseChart
        chartId="changeTrend"
        height="363px"
        option={chartOption} />
    </div>
  );
}

ChangeTrendChart.propTypes = {
  chartOption: PropTypes.object,
};
export default observer(ChangeTrendChart);
