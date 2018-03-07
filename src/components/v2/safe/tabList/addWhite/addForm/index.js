import React from 'react';
import {observer, inject} from 'mobx-react';
import Input from 'components/lib/input';
import Button from 'components/lib/button';
// import { Input } from 'antd';
// const { TextArea } = Input;
import styles from './index.less';

const AddForm = ({safeStore, modalStore}) => {
  const handleFormChange = (evt) => {
    const value = evt.target.value;
    const id = evt.target.id;
    safeStore.updateValue(`whiteList.form.${id}`, value);
  };
  return (
    <div>
      <div className={styles['input-box']}>
        <span className={styles.label}>添加白名单：</span>
        <Input
          id="ip"
          type="text"
          value={safeStore.whiteList.form.ip}
          onChange={handleFormChange}
          className={styles['ip-input']}/>
      </div>
      <div className={styles['input-box']}>
        <span className={styles.label}>备注：</span>
        {/*<TextArea autosize={{ minRows: 2, maxRows: 6 }} type="text"/>*/}
        <textArea
          id="remark"
          className={`${styles.textArea} ant-input`}
          value={safeStore.whiteList.form.remark}
          onChange={handleFormChange}></textArea>
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
          loading={safeStore.whiteList.isAddLoading}
          onClick={safeStore.createWhiteList}>
          确定
        </Button>
      </div>
    </div>
  );
};

export default inject('safeStore', 'modalStore')(observer(AddForm));
