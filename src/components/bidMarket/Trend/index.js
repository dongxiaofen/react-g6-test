import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import Chart from './Chart';

function Trend({ bidMarketStore }) {
  return (
    <div className={styles}>
      this is trend
      <Chart trend={bidMarketStore.trend} />
    </div>
  );
}

Trend.propTypes = {
  bidMarketStore: PropTypes.object,
};
export default inject('bidMarketStore')(observer(Trend));
