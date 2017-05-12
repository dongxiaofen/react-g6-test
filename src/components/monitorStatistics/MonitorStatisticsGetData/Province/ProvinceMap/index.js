import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';
import ProvinceMapChart from './ProvinceMapChart';

function ProvinceMap({ msStore }) {
  const title = msStore.provinceName ? msStore.provinceName : '企业地区分布 TOP.10';
  const subTitle = msStore.provinceName ? '- 企业地区分布 TOP.10' : '';
  return (
    <Col width="6">
      <StatisticTitle title={title} subTitle={subTitle} />
      <ProvinceMapChart msStore={msStore} />
    </Col>
  );
}

ProvinceMap.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ProvinceMap);
