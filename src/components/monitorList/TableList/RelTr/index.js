import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import RelTime from './RelTime';
import ActionWrap from '../ActionWrap';
function RelTr({data}) {
  // const {relatedMonitorId, companyType, companyName} = data.monitorCompanyType;
  const handleRelName = () => {
    console.log('---');
  };
  return (
    <div className={styles.rTr}>
      <div className={styles.companyWrap}>
        <div className={styles.nameWrap}>
          <span className={styles.relationship}>
            {`［关系：${data.relationship}］`}
          </span>
          {handleRelName()}
        </div>
      </div>
      <div className={styles.timeWrap}>
        <RelTime values={data.startTm} />
        <RelTime values={data.stopTm} />
        <RelTime values={data.latestTs} />
      </div>
      <ActionWrap data={data} relation="relation" />
    </div>
  );
}
export default inject('monitorListStore')(observer(RelTr));
