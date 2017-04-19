import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import StatisticTitle from '../../StatisticTitle';
import ChangeTrendBody from './ChangeTrendBody';

function ChangeTrend({ msStore }) {
  return (
    <div className={styles.statisticItem}>
      <StatisticTitle title="变化趋势" />
      <ChangeTrendBody msStore={msStore} />
    </div>
  );
}

ChangeTrend.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ChangeTrend);
