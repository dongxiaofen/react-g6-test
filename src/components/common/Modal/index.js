import React from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'components/lib/Modal';

function _Modal({modalStore}) {
  let output = null;
  const { type, title, visible, closeAction } = modalStore;
  switch (type) {
    case 'info':
      output = (
        <Modal
          type={type}
          title={title}
          visible={visible}
          closeAction={closeAction} />
      );
      break;
    case 'comp':
      const {
        confirmAction,
        cancelAction
      } = modalStore;
      output = (
        <Modal
          type={type}
          title={title}
          visible={visible}
          confirmAction={confirmAction}
          cancelAction={cancelAction}
          closeAction={closeAction}>
          { modalStore.compComponent ? <modalStore.compComponent /> : null }
        </Modal>
      );
      break;
    default:
      return null;
  }
  return output;
}
export default inject('modalStore')(observer(_Modal));

