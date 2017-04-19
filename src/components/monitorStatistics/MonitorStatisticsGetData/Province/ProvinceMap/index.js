import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from '../../../StatisticTitle';
import ProvinceMapChart from './ProvinceMapChart';

function ProvinceMap({ msStore }) {
  return (
    <Col width="6">
      <StatisticTitle title={msStore.provinceName} subTitle=" - 企业地区分布 TOP.10" />
      <ProvinceMapChart msStore={msStore} />
    </Col>
  );
}

ProvinceMap.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ProvinceMap);
