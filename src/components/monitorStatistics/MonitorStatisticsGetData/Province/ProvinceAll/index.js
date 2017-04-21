import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Col from 'components/common/layout/Col';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';
import ChartBox from 'components/monitorStatistics/ChartBox';

import ProvinceAllChart from './ProvinceAllChart';

function ProvinceAll({ msStore }) {
  const provinceAllSize = msStore.provinceAllSize ? `（ 分布省市${msStore.provinceAllSize}个 ）` : '';
  return (
    <Col width="6">
      <StatisticTitle title="地区分布" subTitle={provinceAllSize} />
      <ChartBox height={400}>
        <ProvinceAllChart msStore={msStore} />
      </ChartBox>
    </Col>
  );
}

ProvinceAll.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ProvinceAll);
