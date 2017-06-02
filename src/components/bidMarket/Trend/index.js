import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import Chart from './Chart';

function Trend({ bidMarketStore }) {
  const params = bidMarketStore.params;
  const province = params.province;
  const city = params.city;
  let title = '全国变化趋势';
  if (province) {
    title = province + '变化趋势';
  }
  if (city) {
    title = province + '-' + city + '变化趋势';
  }
  return (
    <div className={styles.wrap}>
      <h4 className={styles['bidMarket-black-title']}>{title}</h4>
      <Chart
        trend={bidMarketStore.trend}
        trendLoading={bidMarketStore.trendLoading}/>
    </div>
  );
}

Trend.propTypes = {
  bidMarketStore: PropTypes.object,
};
export default inject('bidMarketStore')(observer(Trend));
