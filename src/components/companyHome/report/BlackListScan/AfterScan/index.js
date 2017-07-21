import React from 'react';
import { observer } from 'mobx-react';
import Header from './Header';
import VerTab from './VerTab';
import styles from './index.less';

function AfterScan({ blackListScanStore, reportId }) {
  return (
    <div className={styles.wrap}>
      <Header blackListScanStore={blackListScanStore} reportId={reportId} />
      <VerTab blackListScanStore={blackListScanStore} />
    </div>
  );
}

export default observer(AfterScan);
