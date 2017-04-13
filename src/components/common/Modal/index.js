import React from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'components/lib/Modal';

function _Modal({modalStore}) {
  const {
    visible,
    title,
    width,
    cancelText,
    confirmText,
    cancelLoading,
    confirmLoading,
    closeAction,
    confirmAction,
    cancelAction
  } = modalStore;
  return (
    <Modal
      title={title}
      visible={visible}
      width={width}
      cancelText={cancelText}
      confirmText={confirmText}
      cancelLoading={cancelLoading}
      confirmLoading={confirmLoading}
      confirmAction={confirmAction}
      cancelAction={cancelAction}
      closeAction={closeAction}>
      {modalStore.compComponent ? <modalStore.compComponent /> : null}
    </Modal>
  );
}
export default inject('modalStore')(observer(_Modal));

