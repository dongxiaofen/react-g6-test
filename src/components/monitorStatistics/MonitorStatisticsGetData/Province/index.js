import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from '../index.less';
import Row from 'components/common/layout/Row';

import ProvinceAll from './ProvinceAll';
import ProvinceBar from './ProvinceBar';

function Province({ msStore }) {
  return (
    <div className={styles.statisticItem}>
      <Row>
        <ProvinceAll msStore={msStore} />
        <ProvinceBar msStore={msStore} />
      </Row>
    </div>
  );
}

Province.propTypes = {
  msStore: PropTypes.object,
};
export default observer(Province);
