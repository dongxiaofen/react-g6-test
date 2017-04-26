import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function DetailContent({internetStore}) {
  return (
    <div className={styles.content} dangerouslySetInnerHTML={{__html: internetStore.detailInfo.html}} />
  );
}

export default inject('internetStore')(observer(DetailContent));
