import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function DetailFooter({internetStore}) {
  return (
    <div className={styles.footer}>{`信息来源：${internetStore.detailInfo.source}`}</div>
  );
}

export default inject('internetStore')(observer(DetailFooter));
