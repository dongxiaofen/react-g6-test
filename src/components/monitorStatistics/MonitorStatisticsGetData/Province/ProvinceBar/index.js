import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from '../../../StatisticTitle';

import ProvinceBarChart from './ProvinceBarChart';

function ProvinceBar({ msStore }) {
  return (
    <Col width="6">
      <StatisticTitle title="地区排行" />
      <ProvinceBarChart msStore={msStore} />
    </Col>
  );
}

ProvinceBar.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ProvinceBar);
