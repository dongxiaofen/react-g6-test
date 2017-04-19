import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from '../index.less';
import Row from 'components/common/layout/Row';

import StatisticHoverBox from 'components/monitorStatistics/StatisticHoverBox';
import ProvinceAll from './ProvinceAll';
import ProvinceBar from './ProvinceBar';
import ProvinceLine from './ProvinceLine';
import ProvinceMap from './ProvinceMap';

function Province({ msStore }) {
  return (
    <div className={styles.statisticItem}>
      <Row>
        <ProvinceAll msStore={msStore} />
        <ProvinceBar msStore={msStore} />
      </Row>
      <StatisticHoverBox topArrow="1">
        <Row>
          <ProvinceLine msStore={msStore} />
          <ProvinceMap msStore={msStore} />
        </Row>
      </StatisticHoverBox>
    </div>
  );
}

Province.propTypes = {
  msStore: PropTypes.object,
};
export default observer(Province);
