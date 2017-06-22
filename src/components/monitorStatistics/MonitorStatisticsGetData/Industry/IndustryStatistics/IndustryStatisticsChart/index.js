import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import MapChart from 'components/common/Charts/MapChart';
import { loadingComp } from 'components/hoc';
function IndustryStatisticsChart({ msStore }) {
  const dateOnClick = (chartData) => {
    const params = msStore.params;
    params.industryId = chartData.data.industryId;
    msStore.getIndustryTrend({ params });
    msStore.setIndustryName(chartData.name);
  };

  const option = {
    tooltip: {
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const str = `
        <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
          <p style="text-align: center; padding-bottom: 10px;">
            <a style="color:#999999;">
              ${ticket.name}
            </a>
          </p>
          <p style="text-align: center; padding-bottom: 3px;">
            <a style="color: #3483e9;">
              <span style="padding-right: 15px">企业数量</span>
              <span>${ticket.data.value}</span>家
            </a>
          </p>
          <p style="text-align: center;">
            <a style="color: #3483e9;">
              <span style="padding-right: 15px">所占比例</span>
              <span>${ticket.data.per}</span>%
            </a>
          </p>
        </div>`;
        return str;
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['63%', '85%'],
        avoidLabelOverlap: true,
        labelLine: {
          normal: {
            length2: 30,
            lineStyle: {
              color: '#999999',
            }
          }
        },
        label: {
          normal: {
            textStyle: {
              color: '#999999',
            }
          }
        },
        data: toJS(msStore.industryStatistics),
      }
    ]
  };

  return (
    <MapChart
      chartId="IndustryStatisticsChart"
      option={option}
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
    error: props.msStore.industryStatistics.length === 0,
    errCategory: 1,
  })
})(observer(IndustryStatisticsChart));
