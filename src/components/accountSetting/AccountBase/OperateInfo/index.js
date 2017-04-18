import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function OperateInfo() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoBox}>
      </div>
    </div>
  );
}

export default observer(OperateInfo);
