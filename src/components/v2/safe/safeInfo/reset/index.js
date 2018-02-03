import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Input from 'components/lib/input';
import Button from 'components/lib/button';
import styles from './index.less';

function ResetKey({safeStore, modalStore}) {
  const getPassword = (evt) => {
    safeStore.updateValue('password.value', evt.target.value);
    safeStore.updateValue('password.error', '');
  };
  return (
    <div>
      <p className={styles.alert}>温馨提示：一经修改，请立即修改相应配置，否则会导致接口无法使用</p>
      <div className={styles['password-box']}>
        <span>请输入账号密码：</span>
        <Input
          id="reset-password"
          type="password"
          value={safeStore.password.value}
          onChange={getPassword}
          className={styles.password}/>
        {safeStore.password.error ? <p className={styles.error}>{safeStore.password.error}</p> : null}
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
          loading={safeStore.isResetLoading}
          onClick={safeStore.resetApikey}>
          确定
        </Button>
      </div>
    </div>
  );
}

ResetKey.propTypes = {
  safeStore: PropTypes.object,
};

export default inject('safeStore', 'modalStore')(observer(ResetKey));
