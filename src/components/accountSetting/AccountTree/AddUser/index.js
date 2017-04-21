import React from 'react';
import { observer } from 'mobx-react';
import Button from 'components/lib/button';
import styles from './index.less';
function AddUser() {
  const showAddModal = () => {
    console.log('---');
  };
  return (
    <div>
      <Button
        className={styles.createBtn}
        onClick={showAddModal}>
        <span className={styles.plusIcon}>+</span>新增账号
      </Button>
    </div>
  );
}

export default observer(AddUser);
