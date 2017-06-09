import React from 'react';
import {observer, inject} from 'mobx-react';
import styles from './index.less';

function Content({riskCourtStore}) {
  return (
    <div className={styles.wrap}>
      <div dangerouslySetInnerHTML={{__html: riskCourtStore.court.detailModalData.content}} />
    </div>
  );
}
export default inject('riskCourtStore')(observer(Content));
