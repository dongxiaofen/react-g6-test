import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import Content from './Content';

function Assess({ assetTransactionStore }) {
  return (
    <div className={`clearfix ${styles.wrap}`}>
      <Content
        loading={assetTransactionStore.areaDistributionDetailLoading}
        type={assetTransactionStore.distributionParams.type}
        detail={assetTransactionStore.distributionDetail} />
    </div>
  );
}

Assess.propTypes = {
  assetTransactionStore: PropTypes.object,
};
export default inject('assetTransactionStore')(observer(Assess));
