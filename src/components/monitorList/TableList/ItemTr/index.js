import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function ItemTr({children}) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}

export default observer(ItemTr);
