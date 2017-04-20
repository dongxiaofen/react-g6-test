import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PayModal from 'components/lib/PayModal';

function _PayModal({payModalStore}) {
  const {
  visible,
  pointText,
  pactUrl,
  modalType,
  tittle,
  pactName,
  closeAction,
  width,
  selectValue,
  btnLoading,
  choiceClick,
  confirmAction,
} = payModalStore;
  return (
    <PayModal
      visible={visible}
      pointText={pointText}
      pactUrl={pactUrl}
      pactName={pactName}
      tittle={tittle}
      modalType={modalType}
      closeAction={closeAction}
      width={width}
      selectValue={selectValue}
      choiceClick={choiceClick}
      btnLoading={btnLoading}
      confirmAction={confirmAction}
    />
  );
}

_PayModal.propTypes = {
  visible: PropTypes.bool,
  pointText: PropTypes.string,
  pactUrl: PropTypes.string,
  tittle: PropTypes.string,
  modalType: PropTypes.string,
  closeAction: PropTypes.func,
  width: PropTypes.string,
  choiceClick: PropTypes.func,
};
export default observer(_PayModal);
