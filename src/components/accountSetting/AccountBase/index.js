import React from 'react';
import { observer } from 'mobx-react';
import BaseInfo from './BaseInfo';
import OperateInfo from './OperateInfo';
import styles from './index.less';
function AccountBase(props) {
  return (
    <div className={styles.wrapper}>
      <BaseInfo {...props} />
      <OperateInfo {...props} />
    </div>
  );
}

export default observer(AccountBase);
