import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function MainTime(props) {
  return (
    <div className={styles.time}>
      <div className={styles.timeValue}>{props.values ? props.values : '--'}</div>
      <div className={styles.timeKey}>{props.keys}</div>
    </div>
  );
}
export default observer(MainTime);
