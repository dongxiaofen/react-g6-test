import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function KeyValue({theKey, theValue}) {
  return (
    <div>
      <span className={styles.key}>{theKey}：</span>
      <span className={styles.value}>
        {theValue || '无'}
      </span>
    </div>
  );
}
export default observer(KeyValue);
