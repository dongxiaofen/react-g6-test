import React from 'react';
import { observer } from 'mobx-react';
import Input from 'components/lib/input';
import Modal from 'components/lib/Modal';
import validate from 'helpers/validate';
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import styles from './index.less';
function AddModal({accountSettingStore}) {
  const moduleData = accountSettingStore.addModal;
  const formVal = moduleData.form;
  const errorMsg = moduleData.errorMsg;
  const errorBoxCss = errorMsg ? styles.errorBox : styles.errorBoxHide;
  const formConf = [
    {type: 'text', name: 'email', placeholder: '请输入登录账号'},
    {type: 'password', name: 'password', placeholder: '请输入登录密码', sameCheck: 'confirmPassword'},
    {type: 'password', name: 'confirmPassword', placeholder: '请再次输入登录密码', sameCheck: 'password'},
    {type: 'text', name: 'contact', placeholder: '姓名（必填）'},
    {type: 'text', name: 'contactPosition', placeholder: '职务'},
    {type: 'text', name: 'department', placeholder: '部门'},
    {type: 'text', name: 'phone', placeholder: '电话'},
    {type: 'text', name: 'contactEmail', placeholder: '邮箱'},
  ];
  const computedMsg = () => {
    const msgArr = [];
    formConf.forEach(item => {
      const msg = formVal[item.name].errorMsg;
      if (msg) {
        msgArr.push(msg);
      }
    });
    return msgArr[0] || '';
  };
  const inputChange = (evt) => {
    const {name, value} = evt.target;
    accountSettingStore.changeValue(`addModal.form.${name}.value`, value);
  };
  const inputCheck = (sameCheck, evt) => {
    const {name, value} = evt.target;
    const vdRule = formVal[name].vdRule;
    const sameVal = sameCheck && formVal[sameCheck].value;
    const msg = vdRule && validate[vdRule](value, sameVal);
    accountSettingStore.changeValue(`addModal.form.${name}.errorMsg`, msg);
    if (sameCheck && !msg) {
      accountSettingStore.changeValue(`addModal.form.${sameCheck}.errorMsg`, '');
    }
    accountSettingStore.changeValue(`addModal.errorMsg`, msg || computedMsg());
  };
  const allInputCheck = () => {
    const msgArr = [];
    formConf.forEach(item => {
      const {vdRule, value} = formVal[item.name];
      const sameVal = item.sameCheck && formVal[item.sameCheck].value;
      const msg = vdRule && validate[vdRule](value, sameVal);
      if (msg) {
        msgArr.push(msg);
        accountSettingStore.changeValue(`addModal.form.${item.name}.errorMsg`, msg);
      }
    });
    accountSettingStore.changeValue(`addModal.errorMsg`, msgArr[0]);
    return !msgArr[0];
  };
  const modalCancel = () => {
    accountSettingStore.resetAddInfo();
  };
  const modalConfirm = () => {
    if (allInputCheck()) {
      accountSettingStore.addNewUser({
        email: formVal.email.value,
        password: encHex.stringify(md5(formVal.password.value)),
        contact: formVal.contact.value,
        department: formVal.department.value,
        contactPosition: formVal.contactPosition.value,
        phone: formVal.phone.value,
        contactEmail: formVal.contactEmail.value,
      });
    }
  };
  const createInput = () => {
    return formConf.map(item => {
      const inputCss = formVal[item.name].errorMsg ? styles.inputError : styles.inputValid;
      return (
        <Input
          key={item.name}
          inputType="singleline"
          className={inputCss}
          type={item.type}
          name={item.name}
          onChange={inputChange}
          onBlur={inputCheck.bind(null, item.sameCheck)}
          value={formVal[item.name].value}
          placeholder={item.placeholder}
          />
      );
    });
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
      <h3 className={styles.modalTitle}>新增用户</h3>
      {createInput()}
      <div className={errorBoxCss}>
        <i className={styles.errIcon}></i>
        {errorMsg}
      </div>
    </Modal>
  );
}

export default observer(AddModal);
