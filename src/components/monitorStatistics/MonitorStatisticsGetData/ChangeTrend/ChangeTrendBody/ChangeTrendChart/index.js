import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import BaseChart from 'components/common/Charts/BaseChart';

function ChangeTrendChart({ chartOption, setChangeTable }) {
  const dateOnClick = (params) => {
    const mutual = {
      nowData: params.data.nowData,
      beforeData: params.data.beforeData,
    };
    setChangeTable(mutual);
  };
  return (
    <div>
      <BaseChart
        chartId="changeTrend"
        height="363px"
        option={chartOption}
        clickAction={dateOnClick}/>
    </div>
  );
}

ChangeTrendChart.propTypes = {
  chartOption: PropTypes.object,
};
export default observer(ChangeTrendChart);
