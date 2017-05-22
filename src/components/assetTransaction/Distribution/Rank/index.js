import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import Chart from './Chart';

function Rank({ assetTransactionStore }) {
  const distributionStaticKey = assetTransactionStore.distributionStaticKey;
  let title = '全国排名Top10（单位：笔数）';
  if (distributionStaticKey === 'transactionTotal' || distributionStaticKey === 'auctionTotal') {
    title = '全国排名Top10（单位：万元）';
  }
  return (
    <div className={`clearfix ${styles.wrap}`}>
      <h3 className={styles.title}>{title}</h3>
      <Chart
        loading={assetTransactionStore.areaDistributionLoading}
        distributionBar={assetTransactionStore.distributionBar} />
    </div>
  );
}

Rank.propTypes = {
  assetTransactionStore: PropTypes.object,
};
export default inject('assetTransactionStore')(observer(Rank));
