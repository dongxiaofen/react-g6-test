import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from '../index.less';
import Row from 'components/common/layout/Row';

import HeadlinesTrend from './HeadlinesTrend';
import HeadlinesType from './HeadlinesType';
function Headlines({ msStore }) {
  return (
    <div className={styles.statisticItem}>
      <Row>
        <HeadlinesTrend msStore={msStore} />
        <HeadlinesType msStore={msStore} />
      </Row>
    </div>
  );
}

Headlines.propTypes = {
  msStore: PropTypes.object,
};
export default observer(Headlines);
