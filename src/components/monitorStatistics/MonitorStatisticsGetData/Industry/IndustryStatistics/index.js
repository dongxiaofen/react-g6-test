import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';

import IndustryStatisticsChart from './IndustryStatisticsChart';
function IndustryStatistics({ msStore }) {
  return (
    <Col width="6">
      <StatisticTitle title="行业统计" subTitle="（ 排名前10的行业 ）" />
      <IndustryStatisticsChart msStore={msStore} />
    </Col>
  );
}

IndustryStatistics.propTypes = {
  msStore: PropTypes.object,
};
export default observer(IndustryStatistics);
