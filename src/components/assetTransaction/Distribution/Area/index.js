import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import Chart from './Chart';

function Area({ assetTransactionStore }) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>资产地区分布</h2>
      <Chart
        loading={assetTransactionStore.areaDistributionLoading}
        distributionStaticKey={assetTransactionStore.distributionStaticKey}
        params={assetTransactionStore.distributionParams}
        distributionMapData={assetTransactionStore.distributionMapData}
        setParams={assetTransactionStore.setDistributionParams}
        getAreaDistributionDetail={assetTransactionStore.getAreaDistributionDetail}
        mapSymbol={assetTransactionStore.mapSymbol} />
    </div>
  );
}

Area.propTypes = {
  assetTransactionStore: PropTypes.object,
};
export default inject('assetTransactionStore')(observer(Area));
