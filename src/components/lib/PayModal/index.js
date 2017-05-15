import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Modal from 'components/lib/Modal';

function PayModal({
  clientStore,
  visible,
  tittle,
  width,
  isComboRenewal,
  selectValue,
  confirmAction,
  closeAction,
  btnLoading,
  pointText,
  pactUrl,
  pactName,
  choiceClick,
}) {
  // 生成报告或转为监控
  const payClick = () => {
    if (confirmAction) {
      confirmAction();
    }
  };
  // 关闭弹窗
  const closeModal = () => {
    if (closeAction) {
      closeAction();
    }
  };
  // 选择持续监控时间
  const selectClick = (value) => {
    choiceClick(value);
  };

  const modalBtnList = () => {
    const init = [
      {text: '1个月', key: 'ONE_MONTH'},
      {text: '2个月', key: 'TWO_MONTH'},
      {text: '3个月', key: 'THREE_MONTH'},
      {text: '4个月', key: 'FOUR_MONTH'},
      {text: '5个月', key: 'FIVE_MONTH'},
      {text: '6个月', key: 'SIX_MONTH'},
      {text: '7个月', key: 'SEVEN_MONTH'},
      {text: '8个月', key: 'EIGHT_MONTH'},
      {text: '9个月', key: 'NINE_MONTH'},
      {text: '10个月=1年', key: 'ONE_YEAR'},
    ];
    return init.map((item, key) => {
      return (
        <div
          key={`payModalSelectKey${key}`}
          className={styles.selectItem}>
          <div
            className={selectValue === item.key ? styles.active : styles.selectDiv}
            onClick={selectClick.bind(null, item.key)}>
            {item.text}
          </div>
        </div>
      );
    });
  };

  let modalConfig = {
    title: tittle,
    width: width,
    visible: visible,
    isNeedBtn: true,
    confirmText: '确定',
    cancelText: '取消',
    closeAction: closeModal,
    cancelAction: closeModal,
    confirmAction: payClick,
    confirmLoading: btnLoading,
    pointText: pointText,
    pactUrl: pactUrl,
    pactName: pactName,
  };

  let modalContent = modalBtnList();
  if (clientStore.userInfo.consumeType === 'FEESET') {
    modalConfig = {
      title: isComboRenewal ? '监控续期（1年）' : tittle,
      width: 420,
      visible: visible,
      isNeedBtn: true,
      isSingleBtn: true,
      confirmText: '确定',
      closeAction: closeModal,
      confirmAction: payClick,
      confirmLoading: btnLoading,
      pointText: pointText,
      pactUrl: pactUrl,
      pactName: pactName,
    };
    if (isComboRenewal) {
      modalContent = null;
    } else {
      modalContent = <div className={styles.modalText}>即将创建主体监控报告，监控周期为<span className={styles.modalTextSub}>1年</span></div>;
    }
  }
  return (
    <div>
      <Modal {...modalConfig}>
        <div className={`clearfix ${styles.wrap}`} style={{ marginBottom: isComboRenewal ? 0 : 30 }}>
          {modalContent}
        </div>
      </Modal>
    </div>
  );
}

PayModal.propTypes = {
  clientStore: PropTypes.object,
  closeAction: PropTypes.func,
  confirmAction: PropTypes.func,
  btnLoading: PropTypes.bool,
  pointText: PropTypes.string,
  selectValue: PropTypes.string,
  pactUrl: PropTypes.string,
  pactName: PropTypes.string,
  visible: PropTypes.bool,
  isComboRenewal: PropTypes.bool,
  tittle: PropTypes.string,
  modalType: PropTypes.string,
  width: PropTypes.string,
  choiceClick: PropTypes.func,
};
export default inject('clientStore')(observer(PayModal));
