import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function Title() {
  return (
    <div className={styles.titleCss}>
      贷中分析
    </div>
  );
}

export default observer(Title);
