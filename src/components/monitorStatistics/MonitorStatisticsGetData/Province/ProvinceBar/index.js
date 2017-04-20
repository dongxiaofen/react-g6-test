import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';
import ChartBox from 'components/monitorStatistics/ChartBox';

import ProvinceBarChart from './ProvinceBarChart';

function ProvinceBar({ msStore }) {
  return (
    <Col width="6">
      <StatisticTitle title="地区排行" />
      <ChartBox height={400}>
        <ProvinceBarChart msStore={msStore} />
      </ChartBox>
    </Col>
  );
}

ProvinceBar.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ProvinceBar);
