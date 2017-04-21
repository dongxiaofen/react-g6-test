import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';
import StatisticHoverBox from 'components/monitorStatistics/StatisticHoverBox';
import ChartBox from 'components/monitorStatistics/ChartBox';

import IndustryTrendChart from './IndustryTrendChart';
function IndustryTrend({ msStore }) {
  const title = msStore.industryName ? msStore.industryName : '变化趋势';
  const subTitle = msStore.industryName ? ' - 变化趋势' : '';
  return (
    <Col width="6">
      <StatisticHoverBox leftArrow="1">
        <StatisticTitle title={title} subTitle={subTitle} />
        <ChartBox height={300}>
          <IndustryTrendChart msStore={msStore} />
        </ChartBox>
      </StatisticHoverBox>
    </Col>
  );
}

IndustryTrend.propTypes = {
  msStore: PropTypes.object,
};
export default observer(IndustryTrend);
