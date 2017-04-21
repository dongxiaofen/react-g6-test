import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from '../index.less';
import Row from 'components/common/layout/Row';

import IndustryStatistics from './IndustryStatistics';
import IndustryTrend from './IndustryTrend';
function Industry({ msStore }) {
  return (
    <div className={styles.statisticItem}>
      <Row>
        <IndustryStatistics msStore={msStore} />
        <IndustryTrend msStore={msStore} />
      </Row>
    </div>
  );
}

Industry.propTypes = {
  msStore: PropTypes.object,
};
export default observer(Industry);
