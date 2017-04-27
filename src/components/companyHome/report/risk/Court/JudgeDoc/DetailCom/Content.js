import React from 'react';
import {observer, inject} from 'mobx-react';
import styles from './index.less';

function Content({riskStore}) {
  return (
    <div className={styles.wrap}>
      <div dangerouslySetInnerHTML={{__html: riskStore.court.detailModalData.content}} />
    </div>
  );
}
export default inject('riskStore')(observer(Content));
