import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function Title({date}) {
  return (
    <div className={styles['title-box']}>
      {date} 详情
    </div>
  );
}
export default observer(Title);
