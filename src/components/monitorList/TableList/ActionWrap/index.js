import React from 'react';
import { observer } from 'mobx-react';
import Switch from 'components/lib/switch';
import Modal from 'components/lib/Modal';
import styles from './index.less';
function ActionWrap({data, mainData, index, relation, monitorListStore}) {
  const monitorId = relation === 'main' ? data.monitorId : data.monitorCompanyType.monitorId;
  const status = data.status;
  const switchLoading = monitorListStore.switchLoading.get(monitorId);
  const textDict = {
    'PAUSE': '暂停',
    'EXPIRED': '监控到期',
    'MONITOR': '监控中',
  };
  let statusText = textDict[status];
  statusText = switchLoading ? '修改中' : statusText;
  const switchFlag = status === 'PAUSE' ? false : true;
  const expired = status === 'EXPIRED';
  const relDisable = relation === 'relation' && mainData.status === 'PAUSE';
  const relLoading = relation === 'relation' && monitorListStore.switchLoading.get(mainData.monitorId);
  const changeStatus = (newStatus) => {
    monitorListStore.changeStatus({
      monitorId,
      status: newStatus ? 'MONITOR' : 'PAUSE',
      index,
      relation,
      mMonitorId: relation === 'relation' ? mainData.monitorId : monitorId,
    });
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
            disabled={expired || relDisable}
            loading={switchLoading || relLoading} />
        </div>
        {relation === 'main' && <div className={styles.statusTextBox}>
          <div className={styles.statusText}>{statusText}</div>
          <div className={expired ? styles.rechargeBtn : styles.rechargeBtnBlue} onClick={recharge}>
            续期
          </div>
        </div>}
      </div>
      <Modal
        visible={!monitorId} />
    </div>
  );
}

export default observer(ActionWrap);
