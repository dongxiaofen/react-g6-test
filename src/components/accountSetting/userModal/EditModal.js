import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'components/lib/input';
import Modal from 'components/lib/Modal';
import validate from 'helpers/validate';
import styles from './index.less';
function EditModal({accountSettingStore}) {
  const baseInfo = accountSettingStore.base.data;
  if (!baseInfo) {
    return null;
  }
  const moduleData = accountSettingStore.editModal;
  const formVal = moduleData.form;
  const actName = moduleData.actName;
  const errorMsg = formVal[actName].errorMsg;
  const errorBoxCss = errorMsg ? styles.errorBox : styles.errorBoxHide;
  const inputCss = formVal[actName].errorMsg ? styles.inputError : styles.inputValid;
  const modalCancel = () => {
    accountSettingStore.resetEditModal();
  };
  const modalConfirm = () => {
    const name = actName;
    const value = formVal[name].value;
    const vdRule = formVal[name].vdRule;
    const msg = vdRule && validate[vdRule](value);
    accountSettingStore.changeValue(`editModal.form.${name}.errorMsg`, msg);
    if (!msg) {
      const params = {
        contact: baseInfo.contact,
        contactPosition: baseInfo.contactPosition,
        department: baseInfo.department,
        phone: baseInfo.phone,
        contactEmail: baseInfo.contactEmail,
      };
      const url = `/api/user/sub/${baseInfo.id}`;
      params[name] = value;
      accountSettingStore.editInfo(url, name, params);
    }
  };
  const inputChange = (evt) => {
    const {name, value} = evt.target;
    accountSettingStore.changeValue(`editModal.form.${name}.value`, value);
  };
  const inputCheck = (evt) => {
    const {name, value} = evt.target;
    const vdRule = formVal[name].vdRule;
    const msg = vdRule && validate[vdRule](value);
    accountSettingStore.changeValue(`editModal.form.${name}.errorMsg`, msg);
  };
  return (
    <Modal
      visible={moduleData.visible}
      width="440px"
      closeAction={modalCancel}
      cancelAction={modalCancel}
      confirmAction={modalConfirm}
      isNeedBtn
      cancelText="取消"
      confirmText="确定"
      confirmLoading={moduleData.loading}
      >
      <h3 className={styles.modalTitle}>{formVal[actName].title}</h3>
      <Input
        key={actName}
        inputType="singleline"
        className={inputCss}
        type="text"
        name={actName}
        onChange={inputChange}
        onBlur={inputCheck}
        value={formVal[actName].value.replace('- -', '')}
        placeholder={formVal[actName].placeholder}
        />
      <div className={errorBoxCss}>
        <i className={styles.errIcon}></i>
        {errorMsg}
      </div>
    </Modal>
  );
}

export default inject('accountSettingStore')(observer(EditModal));
