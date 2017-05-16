import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Chart from './Chart';

function Rank({ bidMarketStore }) {
  const params = bidMarketStore.params;
  const province = params.province;
  const city = params.city;
  let title = '全国中标金额总量排行';
  if (province) {
    title = province + '中标金额总量排行';
  }
  if (city) {
    title = province + '-' + city + '中标金额总量排行';
  }
  return (
    <div className={styles.wrap}>
      <h4 className={styles['bidMarket-black-title']}>
        {title}
        <span className={styles['bar-sub-title']}>（ TOP 10 ）</span>
      </h4>
      <Chart
        rank={bidMarketStore.rank}
        rankLoading={bidMarketStore.rankLoading}
        tabSwitchIndex={bidMarketStore.tabSwitchIndex}
        setSwitchTab={bidMarketStore.setSwitchTab} />
    </div>
  );
}

Rank.propTypes = {
  bidMarketStore: PropTypes.object,
};
export default inject('bidMarketStore')(observer(Rank));
