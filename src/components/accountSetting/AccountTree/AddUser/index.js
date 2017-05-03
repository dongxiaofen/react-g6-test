import React from 'react';
import { observer } from 'mobx-react';
import Button from 'components/lib/button';
import AddModal from '../../userModal/AddModal';
import styles from './index.less';
function AddUser(props) {
  const showAddModal = () => {
    props.accountSettingStore.changeValue('addModal.visible', true);
  };
  return (
    <div>
      <Button
        className={styles.createBtn}
        onClick={showAddModal}>
        <span className={styles.plusIcon}>+</span>新增账号
      </Button>
      <AddModal {...props} />
    </div>
  );
}

export default observer(AddUser);
