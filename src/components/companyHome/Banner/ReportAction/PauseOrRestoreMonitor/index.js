import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function PauseOrRestoreMonitor() {
  return (
    <div className={styles.text}>
      监控未到期，暂停监控后将不更新该企业信息，监控截止日期将不受影响，确定暂停监控？
    </div>
  );
}

export default observer(PauseOrRestoreMonitor);
