import React from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'components/lib/Modal';

function _Modal({modalStore}) {
  const _closeAction = () => {
    modalStore.closeAction();
    if (modalStore.closeFunc) {
      modalStore.closeFunc();
    }
  };
  let output = null;
  const { type, title, visible } = modalStore;
  if (type === 'text') {
    output = (
      <Modal
        type={type}
        title={title}
        visible={visible}
        closeAction={_closeAction}/>
    );
  } else if (type === 'async') {
    const {asyncComp} = modalStore;
    output = (
      <Modal
        type={type}
        title={title}
        visible={visible}
        closeAction={_closeAction}>
        <modalStore.asyncComp />
      </Modal>
    );
  }
  return output;
}
export default inject('modalStore')(observer(_Modal));

