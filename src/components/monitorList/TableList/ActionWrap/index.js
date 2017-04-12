import React from 'react';
import { observer, inject } from 'mobx-react';
import Switch from 'components/lib/switch';
import styles from './index.less';
function ActionWrap({data, relation}) {
  const expired = false;
  const switchFlag = data.status === 'PAUSE' ? false : true;
  const changeStatus = (newStatus) => {
    console.log(newStatus);
  };
  const recharge = () => {
    console.log('---');
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.actionBox}>
        <div className={styles.switchBox}>
          <Switch
            onChange={changeStatus}
            status={switchFlag}
            disabled={false}
            loading={false} />
        </div>
        {relation === 'main' && <div className={styles.statusTextBox}>
          <div className={styles.statusText}>监控中</div>
          <div className={expired ? styles.rechargeBtn : styles.rechargeBtnBlue} onClick={recharge}>
            续期
          </div>
        </div>}
      </div>
    </div>
  );
}

export default inject('monitorListStore')(observer(ActionWrap));
