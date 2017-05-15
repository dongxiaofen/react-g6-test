import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function AlertCorp() {
  return (
    <div>
      <div className={styles.itemBox}>
        <span className={styles.corpName}>么么么么有限公司</span>
        <span className={styles.score}>综合分 98</span>
        <span className={styles.date}>最新预警日期：2012-01-01</span>
      </div>
    </div>
  );
}

export default observer(AlertCorp);
