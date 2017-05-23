import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import Content from './Content';

function Assess({ assetTransactionStore }) {
  const detail = assetTransactionStore.distributionDetail;
  const asset80Focus = detail.asset80Focus ? (detail.asset80Focus * 100).toFixed(2) : 0;
  return (
    <div className={`clearfix ${styles.wrap}`}>
      <div className={styles.info}>
        <div>
          {detail.region}地区交易评估：
          <span>
            {detail.region} 80% 的资金交易金额，主要集中在前 {asset80Focus}% 笔的交易中。
          </span>
        </div>
      </div>
      <Content
        loading={assetTransactionStore.areaDistributionDetailLoading}
        type={assetTransactionStore.distributionParams.type}
        detail={detail} />
    </div>
  );
}

Assess.propTypes = {
  assetTransactionStore: PropTypes.object,
};
export default inject('assetTransactionStore')(observer(Assess));
