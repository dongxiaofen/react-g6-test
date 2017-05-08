import React from 'react';
import { observer } from 'mobx-react';
import Modal from 'components/lib/Modal';
import styles from './index.less';
function PauseInfo({monitorListStore}) {
  const { visible, loading } = monitorListStore.pauseInfo;
  const confirmAction = () => {
    monitorListStore.changeStatusInfo({
      loading: true,
    });
    monitorListStore.changeStatus();
  };
  const cancelAction = () => {
    monitorListStore.changeStatusInfo({
      visible: false,
      loading: false,
    });
  };
  return (
    <Modal
      width="440px"
      title="暂停监控"
      visible={visible}
      cancelText="取消"
      confirmText="确认"
      confirmLoading={loading}
      confirmAction={confirmAction}
      cancelAction={cancelAction}
      closeAction={cancelAction}
      isNeedBtn>
      <p className={styles.info}>
        监控未到期，暂停监控后将不更新该企业信息，截止监控日期将不受影响，确定暂停监控？
      </p>
    </Modal>
  );
}
export default observer(PauseInfo);
