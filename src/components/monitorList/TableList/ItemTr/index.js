import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function ItemTr({children, data, monitorListStore}) {
  const monitorId = data.monitorId;
  const relStatus = monitorListStore.relationListStatus.get(monitorId);
  const cssName = relStatus === 'show' ? styles.wrapperAct : styles.wrapper;
  return (
    <div className={cssName}>
      {children}
    </div>
  );
}

export default observer(ItemTr);
