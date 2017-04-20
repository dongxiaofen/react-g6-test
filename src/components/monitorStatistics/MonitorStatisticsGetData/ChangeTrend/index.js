import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from '../index.less';
import StatisticTitle from 'components/monitorStatistics/StatisticTitle';
import ChartBox from 'components/monitorStatistics/ChartBox';
import ChangeTrendBody from './ChangeTrendBody';

function ChangeTrend({ msStore }) {
  return (
    <div className={styles.statisticItem}>
      <StatisticTitle title="变化趋势" />
      <ChartBox height={363}>
        <ChangeTrendBody msStore={msStore} />
      </ChartBox>
    </div>
  );
}

ChangeTrend.propTypes = {
  msStore: PropTypes.object,
};
export default observer(ChangeTrend);
