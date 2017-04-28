import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';

import ProvinceLineChart from './ProvinceLineChart';

function ProvinceLine({ msStore }) {
  const title = msStore.provinceName ? msStore.provinceName : '变化趋势';
  const subTitle = msStore.provinceName ? ' - 变化趋势' : '';
  return (
    <Col width="6">
      <StatisticTitle title={title} subTitle={subTitle} />
      <ProvinceLineChart msStore={msStore} />
    </Col>
  );
}

ProvinceLine.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ProvinceLine);
