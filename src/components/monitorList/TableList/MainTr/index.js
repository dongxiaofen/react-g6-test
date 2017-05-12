import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import CompanyWrap from './CompanyWrap';
import TimeWrap from './TimeWrap';
import ActionWrap from '../ActionWrap';
function MainTr(props) {
  return (
    <div className={styles.wrapper}>
      <CompanyWrap {...props} />
      <TimeWrap {...props} />
      <ActionWrap {...props} />
    </div>
  );
}

export default observer(MainTr);
