import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'components/lib/Modal';

function _Modal({modalStore}) {
  const {
    visible,
    title,
    isNeedBtn,
    pointText,
    pactUrl,
    pactName,
    isCustomize,
    isSingleBtn,
    width,
    cancelText,
    confirmText,
    cancelLoading,
    confirmLoading,
    confirmWidth,
    closeAction,
    confirmAction,
    cancelAction,
    confirmDisable
  } = modalStore;
  return (
    <Modal
      visible={visible}
      width={width}
      confirmDisable={confirmDisable}
      isNeedBtn={isNeedBtn}
      isCustomize={isCustomize}
      isSingleBtn={isSingleBtn}
      title={title}
      pointText={pointText}
      pactUrl={pactUrl}
      pactName={pactName}
      cancelText={cancelText}
      confirmText={confirmText}
      confirmWidth={confirmWidth}
      cancelLoading={cancelLoading}
      confirmLoading={confirmLoading}
      confirmAction={confirmAction}
      cancelAction={cancelAction}
      closeAction={closeAction}>
      {modalStore.compComponent ? <modalStore.compComponent /> : null}
    </Modal>
  );
}

_Modal.propTypes = {
  modalStore: PropTypes.object,
};

export default inject('modalStore')(observer(_Modal));
