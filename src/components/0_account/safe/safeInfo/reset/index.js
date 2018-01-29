import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Input from 'components/lib/input';
import Button from 'components/lib/button';
import styles from './index.less';

function ResetKey({accountStore, modalStore}) {
  const getPassword = (evt) => {
    accountStore.updateValue('safe.password.value', evt.target.value);
    accountStore.updateValue('safe.password.error', '');
  };
  return (
    <div>
      <p className={styles.alert}>温馨提示：一经修改，请立即修改相应配置，否则会导致接口无法使用</p>
      <div className={styles['password-box']}>
        <span>请输入账号密码：</span>
        <Input
          id="reset-password"
          type="password"
          value={accountStore.safe.password.value}
          onChange={getPassword}
          className={styles.password}/>
        {accountStore.safe.password.error ? <p className={styles.error}>{accountStore.safe.password.error}</p> : null}
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
}

ResetKey.propTypes = {
  accountStore: PropTypes.object,
};

export default inject('accountStore', 'modalStore')(observer(ResetKey));
