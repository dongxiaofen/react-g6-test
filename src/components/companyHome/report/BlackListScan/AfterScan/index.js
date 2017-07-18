import React from 'react';
import { observer } from 'mobx-react';
import Header from './Header';
import VerTab from './VerTab';
import styles from './index.less';

function AfterScan({ blackListScanStore }) {
  return (
    <div className={styles.wrap}>
      <Header blackListScanStore={blackListScanStore} />
      <VerTab blackListScanStore={blackListScanStore} />
    </div>
  );
}

export default observer(AfterScan);
