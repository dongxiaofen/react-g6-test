import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';

import HeadlinesTypeChart from './HeadlinesTypeChart';
function HeadlinesType({ msStore }) {
  return (
    <Col width="6">
      <StatisticTitle title="头条类型分析" />
      <HeadlinesTypeChart msStore={msStore} />
    </Col>
  );
}

HeadlinesType.propTypes = {
  msStore: PropTypes.object,
};
export default observer(HeadlinesType);
