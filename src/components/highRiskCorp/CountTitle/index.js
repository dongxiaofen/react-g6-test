import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function CountTitle() {
  return (
    <h2 className={styles.title}>
      高风险企业
    </h2>
  );
}
export default inject('highRiskCorpStore')(observer(CountTitle));
