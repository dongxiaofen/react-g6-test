import React from 'react';
import {observer} from 'mobx-react';

import styles from './index.less';

function MainContBox(props) {
  return (
    <div className={styles.box}>
      {props.children}
    </div>
  );
}

export default observer(MainContBox);
