import React from 'react';
import { observer } from 'mobx-react';
import Trends from './trends';
import Detail from './detail';
import styles from './index.less';

function NewBusiness(props) {
  return (
    <div className={styles['business-box']}>
      <div className={styles.trends}>
        <Trends {...props} />
      </div>
      <div className={styles.detail}>
        <Detail {...props} />
      </div>
    </div>
  );
}

export default observer(NewBusiness);
