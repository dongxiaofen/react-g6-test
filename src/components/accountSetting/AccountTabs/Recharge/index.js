import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function Recharge() {
  return (
    <div className={styles.wrapper}>
      Recharge
    </div>
  );
}
export default observer(Recharge);
