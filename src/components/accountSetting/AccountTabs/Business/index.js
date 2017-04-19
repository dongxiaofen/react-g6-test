import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function Business() {
  return (
    <div className={styles.wrapper}>
      Business
    </div>
  );
}
export default observer(Business);
