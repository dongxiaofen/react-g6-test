import React from 'react';
import {observer, inject} from 'mobx-react';
// import Input from 'components/lib/input';
import Button from 'components/lib/button';
import { Input } from 'antd';
const { TextArea } = Input;
import styles from './index.less';

const AddForm = ({accountStore, modalStore}) => {
  const handleFormChange = (evt) => {
    const value = evt.target.value;
    console.log(value, 'evt');
  };
  return (
    <div>
      <div className={styles['input-box']}>
        <span>请输入账号密码：</span>
        <Input
          id="ip"
          value={accountStore.safe.whiteList.form.ip}
          onChange={handleFormChange}
          className={styles.password}/>
      </div>
      <div className={styles['input-box']}>
        <span>请输入账号密码：</span>
        <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
      </div>
      <div className={styles['btn-box']}>
        <Button
          className={styles.cancelBtn}
          btnType="secondary"
          onClick={modalStore.closeAction}>
          取消
        </Button>
        <Button
          className={styles.confirmButton}
          btnType="primary"
          loading={accountStore.safe.isResetLoading}
          onClick={accountStore.resetApikey}>
          确定
        </Button>
      </div>
    </div>
  );
};

export default inject('accountStore', 'modalStore')(observer(AddForm));
