import React from 'react';
import { observer, inject } from 'mobx-react';
import Switch from 'components/lib/switch';
import Modal from 'components/lib/Modal';
import styles from './index.less';
function ActionWrap({ data, mainData, index, relation, monitorListStore, payModalStore, messageStore, clientStore }) {
  const monitorId = relation === 'main' ? data.monitorId : data.monitorCompanyType.monitorId;
  const status = data.status;
  const switchLoading = monitorListStore.monitorList.switchLoading.get(monitorId);
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
  const relLoading = relation === 'relation' && monitorListStore.monitorList.switchLoading.get(mainData.monitorId);
  const changeStatus = (newStatus) => {
    if (newStatus || relation === 'relation') {
      monitorListStore.changeStatus({
        visible: true,
        monitorId,
        status: newStatus ? 'MONITOR' : 'PAUSE',
        idx: index,
        relation,
        mMonitorId: relation === 'relation' ? mainData.monitorId : monitorId,
      });
    } else {
      monitorListStore.changeStatusInfo({
        visible: true,
        monitorId,
        status: newStatus ? 'MONITOR' : 'PAUSE',
        idx: index,
        relation,
        mMonitorId: relation === 'relation' ? mainData.monitorId : monitorId,
      });
    }
  };
  const successCb = () => {
    payModalStore.closeAction();
    messageStore.openMessage({
      type: 'info',
      content: '续费成功',
    });
  };
  const errorCb = (err) => {
    payModalStore.closeAction();
    messageStore.openMessage({
      type: 'error',
      content: err.response && err.response.data && err.response.data.message || '续费失败',
    });
  };
  const choiceOk = () => {
    monitorListStore.renewalAction({
      monitorId,
      index,
      time: payModalStore.selectValue,
      successCb,
      errorCb,
    });
  };
  const recharge = () => {
    let config = {
      'modalType': 'continueMonitor',
      'width': '560px',
      'callBack': choiceOk
    };
    if (clientStore.userInfo.consumeType === 'FEESET') {
      config = {
        'isComboRenewal': true,
        'callBack': choiceOk
      };
    }
    payModalStore.openCompModal({ ...config });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.actionBox}>
        <div className={styles.switchBox}>
          <div className={styles.statusText}>{statusText}</div>
          <Switch
            onChange={changeStatus}
            status={switchFlag}
            disabled={expired || relDisable}
            loading={switchLoading || relLoading} />
        </div>
        {relation === 'main' && <div className={styles.statusTextBox}>
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

export default inject('payModalStore', 'messageStore', 'clientStore')(observer(ActionWrap));
