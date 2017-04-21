import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function RelTime({values}) {
  return (
    <div className={styles.relTime}>
      {values ? values : '--'}
    </div>
  );
}
export default observer(RelTime);
