import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from '../../../StatisticTitle';

import ProvinceLineChart from './ProvinceLineChart';

function ProvinceLine({ msStore }) {
  return (
    <Col width="6">
      <StatisticTitle title={msStore.provinceName} subTitle=" - 变化趋势" />
      <ProvinceLineChart msStore={msStore} />
    </Col>
  );
}

ProvinceLine.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ProvinceLine);
