import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Modal from 'components/lib/Modal';

function _Modal({modalStore}) {
  const {
    visible,
    title,
    isNeedBtn,
    pointText,
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
    confirmDisable,
    boxStyle,
    contentText,
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
      cancelText={cancelText}
      confirmText={confirmText}
      confirmWidth={confirmWidth}
      cancelLoading={cancelLoading}
      confirmLoading={confirmLoading}
      confirmAction={confirmAction}
      cancelAction={cancelAction}
      closeAction={closeAction}
      boxStyle={boxStyle}
      contentText={contentText}>
      {modalStore.compComponent ? <modalStore.compComponent /> : null}
    </Modal>
  );
}

_Modal.propTypes = {
  modalStore: PropTypes.object,
};

export default inject('modalStore')(observer(_Modal));
