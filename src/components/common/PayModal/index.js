import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PayModal from 'components/lib/PayModal';

function _PayModal({payModalStore}) {
  const {
  visible,
  tittle,
  width,
  isComboRenewal,
  pointText,
  pactUrl,
  modalType,
  pactName,
  confirmAction,
  closeAction,
  selectValue,
  btnLoading,
  choiceClick,
  monitorType,
  choiceMonitorType,
  isSingleBtn,
} = payModalStore;
  return (
    <PayModal
      tittle={tittle}
      width={width}
      visible={visible}
      isComboRenewal={isComboRenewal}
      modalType={modalType}
      pointText={pointText}
      pactUrl={pactUrl}
      pactName={pactName}
      choiceClick={choiceClick}
      confirmAction={confirmAction}
      closeAction={closeAction}
      selectValue={selectValue}
      btnLoading={btnLoading}
      monitorType={monitorType}
      choiceMonitorType={choiceMonitorType}
      isSingleBtn={isSingleBtn}
    />
  );
}

_PayModal.propTypes = {
  visible: PropTypes.bool,
  isComboRenewal: PropTypes.bool,
  pointText: PropTypes.string,
  pactUrl: PropTypes.string,
  tittle: PropTypes.string,
  modalType: PropTypes.string,
  closeAction: PropTypes.func,
  width: PropTypes.string,
  choiceClick: PropTypes.func,
  monitorType: PropTypes.string,
  choiceMonitorType: PropTypes.func,
  isSingleBtn: PropTypes.bool,
};
export default observer(_PayModal);
