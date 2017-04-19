import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from '../../../StatisticTitle';

import ProvinceAllChart from './ProvinceAllChart';

function ProvinceAll({ msStore }) {
  const provinceAllSize = msStore.provinceAllSize ? `（ 分布省市${msStore.provinceAllSize}个 ）` : '';
  return (
    <Col width="6">
      <StatisticTitle title="地区分布" subTitle={provinceAllSize} />
      <ProvinceAllChart msStore={msStore} />
    </Col>
  );
}

ProvinceAll.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ProvinceAll);
