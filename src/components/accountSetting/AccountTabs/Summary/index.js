import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function Summary() {
  return (
    <div className={styles.wrapper}>
      Summary
    </div>
  );
}
export default observer(Summary);
