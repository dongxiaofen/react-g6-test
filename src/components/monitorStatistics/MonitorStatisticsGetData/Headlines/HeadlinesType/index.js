import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';
import ChartBox from 'components/monitorStatistics/ChartBox';

import HeadlinesTypeChart from './HeadlinesTypeChart';
function HeadlinesType({ msStore }) {
  return (
    <Col width="6">
      <StatisticTitle title="头条类型分析" />
      <ChartBox height={450}>
        <HeadlinesTypeChart msStore={msStore} />
      </ChartBox>
    </Col>
  );
}

HeadlinesType.propTypes = {
  msStore: PropTypes.object,
};
export default observer(HeadlinesType);
