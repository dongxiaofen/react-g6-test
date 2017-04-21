import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';
import ChartBox from 'components/monitorStatistics/ChartBox';

import HeadlinesTrendChart from './HeadlinesTrendChart';
function HeadlinesTrend({ msStore }) {
  return (
    <Col width="6">
      <StatisticTitle title="头条趋势分析" />
      <ChartBox height={450}>
        <HeadlinesTrendChart msStore={msStore} />
      </ChartBox>
    </Col>
  );
}

HeadlinesTrend.propTypes = {
  msStore: PropTypes.object,
};
export default observer(HeadlinesTrend);
