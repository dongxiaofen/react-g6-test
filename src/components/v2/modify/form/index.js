import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Input from 'components/lib/input';
import FormItem from 'components/lib/FormItem';
import Button from 'components/lib/button';
import styles from './index.less';

function ModifyMain({modifyStore}) {
  const changeValue = (evt) => {
    // console.log(evt.target.value);
    modifyStore.updateValue(`modify.${evt.target.id}.value`, evt.target.value);
  };
  const resetVlidateStatus = (key) => {
    modifyStore.updateValue(`modify.${key}.validateStatus`, 'init');
    modifyStore.updateValue(`modify.${key}.errText`, '');
  };
  const validateValue = (key) => {
    const value = modifyStore.modify[key].value;
    if (!value) {
      modifyStore.updateValue(`modify.${key}.validateStatus`, 'error');
      modifyStore.updateValue(`modify.${key}.errText`, '密码不能为空');
      return;
    }
    if (value.length < 8 || value.length > 16) {
      modifyStore.updateValue(`modify.${key}.validateStatus`, 'error');
      modifyStore.updateValue(`modify.${key}.errText`, '密码长度为8~16位');
    }
    if (key === 'confirmPw' && (modifyStore.modify.newPw.value !== value)) {
      modifyStore.updateValue(`modify.${key}.validateStatus`, 'error');
      modifyStore.updateValue(`modify.${key}.errText`, '密码输入不一致');
    }
  };
  const judgeDisabled = () => {
    let notSubmit = false;
    Object.keys(modifyStore.modify).map((item) => {
      if (modifyStore.modify[item].value === '') {
        notSubmit = true;
        // modifyStore.updateValue(`modify.${item}.errText`, '密码不能为空');
      }
    });
    return notSubmit;
  };
  const createForm = () => {
    const formData = modifyStore.modify;
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
        onClick={modifyStore.handleSubmit}
        className={`fs5 ${styles.submit}`}
        disabled={judgeDisabled()}
        loading={modifyStore.isModifyLoading}>
        确认
      </Button>
      </FormItem>
    </div>
  );
}

ModifyMain.propTypes = {
  modifyStore: PropTypes.object,
};
export default inject('modifyStore')(observer(ModifyMain));
