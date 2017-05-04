import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'components/lib/input';
import Modal from 'components/lib/Modal';
import validate from 'helpers/validate';
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import styles from './index.less';
function PwdModal({accountSettingStore, clientStore}) {
  if (!accountSettingStore.base.data) {
    return null;
  }
  const moduleData = accountSettingStore.pwdModal;
  const formVal = moduleData.form;
  const userId = accountSettingStore.base.data.id;
  const userEmail = clientStore.userInfo.email;
  const email = accountSettingStore.base.data.email;
  const errorMsg = moduleData.errorMsg;
  const errorBoxCss = errorMsg ? styles.errorBox : styles.errorBoxHide;
  const formConf = [
    {type: 'password', name: 'oldPwd', placeholder: '请输入旧密码'},
    {type: 'password', name: 'newPwd', placeholder: '请输入新密码', sameCheck: 'reNewPwd'},
    {type: 'password', name: 'reNewPwd', placeholder: '请再次输入新密码', sameCheck: 'newPwd'},
  ];
  if (email !== userEmail) {
    formConf.shift();
  }
  const allInputCheck = () => {
    const msgArr = [];
    formConf.forEach(item => {
      const {vdRule, value} = formVal[item.name];
      const sameVal = item.sameCheck && formVal[item.sameCheck].value;
      const msg = vdRule && validate[vdRule](value, sameVal);
      if (msg) {
        msgArr.push(msg);
        accountSettingStore.changeValue(`pwdModal.form.${item.name}.errorMsg`, msg);
      }
    });
    accountSettingStore.changeValue(`pwdModal.errorMsg`, msgArr[0]);
    return !msgArr[0];
  };
  const modalCancel = () => {
    accountSettingStore.resetPwdModal();
  };
  const modalConfirm = () => {
    if (allInputCheck()) {
      const url = email !== userEmail ? `/api/user/sub/${userId}/password` : `/api/user/password`;
      const params = email !== userEmail ? {
        newPw: encHex.stringify(md5(formVal.newPwd.value)),
      } : {
        oldPw: encHex.stringify(md5(formVal.oldPwd.value)),
        newPw: encHex.stringify(md5(formVal.newPwd.value)),
      };
      accountSettingStore.changePwd(url, params);
    }
  };
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
    accountSettingStore.changeValue(`pwdModal.form.${name}.value`, value);
  };
  const inputCheck = (sameCheck, evt) => {
    const {name, value} = evt.target;
    const vdRule = formVal[name].vdRule;
    const sameVal = sameCheck && formVal[sameCheck].value;
    const msg = vdRule && validate[vdRule](value, sameVal);
    accountSettingStore.changeValue(`pwdModal.form.${name}.errorMsg`, msg);
    if (sameCheck && !msg) {
      accountSettingStore.changeValue(`pwdModal.form.${sameCheck}.errorMsg`, '');
    }
    accountSettingStore.changeValue(`pwdModal.errorMsg`, msg || computedMsg());
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
      confirmText="保存"
      confirmLoading={moduleData.loading}
      >
      <h3 className={styles.modalTitle}>修改密码</h3>
      <div className={styles.emailLine}>
        <span className={styles.emailKey}>账号</span>
        <span className={styles.emailVal}>{email}</span>
      </div>
      {createInput()}
      <div className={errorBoxCss}>
        <i className={styles.errIcon}></i>
        {errorMsg}
      </div>
    </Modal>
  );
}

export default inject('accountSettingStore', 'clientStore')(observer(PwdModal));
