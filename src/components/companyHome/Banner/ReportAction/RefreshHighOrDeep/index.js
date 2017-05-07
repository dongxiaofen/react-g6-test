import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RefreshHighOrDeep() {
  return (
    <div className={styles.text}>
      确认刷新报告
    </div>
  );
}

export default observer(RefreshHighOrDeep);
