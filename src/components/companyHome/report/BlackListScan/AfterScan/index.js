import React from 'react';
import { observer } from 'mobx-react';
import Header from './Header';
import VerTab from './VerTab';
import styles from './index.less';

function AfterScan() {
  return (
    <div className={styles.wrap}>
      <Header />
      <VerTab />
    </div>
  );
}

export default observer(AfterScan);
