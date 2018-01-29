import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Input from 'components/lib/input';
import FormItem from 'components/lib/FormItem';
import Button from 'components/lib/button';
import styles from './index.less';

function ModifyMain({accountStore}) {
  const changeValue = (evt) => {
    // console.log(evt.target.value);
    accountStore.updateValue(`modify.${evt.target.id}.value`, evt.target.value);
  };
  const resetVlidateStatus = (key) => {
    accountStore.updateValue(`modify.${key}.validateStatus`, 'init');
    accountStore.updateValue(`modify.${key}.errText`, '');
  };
  const validateValue = (key) => {
    const value = accountStore.modify[key].value;
    if (!value) {
      accountStore.updateValue(`modify.${key}.validateStatus`, 'error');
      accountStore.updateValue(`modify.${key}.errText`, '密码不能为空');
      return;
    }
    if (value.length < 8 || value.length > 16) {
      accountStore.updateValue(`modify.${key}.validateStatus`, 'error');
      accountStore.updateValue(`modify.${key}.errText`, '密码长度为8~16位');
    }
    if (key === 'confirmPw' && (accountStore.modify.newPw.value !== value)) {
      accountStore.updateValue(`modify.${key}.validateStatus`, 'error');
      accountStore.updateValue(`modify.${key}.errText`, '密码输入不一致');
    }
  };
  const judgeDisabled = () => {
    let notSubmit = false;
    Object.keys(accountStore.modify).map((item) => {
      if (accountStore.modify[item].value === '') {
        notSubmit = true;
        // accountStore.updateValue(`modify.${item}.errText`, '密码不能为空');
      }
    });
    return notSubmit;
  };
  const createForm = () => {
    const formData = accountStore.modify;
    const keyArr = Object.keys(formData);
    return keyArr.map((key, idx) => {
      return (
        <FormItem
          key={idx}
          labelCol="0.32"
          wrapperCol="0.6"
          label={formData[key].label}
          className={styles['form-item']}
        >
          <div className={styles.psInput}>
            <Input
              id={key}
              type="password"
              value={formData[key].value}
              onChange={changeValue}
              onFocus={resetVlidateStatus.bind(this, key)}
              onBlur={validateValue.bind(this, key)}
              className={`${styles.input} ${formData[key].validateStatus === 'error' ? styles.error : ''}`}
              autoComplete={false}
            />
          {
            formData[key].errText ? <div className={styles.errText}>{formData[key].errText}</div> : null
          }
          </div>
        </FormItem>
      );
    });
  };
  return (
    <div className={styles['form-box']}>
      {createForm()}
      <FormItem
        labelCol="0"
        wrapperCol="1"
        className={styles['btn-box']}
      >
      <Button
        btnType="primary"
        onClick={accountStore.handleSubmit}
        className={`fs5 ${styles.submit}`}
        disabled={judgeDisabled()}
        loading={accountStore.isModifyLoading}>
        确认
      </Button>
      </FormItem>
    </div>
  );
}

ModifyMain.propTypes = {
  accountStore: PropTypes.object,
};
export default inject('accountStore')(observer(ModifyMain));
