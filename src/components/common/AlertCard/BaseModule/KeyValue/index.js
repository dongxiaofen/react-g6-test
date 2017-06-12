import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function KeyValue({theKey, theValue, handle}) {
  return (
    <div>
      <span className={styles.key}>{theKey}：</span>
      <span className={styles.value}>
        {handle ? handle(theValue) : theValue || '--'}
      </span>
    </div>
  );
}
export default observer(KeyValue);
