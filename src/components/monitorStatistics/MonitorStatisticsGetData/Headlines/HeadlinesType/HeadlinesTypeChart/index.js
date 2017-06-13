import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
function HeadlinesTypeChart({ msStore }) {
  const headlinesType = toJS(msStore.headlinesType);
  const option = {
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: '#e5e5e5',
        }
      },
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const hoverData = ticket.data.data ? ticket.data.data : [];
        let itemStr = '';
        hoverData.forEach((item) => {
          itemStr +=
            `<p style="text-align: center; padding-bottom: 3px;">
            <a style="color: #d87c7c;">
              <span style="padding-right: 15px">${item.key}</span>
              <span>${item.value}</span>条
            </a>
          </p>`;
        });
        const str = `
        <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
          <p style="text-align: center; padding-bottom: 10px;">
            <a style="color:#999999;">
              ${ticket.seriesName}
            </a>
          </p>
          ${itemStr}
        </div>`;
        return str;
      },
    },
    series: [
      {
        name: '头条类型分析',
        type: 'pie',
        radius: [30, 110],
        roseType: 'area',
        data: headlinesType
      }
    ]
  };

  return (
    <BaseChart
      chartId="HeadlinesTypeChart"
      option={option}
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
    error: props.msStore.headlinesType.length === 0,
    errCategory: 1,
  })
})(observer(HeadlinesTypeChart));
