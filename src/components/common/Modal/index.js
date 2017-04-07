import React from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'components/lib/Modal';

function _Modal({modalStore}) {
  const _closeModal = () => {
    modalStore.closeModal();
    if (modalStore.closeFunc) {
      modalStore.closeFunc();
    }
  };
  let output = null;
  const {type, visible} = modalStore;
  if (type === 'text') {
    const {title, message} = modalStore;
    output = (
      <Modal
        type={type}
        title={title}
        visible={visible}
        closeModal={_closeModal}/>
    );
  } else if (type === 'async') {
    const {asyncComp} = modalStore;
    output = (
      <div>
        <modalStore.asyncComp />
      </div>
    );
  }
  return output;
}
export default inject('modalStore')(observer(_Modal));

